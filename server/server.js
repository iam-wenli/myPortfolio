const express = require('express');
const app = express();
const path = require('path');
const Port = process.env.PORT || 5173;
const helmet = require('helmet');

app.listen(Port,()=>{
    console.log(`Listening on port ${Port}`);
});
app.use(express.static(path.join(__dirname,'client','dist')
));
app.get('*',(req,res)=> {
    res.sendFile(path.join(__dirname,'client','dist','index.html'));
});
app.use(helmet());