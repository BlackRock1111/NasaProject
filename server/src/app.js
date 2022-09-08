const express = require('express');
const cors = require("cors");
const path = require('path');
const morgan = require('morgan');
const app = express();
const api = require('./routes/api.version')

app.use(express.json());



//CORS
app.use(cors({
    origin:'http://localhost:3000'
}))


//routes middleware
app.use(morgan("combined")); //logging request
app.use(express.static(path.join(__dirname,'..','public'))); //serve static files

app.use('/v1',api)


//serving frontend file
app.get('/*',(req,res)=>{
    res.sendFile(path.join(__dirname,'..','public','index.html'))
});

module.exports = {app};
