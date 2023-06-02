const express = require("express");
const app = express();
const item = require("../backend/routes/ToDo");
require("./db/mongoose");
require("dotenv").config();
const cors = require("cors");

const allowedOrigins = ["http://localhost:4200"];
const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

app.use(cors(corsOptions));
app.use(express.json());
app.use("/api/", item);

app.listen(process.env.PORT, () => {
  console.log("Backend server is running!");
});
