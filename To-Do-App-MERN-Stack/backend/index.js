const express = require("express");
const app = express();
const item = require("../backend/routes/ToDo");
const cors = require('cors');
require("./db/mongoose");
require("dotenv").config();

app.use(cors());
app.use(express.json());
app.use("/api/", item);

app.listen(process.env.PORT, () => {
  console.log("Backend server is running!");
});
