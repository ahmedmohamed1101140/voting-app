const mongoose = require("mongoose");

//Mao Global Promise
mongoose.Promise = global.Promise;

//Connect To Mongo
mongoose.connect('mongodb://'+ process.env.db_user+':'+process.env.db_password+'@ds225308.mlab.com:25308/vote-app',function(err){
    if(err){
        console.log(err);
    }
    else{
        console.log("MongoDB Connected");
    }
});
    