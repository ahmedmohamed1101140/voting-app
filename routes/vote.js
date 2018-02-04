var express = require("express");
var router  = express.Router();
const mongoose = require("mongoose");
const Vote = require("../models/vote");

//Setup Pusher
var Pusher = require('pusher');

var pusher = new Pusher({
  appId: process.env.appId,
  key: process.env.key,
  secret: process.env.secret,
  cluster: 'eu',
  encrypted: true
});

router.get("/",function(req,res){
    Vote.find({},function(err,votes){
        res.json({
            success: true,
            votes: votes
        });
    })
});

router.post("/" , function(req,res){


    const newVote = {
        PL: req.body.PL,
        points: 1
    };


    //Save Data In Mongo
    Vote.create(newVote,function(err,vote){
        if(err){
            console.log(err);
        }
        else{
            console.log(vote);
  
            //Push Data To Pusher
            pusher.trigger('pl-poll', 'pl-vote', {
                points: parseInt(vote.points),
                PL: vote.PL
              });
              return res.json({
                  success: true,
                  message: "Thanks For Voting",
                  yourVote: req.body.PL
              });
        
  
        }
    });
    
  
});

module.exports = router;