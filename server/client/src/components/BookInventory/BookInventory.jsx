import React, { useEffect, useReducer } from "react";
import inventoryVideo from "../../assets/Book_Inventory.mov";
import api from "./api";  //axios
import { styled } from "@mui/material/styles";
import { brown, lightBlue, red, orange } from "@mui/material/colors";
import Box from '@mui/material/Box';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.common.black,
    fontSize: 16,
    fontWeight: "bold",
    border: `1px solid ${brown[100]}`,
    padding: "16px"
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 16,
    border: `1px solid ${brown[100]}`,
    padding: "13px"
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: `1px solid ${brown[100]}`,
  },
}));

export default function BookInventory() {
  const initialState = {
    isOpen: false,
    rows: [],
    BookID: null,
    title: "",  // Dialog
    copies: "", // Dialog
    price: "",  // Dialog
    status: "typing"
  };

  function Reducer(state, action){
    switch (action.type){
      case 'SET_FIELD': 
        return { ...state, [action.field]:action.value };
      case 'SET_ROWS':
        return { ...state, rows:action.payload };
      case 'CLOSE_DIALOG':
        return { ...state, isOpen:false, title:"", copies:"", price:"" };
      case 'ADDED_DIALOG_OPEN':
        return { ...state, isOpen:true, status:'adding' };
      case 'ADDED':
        return { ...state, status:'adding', rows:[...state.rows, action.payload] };
      case 'DELETED':
        return { ...state, isOpen:false, status:'deleting'};
      case 'EDITED_DIALOG_OPEN':
        return { ...state, isOpen:true, status:'editing', BookID:action.BookID, title:action.title, copies:action.copies, price:action.price };
      case 'UPDATE_TITLE':
        return { ...state, title:action.payload, status:'editing' };
      case 'UPDATE_COPIES':
        return { ...state, copies:action.payload, status:'editing' };
      case 'UPDATE_PRICE':
        return { ...state, price:action.payload, status:'editing' };
      case 'EDITED':
        return { ...state, status:'editing' };
      default: 
        return state;
    };
  };

  const [state, dispatch] = useReducer( Reducer, initialState );
  
// Dialog textfield's onChange
  const handleChanges = (e) => {
    dispatch({
      type: 'SET_FIELD',
      field: e.target.name,
      value: e.target.value
    });
  }; 

  useEffect(() => {
    const fetchAllBooks = async () => {
      try {
        const res = await api.get("/Books");
        dispatch({
          type: "SET_ROWS",
          payload: res.data
        });
        console.log(res);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllBooks();

    const refreshInterval = setInterval(() => {
      fetchAllBooks();
    }, 2000);

    return () => clearInterval(refreshInterval); // Cleanup on unmount
  }, []);

  const handleAddBook = () => {
    api.post("/Books", {
      title: state.title, 
      copies: state.copies, 
      price: state.price
    })
      .then((res) => {
        console.log("Response Data:", res.data);
        dispatch({
          type: "ADDED",
          payload: [state.title, state.copies, state.price]
        });
      })
      .catch((err) => {
        if (err.response) {
          // The request was made, and the server responded with a status code that falls out of the range of 2xx
          console.error("Error data:", err.response.data);
          console.error("Error status:", err.response.status);
          console.error("Error headers:", err.response.headers);
        } else if (err.request) {
          // The request was made, but no response was received
          console.error("No response received:", err.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.error("Error in setting up request:", err.message);
        }
      });
  };

  // const handleEditMode = (row) => {
  //   api.get(`/Books?BookID=${row.BookID}`)
  //     .then((res)=> {
  //       const keyValue = res.data;
  //       const valuesArray = keyValue.map((x)=> Object.values(x));
  //       dispatch({
  //         type: "EDITED_DIALOG_OPEN",
  //         BookID: row.BookID,
  //         title: row.title,
  //         copies: row.copies,
  //         price: row.price
  //       })
  //       console.log('Data Retrieved:', row.title);
  //   })
  //   .catch((err)=> {
  //     console.error('Error fetching book:', err.response || err.message || err);
  //   });
  // };

  const handleEditedData = () => {
    if (!state || !state.BookID) {
      console.error("Row or BookID is undefined");
      return;
    }
    const newData = {
      title:state.title,
      copies:state.copies,
      price:state.price,
      BookID:state.BookID
    };
    console.log("New Data to be sent:", newData);

    api.patch(`/Books/${state.BookID}`, newData)
    .then((res) => {
      console.log("Success: Data edited", res.data);
      dispatch({ type: "EDITED" });
    })
    .catch((err)=> {
      console.log("Failed to load edited data", err.response || err);
    });
  };

  const handleDeleteBook = (row) => {
    api.delete(`/Books/${row.BookID}`)
    .then((res)=>{
      console.log(`${row.title} is deleted !`, res.data);
      dispatch({
        type: "DELETED"
      });
    })
    .catch((err)=> {
      console.log(err);
    });
  };

  // Table body (Start)
  const rowItems = state.rows.map((row) => (
    <StyledTableRow key={row.BookID}>
      <StyledTableCell align="left" >{row.title}</StyledTableCell>
      <StyledTableCell align="center">{row.copies}</StyledTableCell>
      <StyledTableCell align="center">{row.price}</StyledTableCell>
      <StyledTableCell align="center">
        <Button
          onClick={()=> {
            const action = { 
            type:'EDITED_DIALOG_OPEN',
            BookID: row.BookID,
            title: row.title,
            copies: row.copies,
            price: row.price
            };
            dispatch(action);
            console.log('Dispatched:', action);
          }}
          variant="contained"
          size="small"
          sx={{ backgroundColor: orange[500], fontWeight: "bold" }}
        >
          Edit
        </Button>
      </StyledTableCell>
      <StyledTableCell align="center">
        <Button
          onClick={()=> handleDeleteBook(row)}
          variant="contained"
          size="small"
          sx={{ backgroundColor: red[500], fontWeight: "bold" }}
        >
          Delete
        </Button>
      </StyledTableCell>
    </StyledTableRow>
  ));
  // Table body (End)

  if (process.env.NODE_ENV !== 'production') {
  return (
    <div className="relative">
      <h1 className="font-bold text-3xl py-6 px-10 mb-6 bg-sky-100 fixed top-0 left-0 right-0">Book Inventory</h1>
      <div className="flex justify-end fixed top-28 right-4">
        <Button
          onClick={()=> {
            const action ={ type:'ADDED_DIALOG_OPEN' };
            dispatch(action);
            console.log('dispatch', action.type);
          }
        }
          variant="contained"
          size="small"
          sx={{ backgroundColor: lightBlue[300], fontWeight: "bold", mr:9 }}
        >
          Add Book
        </Button>
        <Dialog
          open={state.isOpen}
          onClose={()=> dispatch({ type:'CLOSE_DIALOG' })}
          PaperProps={{
            component: "form",
            onSubmit: (e) => {
              e.preventDefault();
              if (state.status === 'adding'){
                handleAddBook();
                dispatch({ type:'CLOSE_DIALOG' });
              }else if (state.status === 'editing'){
                handleEditedData();
                dispatch({ type:'CLOSE_DIALOG' });
              };
            }
          }}
        >
          <DialogTitle>Book Details</DialogTitle>
          <DialogContent>
            <DialogContentText>
              The title field allows up to 20 characters, including spaces.
            </DialogContentText>
            <TextField
              // required
              name="title"
              label="Title"
              type="text"
              value={state.title}
              margin="normal"
              onChange={(e)=> {
                e.preventDefault();
                if(state.status === 'editing'){
                  dispatch({ type:'UPDATE_TITLE', payload:e.target.value });
                } else{
                  handleChanges(e);
                };
              }}
              fullWidth
            />
            <TextField
              required
              name="copies"
              label="Copies"
              type="number"
              value={state.copies}
              margin="normal"
              onChange={(e)=> {
                e.preventDefault();
                if(state.status === 'editing'){
                  dispatch({ type:'UPDATE_COPIES', payload:e.target.value });
                } else{
                  handleChanges(e);
                };
              }}
              fullWidth
            />
            <TextField
              required
              name="price"
              label="Price"
              type="number"
              value={state.price}
              margin="normal"
              sx={{ width: "50%", pr: 3 }}
              onChange={(e)=> {
                e.preventDefault();
                if(state.status === 'editing'){
                  dispatch({ type:'UPDATE_PRICE', payload:e.target.value });
                } else{
                  handleChanges(e);
                };
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={()=> dispatch({ type:'CLOSE_DIALOG' })}> Cancel </Button>
            <Button type="submit"> Submit </Button>
          </DialogActions>
        </Dialog>
      </div>
      <Box sx={{ mx:8, mb:6, mt:2 }} className="fixed top-36 left-0 right-0">
      <TableContainer sx={{ maxHeight:520 }}>
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            <StyledTableCell align="center" width={300}>
              Title
            </StyledTableCell>
            <StyledTableCell align="center" width={100}>
              Copies
            </StyledTableCell>
            <StyledTableCell align="center" width={100}>
              Price
            </StyledTableCell>
            <StyledTableCell align="center" width={100}></StyledTableCell>
            <StyledTableCell align="center" width={100}></StyledTableCell>
          </TableRow>
        </TableHead>

        <TableBody>{rowItems}</TableBody>
      </Table>
      </TableContainer>
      </Box>
    </div>
  );
}
else {
  return (
    <div className="p-8 place-self-center">
        <video src={inventoryVideo} controls>
        </video>
        <h3 className="font-semibold pt-6">
          The above is a simple demo of MySQL
        </h3>
    </div>
  );
}
}
