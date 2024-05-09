const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const express = require('express');
const cors = require('cors');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const jwt = require('jsonwebtoken');

const connectDB = require('./config/db.js');

const postsRoute = require('./routes/postsRoute');
const usersRoute = require('./routes/usersRoute');
const uploadRoute = require('./routes/uploadRoute');

const { notFound, errorHandler } = require('./middleware/errorMiddleware');

require('./utils/oauth.js');

const app = express();

// app.enable("trust proxy");
// app.set("trust proxy", 1);

app.use(
  cors({
    origin: 'https://mern-project-6ivb.onrender.com',
    methods: 'GET,POST,PUT,DELETE',
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

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

app.use(passport.initialize());
app.use(passport.session());

app.use('/api/v1/posts', postsRoute);
app.use('/api/v1/users', usersRoute);
app.use('/api/upload', uploadRoute);

app.get(
  '/auth/google',
  passport.authenticate('google', { scope: ['email', 'profile'] }),
);

// app.get(
//   "/auth/google/callback",
//   passport.authenticate("google", {
//     successRedirect: "http://localhost:7200/profile", //change latter
//     failureRedirect: "/auth/google/failure",
//   })
// );

app.get(
  '/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    const { user } = req;
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: '30d',
    });

    res.cookie('blog_info', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development',
      sameSite: 'Lax',
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    res.redirect("http://localhost:7200/profile");
  }
);

app.get('/auth/google/failure', (req, res) => {
  res.send('Failed to authenticate..');
});

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

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    await app.listen(port, console.log(`Working on port ${port}`));
  } catch (error) {
    console.error(error);
  }
};
start();
