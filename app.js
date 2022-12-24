const express = require("express");
const app = express();

// Install morgan for logging
// npm i morgan
const morgan = require("morgan");

const productRoutes = require("./routes/products");
const orderRoutes = require("./routes/orders");

app.use(morgan("dev"));

app.use("/products", productRoutes);
app.use("/orders", orderRoutes);

// middleware for error handling
// to handle 404 - not found errors
// sending customer error message
app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

// middle for handling all errors and sending formatted response
app.use((error, req, res, error) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

app.listen(3000);

app.get("/products", productRoutes);
