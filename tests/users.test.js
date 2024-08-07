const mongoose = require('mongoose');
const request = require('supertest');
const jwt = require('jsonwebtoken');
const supertest = require("supertest")


const { app } = require("../backend/index");
const User = require('../backend/models/Users');
const VerificationToken = require('../backend/models/verifyResetTokenModel');



require("dotenv").config();

    beforeAll(async () => {
        const dbUri = process.env.MONGO_URI_LOCAL
        await mongoose.connect(dbUri, {
        })
    })

    afterAll(async () => {
        await mongoose.connection.close()
    })

describe("GET all users", () =>{
    test("Method GET", async() =>{
     const testUser = {
        id: process.env.USER_TEST_ID,
        roles: ['Admin']
     };

     const token = jwt.sign(
        testUser, 
        process.env.JWT_ACCESS_SECRET_KEY,
    {expiresIn: '1h'});

      const response = await request(app).get("/api/v1/users")
    .set("Authorization", `Bearer ${token}`)
    .expect(200)

    // .then(async() =>{
    //     expect(await User.find({}))
    //   })
    expect(response.body).toBeInstanceOf(Array); 

 
    }, 10000)
});
