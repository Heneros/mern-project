

const mongoose = require("mongoose");
const request = require("supertest");
const { app } = require("../backend/index");
require("dotenv").config();

// let server;


if (process.env.NODE_ENV === 'test') {
    describe("Test the root path", () => {
        let server;

        // beforeAll(async () => {
        //     await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
        //     server = await startServer();
        // });

        // afterAll(async () => {
        //     await mongoose.connection.close();
        //     server.close();
        // });

        test("It should respond to the GET method", async () => {
            const response = await request(app).get("/");
            expect(response.statusCode).toBe(200);
        });
    });
}