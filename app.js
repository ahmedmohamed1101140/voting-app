var express = require("express");
var parser  = require("body-parser");
var path    = require("path");
var cors    = require('cors');
var app     = express();

//Routing File
var vote    = require("./routes/vote");

//DB Config
require("./config/db");

//set the static file
app.use(express.static(path.join(__dirname , 'public')));

//set the body parer
app.use(parser.json());
app.use(parser.urlencoded({extended: false}));

//Enable cors
app.use(cors());


app.use('/vote',vote);

app.listen(process.env.PORT,function(err){
    if(err){
        console.log(err);
    }
    else{
        console.log("Server Running At Port: " + process.env.PORT);
    }
})