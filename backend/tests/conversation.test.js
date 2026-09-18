const request = require("supertest");
const app = require("../app");

const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

describe("POST /conversations/:id/messages", () => {
    test("should allow a STUDENT to create and send a message", async () => {
        const supportUnit = await prisma.supportUnit.findUnique({
            where: {
                name: "Test Support Unit",
            },
        });

        const loginResponse = await request(app)
            .post("/auth/login")
            .send({
                email: "test@example.com",
                password: "TestPassword123",
            });

        expect(loginResponse.statusCode).toBe(200);

        const token = loginResponse.body.token;

        const conversationResponse = await request(app)
            .post("/conversations")
            .set("Authorization", `Bearer ${token}`)
            .send({
                supportUnitId: supportUnit.id,
            });

        expect(conversationResponse.statusCode).toBe(201);

        const conversationId = conversationResponse.body.id;

        const messageResponse = await request(app)
            .post(`/conversations/${conversationId}/messages`)
            .set("Authorization", `Bearer ${token}`)
            .send({
                content: "Hello, I need help with my request.",
            });

        expect(messageResponse.statusCode).toBe(201);
        expect(messageResponse.body.conversationId).toBe(conversationId);
        expect(messageResponse.body.content).toBe(
            "Hello, I need help with my request."
        );
        expect(messageResponse.body.senderType).toBe("student");
    });
});