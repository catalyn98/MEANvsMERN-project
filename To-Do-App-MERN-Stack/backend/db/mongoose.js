const mongoose = require("mongoose");
require("dotenv").config();

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() =>
    console.log("The connection to the database was released with successful!")
  );
