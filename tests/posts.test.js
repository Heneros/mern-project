const jwt = require("jsonwebtoken");

const mongoose = require("mongoose");
const request = require("supertest");
const { app } = require("../backend/index");
const Post = require("../backend/models/Posts");
const supertest = require("supertest");

require("dotenv").config();


if (process.env.NODE_ENV === 'test') {
    beforeAll(async () => {
        const dbUri = process.env.MONGO_URI || 'mongodb://localhost:271017/mernBlog'
        await mongoose.connect(dbUri, {
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


    /// GET POSTs 
    describe("GET /api/v1/posts", () => {
        test("It should root posts GET method", async () => {
            const res = await request(app).get("/api/v1/posts")
            expect(res.statusCode).toBe(200);
            expect(Array.isArray(res.body.posts)).toBe(true);
        })
    })

    /// GET POST by id
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

    /// DELETE POST
    describe("DELETE /api/v1/posts/:id", () => {
        test("It should DELETE post", async () => {
            const testUser = {
                id: process.env.USER_TEST_ID,
                roles: ['Admin']
            };

            const token = jwt.sign(
                testUser,
                process.env.JWT_ACCESS_SECRET_KEY,
                { expiresIn: '1h' }
            );

            const post = await Post.create({
                title: "Test Post 1",
                category: "testCat",
                imageUrl: "....",
                user: process.env.USER_TEST_ID,
                content: "Lorem ipsum"
            });
            await supertest(app)
                .delete("/api/v1/posts/" + post.id)
                .set('Authorization', `Bearer ${token}`)
                .expect(201)
                .then(async () => {
                    expect(await Post.findOne({ _id: post.id })).toBeFalsy();
                });
        })
    });



    /// UPDATE POSTS
    describe("PUT /api/v1/posts/:id", () => {
        test("It should PUT post", async () => {
            const testUser = {
                id: process.env.USER_TEST_ID,
                roles: ['Admin']
            };

            const token = jwt.sign(
                testUser,
                process.env.JWT_ACCESS_SECRET_KEY,
                { expiresIn: '1h' }
            );

            const post = await Post.create({
                title: "Test Post 1",
                category: "testCat",
                tag: ['TAGTest'],
                imageUrl: "....",
                user: process.env.USER_TEST_ID,
                content: "Lorem ipsum"
            });

            const updatedPostData = {
                title: "Updated Test Post",
                category: "updatedCat",
                tag: ['UpdatedTag'],
                imageUrl: "updatedImageUrl",
                content: "Updated content"
            };
            await supertest(app)
                .put(`/api/v1/posts/${post.id}`)
                .set('Authorization', `Bearer ${token}`)
                .send(updatedPostData)
                .expect(200);

            const updatedPost = await Post.findOne({ _id: post.id });
            expect(updatedPost).toBeTruthy();
            expect(updatedPost.title).toBe(updatedPostData.title);
            expect(updatedPost.category).toBe(updatedPostData.category);
            expect(updatedPost.tag).toEqual(updatedPostData.tag);
            expect(updatedPost.imageUrl).toBe(updatedPostData.imageUrl);
            expect(updatedPost.content).toBe(updatedPostData.content);
        })
    });

    /// CREATE COMMENT
    describe("POST /api/v1/posts/:id/comments", () => {
        test("It should create comment with method POST", async () => {
            const testUser = {
                id: process.env.USER_TEST_ID,
                roles: ['Admin'],
                username: "Meeh"
            };
            const token = jwt.sign(
                testUser,
                process.env.JWT_ACCESS_SECRET_KEY,
                { expiresIn: '1h' }
            );
            const comment = {
                comment: "Comment",
                user: process.env.USER_TEST_ID,
            };
            const post = await Post.create({
                title: "Test Post 1",
                category: "testCat",
                tag: ['TAGTest'],
                imageUrl: "....",
                user: process.env.USER_TEST_ID,
                content: "Lorem ipsum"
            });
            try {
                await supertest(app)
                    .post(`/api/v1/posts/${post.id}/comments`)
                    .set('Authorization', `Bearer ${token}`)
                    .send(comment)
                    .expect(201)
                    .expect((res) => {
                        expect(res.body.message).toBe("Comment added successfully");
                    });
            } catch (error) {
                console.log('Test failed', error);
                throw error;
            } finally {
                await Post.findByIdAndDelete(post.id)
            }
        })
    });

    describe("GET /api/v1/posts", () => {
        test("It should root posts GET method", async () => {
            const res = await request(app).get("/api/v1/posts/getAll")
            expect(res.statusCode).toBe(200);
            expect(Array.isArray(res.body.posts)).toBe(true);
        })
    })





}
