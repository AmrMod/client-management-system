const request = require("supertest");
const app = require("../app");

describe("Express App", () => {

    test("should respond to an unknown route with 404", async () => {

        const response = await request(app)
            .get("/does-not-exist");

        expect(response.statusCode).toBe(404);

    });

});