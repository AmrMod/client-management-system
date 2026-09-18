const request = require("supertest");
const app = require("../app");

describe("POST /auth/login", () => {
    test("should reject an invalid login request", async () => {
        const response = await request(app)
            .post("/auth/login")
            .send({});

        expect(response.statusCode).toBe(400);
    });

    test("should reject invalid credentials", async () => {
        const response = await request(app)
            .post("/auth/login")
            .send({
                email: "doesnotexist@example.com",
                password: "wrongpassword",
            });

        expect(response.statusCode).toBe(401);
        expect(response.body.error).toBe("Invalid credentials");
    });

    test("should login successfully with valid credentials", async () => {
        const response = await request(app)
            .post("/auth/login")
            .send({
                email: "test@example.com",
                password: "TestPassword123",
            });

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty("user");
        expect(response.body).toHaveProperty("token");

        expect(response.body.user.email).toBe("test@example.com");
        expect(response.body.user.role).toBe("STUDENT");
        expect(typeof response.body.token).toBe("string");
    });
});