const rateLimit = require("express-rate-limit");

const systemLogs = require("../utils/Logger");

const apiLimiter = rateLimit({
    windowMs: 15 * 600 * 1000,
    max: 100,
    message:{
            message: "Too many requests from this IP address",
    },
     handler: (req, res, next, options) => {
    // systemLogs.error(
    //   `Too many requests: ${options.message.message}\t${req.method}\t${req.url}\t${req.headers.origin}`
    // );
    res.status(options.statusCode).send(options.message);
  },
    standardHeaders: true,
  legacyHeaders: false,
});

const loginLimiter = rateLimit({
      windowMs: 30 * 60 * 1000,
  max: 20,
    message: {
    message:
      "Too many login attempts from this IP address, please try again after 30 minutes",
  },
    handler: (req, res, next, options) => {
    // systemLogs.error(
    //   `Too many requests: ${options.message.message}\t${req.method}\t${req.url}\t${req.headers.origin}`
    // );
    res.status(options.statusCode).send(options.message);
  },
  standardHeaders: true,
    legacyHeaders: false,
})

module.exports = {loginLimiter,apiLimiter  }