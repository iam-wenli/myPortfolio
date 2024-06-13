const express = require('express');
const app = express();
const path = require('path');
const Port = process.env.PORT || 5173;
const helmet = require('helmet');

app.listen(Port,()=>{
    console.log(`Listening on port ${Port}`);
});
app.use(express.static(path.join(__dirname,'client/dist')
));
app.use(helmet());