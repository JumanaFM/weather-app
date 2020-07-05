//middle-ware layer to handle a POST request
const bodyParser = require('body-parser');

const port= 8080;

//Express to run server and routes
const express= require('express');

//Cors for cross origin allowance
const cors= require('cors');

//Start up an instance of app
const app= express();

app.use(cors());

//use the packages
//configure express to use body-parse as middle-ware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//initialize main static folder
app.use(express.static('public'))

app.get('/',function(req, res){
res.send('this is a get');

});

app.post('/',function(req, res){
    res.send('this is a post');
    
    });

// const data = []

// app.post('/addMovie', addMovie)


// function addMovie (req, res) {
//     console.log(req.body);
//     data.push(data.body)
//   }

// spin up server
const server = app.listen(port, listening);

function listening() {
    console.log(`running on port:${port}`);
    
}

