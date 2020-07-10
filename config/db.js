const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

//Mongoose Connect
mongoose.connect('mongodb+srv://shawn:shawn@cluster0.uebyo.mongodb.net/shawnsmdb?retryWrites=true&w=majority')
    .then(()=> console.log('MongoDB Connected'))
    .catch(err => console.log(err));