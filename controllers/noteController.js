var bodyParser = require('body-parser');
const mongoose = require('mongoose');
const express = require('express');
var app = express();
// app.use(bodyParser.urlencoded({ extended: true }));
var urlencodedParser = bodyParser.urlencoded({extended: false});
app.use(bodyParser.json());


mongoose.connect("mongodb://localhost:27017/mongoosedb",{
    useNewUrlParser:true, useUnifiedTopology:true 
},(err)=>{
    if(err){
        console.log(err);
    }
    else{
        console.log("Database connected successfully");
    }
} );

const Schema = mongoose.Schema;

const noteSchema = new Schema({
    title: {
        type: String
    },
    content: {
        type: String
    }
}, {timestamps: true});

const Notes = mongoose.model('Note', noteSchema);

module.exports = function(app){
    //read
    app.get('/home', function(req, res){
        //get data from mongodb and pass it to the view
        Notes.find({}, function(err, data){
            if(err) throw err;
            res.render('home', {notes: data});
        });
    });

    //create
    app.post('/home', urlencodedParser, function(req, res){
        //get data from view and add to database
        //console.log(req.body);
        var newNote = Notes(req.body).save(function(err, data){
            if(err) throw err;
            res.json(data);
        })
    });

    //delete
    app.delete('/home', urlencodedParser, function(req, res){
        //delete data from mongodb
        Notes.find({_id: req.body._id}).deleteOne(function(err, data){
            if(err) throw err;
            res.json(data);
        })
    });

    //update
    app.put('/home/update/', urlencodedParser, function(req, res){
        //get data from view and update the database
        //console.log(req.body);
          var new_note = { $set: {title: req.body.title, content: req.body.content} };
          Notes.updateOne({_id: req.body._id}, new_note, function(err, data){
            if(err) throw err;
            res.json(data);
        });
    })
}
