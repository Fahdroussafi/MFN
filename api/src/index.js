const express = require("express");
require("dotenv").config();
const port = process.env.PORT || 8080;
const app = express();
const cors = require("cors");

const { errorHandler } = require("./middleware/error.middleware");
const { notFound } = require("./middleware/route.middleware");
const connectDB = require("./config/db");

app.use(express.urlencoded({ extended: true }));

connectDB();

// global middlewares
app.use(cors());
app.use(express.json());

// routes
app.use("/api/company", require("./company-service/company.route"));

// 404
app.use(notFound);

// Error handler
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

module.exports = app;
