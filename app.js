const express = require("express");
const app = express();
const bodyParser = require("body-parser");

// npm i --save body-parser
// to parse url encoded data - to support simple data --> extended: false
app.use(bodyParser.urlencoded({ extended: false }));
// to parse json data
app.use(bodyParser.json());

// cors - cross origin resource sharing
// if data is from same server - request will succedd
// for restful api - this will be different
// for restful api - we have to allow cors
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
  });

const morgan = require("morgan");

const productRoutes = require("./routes/products");
const orderRoutes = require("./routes/orders");

app.use(morgan("dev"));

app.use("/products", productRoutes);
app.use("/orders", orderRoutes);

app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

app.listen(3000);

app.get("/products", productRoutes);
