const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const express = require('express');
const cors = require('cors');
const passport = require('passport');
const mongoSanitize = require("express-mongo-sanitize")
const morgan = require("morgan")
const cookieParser = require('cookie-parser');
const session = require('express-session');


const connectDB = require('./config/db.js');

const postsRoute = require('./routes/postsRoute');
const usersRoute = require('./routes/usersRoute');
const uploadRoute = require('./routes/uploadRoute');
const authRoute = require('./routes/authRoute');

const { systemLogs, morganMiddleware } = require("./utils/Logger")

const { notFound, errorHandler } = require('./middleware/errorMiddleware');
const googleAuth = require('./config/passportSetup');

// require('./utils/oauth.js');

const app = express();

app.use(
  cors({
    origin: 'http://localhost:7200',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  }),
);


app.use(express.json());
app.use(passport.initialize());
googleAuth();

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(mongoSanitize())
// app.use(morganMiddleware())

app.use(
  session({
    // name: "blog_info",
    // secret: process.env.PASSPORT_SESSION_SECRET,
    secret: process.env.JWT_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: process.env.NODE_ENV !== 'development' },
  }),
);

app.use('/api/v1/posts', postsRoute);
app.use('/api/v1/users', usersRoute);
app.use('/api/v1/auth', authRoute);
app.use('/api/upload', uploadRoute);

// app.use(passport.session());

app.use(mongoSanitize())
const port = process.env.PORT || 3005;

if (process.env.NODE_ENV === 'production') {
  const __dirname = path.resolve();
  app.use('/uploads', express.static('/var/data/uploads'));
  app.use(express.static(path.join(__dirname, '/frontend/build')));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
  });
} else {
  const __dirname = path.resolve();
  app.use('/uploads', express.static(path.join(__dirname, '/uploads')));
  app.get('/', (req, res) => {
    res.send('<h1>Hello World</h1>');
  });
}

app.use(notFound);
app.use(errorHandler);

const startServer = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => console.log(`Working on port ${port}`));
    // return server;
  } catch (error) {
    console.error(error);
  }
};

startServer();
// if (require.main === module) {
//   startServer();
// } else {
//   module.exports = { app, startServer };
// }