require("dotenv").config();

const express = require("express");
const connectDB = require("./db/db");

const app = express();

const port = process.env.PORT || 3005;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    await app.listen(port, console.log(`Working on port ${port}`));
  } catch (error) {
    console.error(error);
  }
};
start();
