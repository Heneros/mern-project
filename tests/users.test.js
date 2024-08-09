const mongoose = require('mongoose');
const request = require('supertest');
const jwt = require('jsonwebtoken');
const supertest = require("supertest")


const { app } = require("../backend/index");
const User = require('../backend/models/Users');
const VerificationToken = require('../backend/models/verifyResetTokenModel');

require("dotenv").config();

let token;



const createUserAndGenerateToken = async(roles = ['User']) =>{
    const testUser = new User({
    username: "testUser",
    email: `useremail${Date.now()}@test.com`,
    password: "password1234",
    passwordConfirm: "password1234",
    provider: 'email',
    isEmailVerified: true,
    roles
  });
await testUser.save();

  const token = jwt.sign(
    { id: testUser._id, roles },
    process.env.JWT_ACCESS_SECRET_KEY,
    { expiresIn: '1d' }
  );

  return { testUser, token };

}


     beforeAll(async() =>{
    const dbUri = process.env.MONGO_URI_LOCAL
        await mongoose.connect(dbUri, {})
  });


  afterAll(async () =>{
      await mongoose.connection.close();
  })




describe("GET all users", () =>{
let testUser;


beforeAll(async () =>{
  ({testUser, token} = await createUserAndGenerateToken(['Admin']))
})


    afterAll(async() =>{
      await User.deleteOne({_id : testUser._id})
  })
  
  test("Method GET", async() =>{
      const response = await request(app).get("/api/v1/users")
    .set("Authorization", `Bearer ${token}`)
    .expect(200)
    // console.log('response.body', response.body)

    expect(response.body).toBeInstanceOf(Array); 
    expect(response.status).toBe(200);
    }, 30000)
});



describe("GET user Profile", () =>{
  let testUser;

  beforeAll(async() =>{
({testUser, token} = await createUserAndGenerateToken(['User']))
  });
  
    ///  console.log('User created successfully:', testUser);



    afterAll(async() =>{
    await User.deleteOne({_id: testUser._id});
  })
  
    test("Method GET", async() =>{
   
        const response = await request(app)
        .get('/api/v1/users/profile')
        .set('Authorization', `Bearer ${token}`)
        expect(response.status).toBe(200);

        expect(response.body).toHaveProperty("_id", testUser._id.toString());
        expect(response.body).toHaveProperty("username", testUser.username);
        expect(response.body).toHaveProperty("email", testUser.email);
    }, 35000)

})
  
