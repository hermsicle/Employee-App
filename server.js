const express = require("express");
const app = express();
const PORT = 5000;
const mongoose = require("mongoose");
const MONGO_URI = "mongodb://localhost/crud";
const MONGO_OPTIONS = {};

const connection = () => {
  mongoose
    .connect(MONGO_URI, MONGO_OPTIONS)
    .then(() => {
      console.log("connected to db!");
    })
    .catch((err) => console.log(err));
};
connection();

//Set up middleware otherwise can't connect
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const apiRoutes = require("./routes/apiRoutes");
app.use("/api", apiRoutes);

app.listen(PORT, () => {
  console.log("connected to server!");
});