// Dependencies
const express = require("express");
const path = require("path");
const fs = require("fs");
const util = require("util");
const req = require("express/lib/request");

//How to handle asynchronous processes
const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync =util.promisify(fs.writeFile);

// Port set up
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true}));
app.use(express.json());

//Adding static middleware
app.use(express.static("./develop/public"));

//API ROUTE GET REQUEST
app.get("/api/notes", function(req, res) {
    readFileAsync("./develop/db/db.json", "utf8").then(function(data) {
        notes = [].concat(JSON.parse(data))
        res.json(notes);
    })
});


// API ROUTE POST REQUEST
app.post("/api/notes", function(req,res) {
    const note = req.body;
    readFileAsync("./develop/db/db.json", "utf8").then(function(data) {
        const notes = [].concat(JSON.parse(data));
        note.id = notes.length + 1
        notes.push(note);
        return notes
    }).then(function(notes) {
        writeFileAsync("./develop/db/db.json" , JSON.stringify(notes))
    })
});

//API ROUTE DELETE REQUEST 
app.delete("/api/notes/:id", function(req,res) {
    const idToDelete = parseInt(req.params.id);
    readFileAsync("./develop/db/db.json", "utf8").then(function(data) {
        const notes = [].concat(JSON.parse(data));
    })
});

