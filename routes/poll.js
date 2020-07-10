const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Vote = require('../models/Vote');


const Pusher = require('pusher');

var pusher = new Pusher({
    appId: '1036003',
    key: '91e6ed966b324d2f6241',
    secret: '0de3d2461324d519c4f6',
    cluster: 'ap1',
    encrypted: true
  });

  router.get('/',(req,  res)=>{
    Vote.find().then(votes=> res.json({success:true, 
    votes:votes}));

    });

router.post('/',(req,res)=>{

    const newVote = {
        mer: req.body.mer,
        points: 1
    }

    new Vote(newVote).save().then(vote=>{


        pusher.trigger('my-poll', 'my-vote', {
            points:parseInt(vote.points),
            mer: req.body.mer
          });
    
          return res.json({success: true, message:'Thank you for voting'});
    

    });


    
});

module.exports = router;