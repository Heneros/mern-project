

const mongoose = require("mongoose");
const request = require("supertest");
const { app } = require("../backend/index");
const Post = require("../backend/models/Posts");
const supertest = require("supertest");

require("dotenv").config();


if (process.env.NODE_ENV === 'test') {
    // let server;

    beforeAll(async () => {
        const dbUri = process.env.MONGO_URI || 'mongodb://localhost:271017/mernBlog'
        await mongoose.connect(dbUri, {
            // useNewUrlParser: true,
            // useUnifiedTopology: true,
        })
    })

    afterAll(async () => {
        await mongoose.connection.close()
    })

    describe("Test root app", () => {
        test("It should root test GET method", async () => {
            const response = await request(app).get("/");
            expect(response.statusCode).toBe(200);
        })
    })


    describe("GET /api/v1/posts", () => {
        test("It should root posts GET method", async () => {
            const res = await request(app).get("/api/v1/posts")
            expect(res.statusCode).toBe(200);
            expect(Array.isArray(res.body.posts)).toBe(true);
            // expect(res.body.posts.length).toBeGreaterThan(0);
        })
    })



    test("GET /api/v1/posts/:id", async () => {
        const post = await Post.create({
            title: "Test Post 1",
            category: "testCat",
            imageUrl: "....",
            user: process.env.USER_TEST_ID,
            content: "Lorem ipsum"
        });

        try {
            const response = await supertest(app).get(`/api/v1/posts/${post.id}`)
            expect(response.status).toBe(200);
            expect(response.body._id).toBe(post.id);
            expect(response.body.title).toBe(post.title);
            expect(response.body.content).toBe(post.content);
        } catch (error) {
            console.log('Test failed', error);
            throw error;
        } finally {
            await Post.findByIdAndDelete(post.id)
        }
    })





}
