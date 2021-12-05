console.log("up and running");

let express = require("express");

//variable to activate the express function
let app = express();

//defining the port number
let port = 3000;

// the connection will happen on the port = 3000
let server = app.listen(port);

console.log("server is running on http://localhost:" + port);

app.use(express.static("public"));
