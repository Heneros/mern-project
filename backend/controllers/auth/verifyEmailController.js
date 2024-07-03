const asyncHandler = require("express-async-handler");



const domainURL = process.env.DOMAIN;

// $-title   Verify User Email
// $-path    GET /api/v1/auth/verify/:emailToken/:userId
// $-auth    Public
