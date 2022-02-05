// Dependencies
const express = require("express");
const path = require("path");
const fs = require("fs");
const util = require("util");

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

