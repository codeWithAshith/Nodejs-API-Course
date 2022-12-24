// install express - npm install --save express
// To create server using js.

// install nodemon - nodemon - npm install --save nodemon
// To detect changes and re-run the project

// import ... from "..." -> this is not supported in Nodejs

const express = require("express");
const app = express();

app.listen(3000);

app.get("/", (req, res) => {
  res.send("<p>Home Page</p>");
});
