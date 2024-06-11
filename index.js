const express = require("express");
const mongoose = require("mongoose");
const route = require("./src/routes");
const passport = require('passport');
const bodyParser = require('body-parser');
require("dotenv").config();

async function database(request, response) {
  mongoose.set("strictQuery", false);
  await mongoose.connect(process.env.DB_DATABASE);
}
const app = express();
const port = 8000;

database();
app.use(express.json());


app.use(bodyParser.json());
app.use(passport.initialize());
app.use("/route", route);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
