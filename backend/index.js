require("dotenv").config();

const express = require("express");
const connectDB = require("./db/db");

const postsRoute = require("./routes/postsRoute");
const usersRoute = require("./routes/usersRoute");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("<h1>Hello World</h1>");
});

app.use("/api/v1/posts", postsRoute);
app.use("/api/v1/users", usersRoute);

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
