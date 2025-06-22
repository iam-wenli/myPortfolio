import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from '../App';
import Welcome from './Welcome';
import Introduction from './Introduction';
import Skills from './Skills';
import Projects from './Projects';
import ErrorPage from './error-page';
import BookInventory from './BookInventory/BookInventory';


const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    errorElement: <ErrorPage/>,
    children: [
      {index:true, path:"welcome", element:<Welcome/>},
      {path:"introduction", element:<Introduction/>},
      {path:"skills", element:<Skills/>},
      {path:"projects", element:<Projects/>},
      {path:"projects/bookinventory", element:<BookInventory/>}
    ],
  }
]);

  function AppRouter() {
    return <RouterProvider router={router} />;
  }

export default AppRouter;
