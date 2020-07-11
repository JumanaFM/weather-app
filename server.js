// Setup empty JS object to act as endpoint for all routes
projectData = {};
let entryCounter = 0;

//middle-ware layer to handle a POST request
const bodyParser = require("body-parser");

const port = 8080;

//Express to run server and routes
const express = require("express");

//Cors for cross origin allowance
const cors = require("cors");

//Start up an instance of app
const app = express();

app.use(cors());

//use the packages
//configure express to use body-parse as middle-ware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//initialize main static folder
app.use(express.static("website"));

app.get("/entry", function (req, res) {
  res.send(projectData);
});
app.post("/entry", function (req, res) {
  console.log(req.body);
  entryCounter++;
  projectData[`entry${entryCounter}`] = req.body;
  res.send({ entry_id: `entry${entryCounter}` });
});

// spin up server
const server = app.listen(port, listening);

function listening() {
  console.log(`running on port:${port}`);
}
