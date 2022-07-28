// Creating a bog standard JS server

var express = require('express') // pulls in the express library we downloaded
var app = express() // calls the function

var port = 3000

app.get('/', (req, res) => { //when someone makes a get request to the root path, we'll send back an response object the string hello world
    res.send("Hello World");
})
// just tells the server how we want it to behave - the get is listening for the URL and will respond accordingly

app.get('/store', (req, res) => { //when someone makes a get request to the root path, we'll send back an response object the string hello world
    res.send("Welcome to the store");
})

app.listen(port, () => { // listen starts the server - listen on port 3000 - when it's running, call this function which prints to the console that text
    console.log(`Example app listening on port ${port}`); // use backticks rather than quotes when you have interpolated text
}) 

// run node index.js to get the response: Example app listening on port 3000
// go to http://localhost:3000/ in your browser to see "Hello World" in the browser


