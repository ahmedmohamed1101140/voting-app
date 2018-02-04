const mongoose = require("mongoose");

const VoteSchema = mongoose.Schema({
    PL: {type: String, require:true},
    points:{
        type: String,
        require: true
    }

});

//create colleaction and add schema
module.exports = mongoose.model('Vote' , VoteSchema);
