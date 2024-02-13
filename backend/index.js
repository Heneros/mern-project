require("dotenv").config();
const path = require("path");
const express = require("express");
const cors = require("cors");
const passport = require("passport");
const cookieParser = require("cookie-parser");
const session = require("express-session");

const connectDB = require("./db/db");

const postsRoute = require("./routes/postsRoute");
const usersRoute = require("./routes/usersRoute");
const uploadRoute = require("./routes/uploadRoute");

const { notFound, errorHandler } = require("./middleware/errorMiddleware");


require("./utils/oauth.js");

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: process.env.PASSPORT_SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());



app.use("/api/v1/posts", postsRoute);
app.use("/api/v1/users", usersRoute);
app.use("/api/uploads", uploadRoute);

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    successRedirect: "http://localhost:3005", //change latter
    failureRedirect: "/auth/google/failure",
  })
);

app.get("/auth/google/failure", (req, res) => {
  res.send("Failed to authenticate..");
});

const port = process.env.PORT || 3005;

if (process.env.NODE_ENV === "production") {
  const __dirname = path.resolve();
  app.use("/uploads", express.static("/var/data/uploads"));
  app.use(express.static(path.join(__dirname, "/frontend/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });
} else {
  const __dirname = path.resolve();
  app.use("/uploads", express.static(path.join(__dirname, "/uploads")));
  app.get("/", (req, res) => {
    res.send("<h1>Hello World</h1>");
  });
}

app.use(notFound);
app.use(errorHandler);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    await app.listen(port, console.log(`Working on port ${port}`));
  } catch (error) {
    console.error(error);
  }
};
start();
