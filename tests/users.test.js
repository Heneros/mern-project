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

    expect(response.body).toBeInstanceOf(Array); 
    }, 10000)
});


describe("GET user Profile", () =>{
  let token;
  let testUser;

  beforeAll(async() =>{
    // await mongoose.connect(process.env.MONGO_URI_LOCAL, { useNewUrlParser: true, useUnifiedTopology: true });
    const dbUri = process.env.MONGO_URI_LOCAL
        await mongoose.connect(dbUri, {
    })

      testUser = new User({
        username: "testUser",
        email: `useremail${Date.now()}@test.com`,
        password: "password1234",
        provider: 'email',
        isEmailVerified: true,
    });
    await testUser.save();

    const payload = {
        _id: testUser._id,
        roles: ['User']
    };
    token = jwt.sign(payload, process.env.JWT_ACCESS_SECRET_KEY, { expiresIn: '1h' });
  });

  afterAll(async() =>{
    await User.deleteOne({_id: testUser._id});
    await mongoose.connection.close();
  })
  
    test("Method GET", async() =>{
   
        const response = await request(app)
        .get('/api/v1/users/profile')
        .set('Authorization', `Bearer ${token}`)
        // .expect(200);
        console.log('Response body:', response.body);
        console.log('Response status:', response.status);
        expect(response.status).toBe(200);

        expect(response.body).toHaveProperty("_id", testUser._id.toString());
        expect(response.body).toHaveProperty("username", testUser.username);
        expect(response.body).toHaveProperty("email", testUser.email);
    })
})