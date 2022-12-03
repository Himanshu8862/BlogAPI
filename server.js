const express = require("express");

const app = express();


// middleware
// routes


// error handling middleware
// listen to server

const PORT = process.env.PORT || 9000
app.listen(PORT, console.log(`Server is up and running on ${PORT}`));