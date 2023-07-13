require('dotenv').config();
const express = require('express');
const app = express();
require('./db/conn');
const router = require('./routes/router')
const cors = require('cors')
const path = require('path')

// Middlewares
app.use(cors());
app.use(express.json()); 
app.use(express.urlencoded({extended: true}));
app.use(router)

// static files
app.use(express.static(path.join(__dirname,'./client/build')));

app.get('*',function(req,res){
    res.sendFile(path.join(__dirname, './client/build/index.html'));
})

const port = process.env.PORT || 8005;

app.listen(port, ()=>{
    console.log(`Running on ${port}`);
})