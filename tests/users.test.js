const mongoose = require('mongoose');
const request = require('supertest');
const jwt = require('jsonwebtoken');

const bcrypt = require('bcryptjs');
const supertest = require('supertest');

const { app } = require('../backend/index');
const User = require('../backend/models/Users');
const VerificationToken = require('../backend/models/verifyResetTokenModel');

require('dotenv').config();

let token;

const createUserAndGenerateToken = async (roles = ['User']) => {
    const testUser = new User({
        username: 'testUser',
        email: `useremail${Date.now()}@test.com`,
        password: 'password1234',
        passwordConfirm: 'password1234',
        provider: 'email',
        isEmailVerified: true,
        roles,
    });
    await testUser.save();

    const token = jwt.sign(
        { id: testUser._id, roles },
        process.env.JWT_ACCESS_SECRET_KEY,
        { expiresIn: '1d' },
    );

    return { testUser, token };
};

beforeAll(async () => {
    const dbUri = process.env.MONGO_URI_LOCAL;
    await mongoose.connect(dbUri, {});
});

afterAll(async () => {
    await mongoose.connection.close();
});
///, admin role
describe('GET all users', () => {
    let testUser;

    beforeAll(async () => {
        ({ testUser, token } = await createUserAndGenerateToken(['Admin']));
    });

    afterAll(async () => {
        await User.deleteOne({ _id: testUser._id });
    });

    test('Method GET', async () => {
        const response = await request(app)
            .get('/api/v1/users')
            .set('Authorization', `Bearer ${token}`)
            .expect(200);
        // console.log('response.body', response.body)

        expect(response.body).toBeInstanceOf(Array);
        expect(response.status).toBe(200);
    }, 30000);
});

//get by id. , admin role
describe('GET user Profile', () => {
    let testUser;

    beforeAll(async () => {
        ({ testUser, token } = await createUserAndGenerateToken(['Admin']));
    });
    afterAll(async () => {
        await User.deleteOne({ _id: testUser._id });
    });

    test('Method GET get by id', async () => {
        const response = await request(app)
            .get(`/api/v1/users/${testUser._id}`)
            .set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(200);

        expect(response.body).toHaveProperty('_id', testUser._id.toString());
        expect(response.body).toHaveProperty('username', testUser.username);
        expect(response.body).toHaveProperty('email', testUser.email);
    }, 35000);
});

///Delete, admin role
describe('Delete user profile', () => {
    let testUser;

    beforeAll(async () => {
        ({ testUser, token } = await createUserAndGenerateToken(['Admin']));
    });

    afterAll(async () => {
        await User.deleteOne({ _id: testUser._id });
    });
    test('Method DELETE', async () => {
        const response = await request(app)
            .delete(`/api/v1/users/${testUser._id}`)
            .set('Authorization', `Bearer ${token}`)
            .expect(200);
        const deletedUser = await User.findById(testUser._id);

        expect(response.status).toBe(200);
        expect(response.body.message).toBe('User removed');
        expect(deletedUser).toBeNull();
    });
});

///update user, admin role
describe('Update user', () => {
    let testUser;

    beforeAll(async () => {
        ({ testUser, token } = await createUserAndGenerateToken(['Admin']));
    });

    afterAll(async () => {
        await User.deleteOne({ _id: testUser._id });
    });

    test('PUT user data', async () => {
        const userUpdate = {
            username: 'JamesTest',
            email: 'jamezzzz@sleeponelove.com',
            password: 'password1234567',
        };
        const res = await request(app)
            .put(`/api/v1/users/${testUser._id}`)
            .set('Authorization', `Bearer ${token}`)
            .expect(200)
            .send(userUpdate);

        const updatedUser = await User.findById(testUser._id);
        expect(updatedUser.username).toBe(userUpdate.username);
        expect(updatedUser.password).toBe(userUpdate.password);
        expect(updatedUser.email).toBe(userUpdate.email);
        expect(res.status).toBe(200);
    });
});

///get user, user role
describe('Get profile user', () => {
    let testUser;

    beforeAll(async () => {
        ({ testUser, token } = await createUserAndGenerateToken(['User']));
    });

    afterAll(async () => {
        await User.deleteOne({ _id: testUser._id });
    });

    test('GET user data profile', async () => {
        const res = await request(app)
            .get(`/api/v1/users/profile`)
            .set('Authorization', `Bearer ${token}`)
            .expect(200);

        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('_id', testUser._id.toString());
        expect(res.body).toHaveProperty('username', testUser.username);
        expect(res.body).toHaveProperty('email', testUser.email);
        expect(res.body).not.toHaveProperty('password');
    });
});

///put user, user role
describe('update profile user', () => {
    let testUser;

    beforeAll(async () => {
        ({ testUser, token } = await createUserAndGenerateToken(['User']));
    });

    afterAll(async () => {
        await User.deleteOne({ _id: testUser._id });
    });

    test('update user data profile', async () => {
        const userUpdate = {
            username: 'JamesTest',
            email: 'jamezzzz@sleeponelove.com',
            password: 'password1234567',
        };

        const res = await request(app)
            .put(`/api/v1/users/profile`)
            .set('Authorization', `Bearer ${token}`)
            .expect(200)
            .send(userUpdate);

        expect(res.status).toBe(200);

        const updatedUser = await User.findById(testUser._id);
        expect(updatedUser.username).toBe(userUpdate.username);
        /// expect(updatedUser.password).toBe(userUpdate.password);

        const isPasswordMatch = await bcrypt.compare(
            userUpdate.password,
            updatedUser.password,
        );
        expect(isPasswordMatch).toBe(true);
        expect(updatedUser.email).toBe(userUpdate.email);
        expect(res.status).toBe(200);
    });
});

///delete my account user, user role
describe('delete profile user', () => {
    let testUser;

    beforeAll(async () => {
        ({ testUser, token } = await createUserAndGenerateToken(['User']));
    });

    afterAll(async () => {
        await User.deleteOne({ _id: testUser._id });
    });

    test('update user data profile', async () => {
        const res = await request(app)
            .delete(`/api/v1/users/profile`)
            .set('Authorization', `Bearer ${token}`)
            .expect(200);

        expect(res.status).toBe(200);
        const deletedUser = await User.findById(testUser._id);

        expect(res.body.message).toBe('Your user account has been deleted');
        expect(deletedUser).toBeNull();

        /// expect(updatedUser.password).toBe(userUpdate.password);
    });
});
