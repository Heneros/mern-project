// const mongoose = require('mongoose');
// const request = require('supertest');
// const express = require('express');
// const User = require('../backend/models/Users');
// const VerificationToken = require('../backend/models/verifyResetTokenModel');
// const sendEmail = require('../backend/utils/sendEmail');
// const registerUser = require('../backend/controllers/auth/registerController');

// jest.mock('../backend/models/Users');
// jest.mock('../backend/models/verifyResetTokenModel');
// jest.mock('../backend/utils/sendEmail');

// const app = express();
// app.use(express.json());
// app.post('/api/v1/auth/register', registerUser);

// describe('registerUser', () => {
//     beforeEach(() => {
//         jest.clearAllMocks();
//     });

//     it('should register a new user and send verification email', async () => {
//         const mockUser = {
//             _id: new mongoose.Types.ObjectId(),
//             email: 'test@example.com',
//             username: 'testuser',
//             save: jest.fn().mockResolvedValue(true),
//         };

//         User.findOne.mockResolvedValue(null);
//         User.mockImplementation(() => mockUser);

//         VerificationToken.prototype.save.mockResolvedValue({
//             _userId: mockUser._id,
//             token: 'mock-token',
//         });

//         sendEmail.mockResolvedValue(true);

//         const response = await request(app)
//             .post('/api/v1/auth/register')
//             .send({
//                 email: 'test@example.com',
//                 username: 'testuser',
//                 password: 'password123',
//                 passwordConfirm: 'password123',
//             });

//         expect(response.status).toBe(200);
//         expect(response.body.success).toBe(true);
//         expect(response.body.message).toContain('A new user testuser has been registered!');
//         expect(User.findOne).toHaveBeenCalledWith({ email: 'test@example.com' });
//         expect(sendEmail).toHaveBeenCalled();
//     });

//     it('should return 400 if email is missing', async () => {
//         const response = await request(app)
//             .post('/api/v1/auth/register')
//             .send({
//                 username: 'testuser',
//                 password: 'password123',
//                 passwordConfirm: 'password123',
//             });

//         expect(response.status).toBe(400);
//         expect(response.body.message).toBe('An email address is required');
//     });

//     it('should return 400 if username is missing', async () => {
//         const response = await request(app)
//             .post('/api/v1/auth/register')
//             .send({
//                 email: 'test@example.com',
//                 password: 'password123',
//                 passwordConfirm: 'password123',
//             });

//         expect(response.status).toBe(400);
//         expect(response.body.message).toBe('A username is required');
//     });

//     it('should return 400 if password is missing', async () => {
//         const response = await request(app)
//             .post('/api/v1/auth/register')
//             .send({
//                 email: 'test@example.com',
//                 username: 'testuser',
//                 passwordConfirm: 'password123',
//             });

//         expect(response.status).toBe(400);
//         expect(response.body.message).toBe('You must enter a password');
//     });

//     it('should return 400 if passwordConfirm is missing', async () => {
//         const response = await request(app)
//             .post('/api/v1/auth/register')
//             .send({
//                 email: 'test@example.com',
//                 username: 'testuser',
//                 password: 'password123',
//             });

//         expect(response.status).toBe(400);
//         expect(response.body.message).toBe('Confirm password field is required');
//     });

//     it('should return 400 if user already exists', async () => {
//         User.findOne.mockResolvedValue({ email: 'test@example.com' });

//         const response = await request(app)
//             .post('/api/v1/auth/register')
//             .send({
//                 email: 'test@example.com',
//                 username: 'testuser',
//                 password: 'password123',
//                 passwordConfirm: 'password123',
//             });

//         expect(response.status).toBe(400);
//         expect(response.body.message).toBe('The email address you\'ve entered is already associated with another account');
//     });
// });