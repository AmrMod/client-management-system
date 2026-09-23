const request = require("supertest");
const app = require("../app");

const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

describe("GET /dashboard/student", () => {
    test("should return accurate dashboard statistics for a STUDENT", async () => {
        const student = await prisma.studentProfile.findUnique({
            where: {
                studentId: "TEST001",
            },
        });

        const supportUnit = await prisma.supportUnit.findUnique({
            where: {
                name: "Test Support Unit",
            },
        });

        const createdRequests = [];

        try {
            const pendingRequest = await prisma.request.create({
                data: {
                    studentId: student.id,
                    supportUnitId: supportUnit.id,
                    title: "Pending request",
                    description: "Testing pending request",
                    priority: "MEDIUM",
                    status: "PENDING",
                },
            });

            createdRequests.push(pendingRequest.id);

            const inProgressRequest = await prisma.request.create({
                data: {
                    studentId: student.id,
                    supportUnitId: supportUnit.id,
                    title: "In progress request",
                    description: "Testing in progress request",
                    priority: "MEDIUM",
                    status: "IN_PROGRESS",
                },
            });

            createdRequests.push(inProgressRequest.id);

            const resolvedRequest = await prisma.request.create({
                data: {
                    studentId: student.id,
                    supportUnitId: supportUnit.id,
                    title: "Resolved request",
                    description: "Testing resolved request",
                    priority: "MEDIUM",
                    status: "RESOLVED",
                },
            });

            createdRequests.push(resolvedRequest.id);

            const rejectedRequest = await prisma.request.create({
                data: {
                    studentId: student.id,
                    supportUnitId: supportUnit.id,
                    title: "Rejected request",
                    description: "Testing rejected request",
                    priority: "MEDIUM",
                    status: "REJECTED",
                },
            });

            createdRequests.push(rejectedRequest.id);

            const loginResponse = await request(app)
                .post("/auth/login")
                .send({
                    email: "test@example.com",
                    password: "TestPassword123",
                });

            expect(loginResponse.statusCode).toBe(200);

            const token = loginResponse.body.token;

            const response = await request(app)
                .get("/dashboard/student")
                .set("Authorization", `Bearer ${token}`);

            expect(response.statusCode).toBe(200);

            expect(response.body).toEqual({
                totalRequests: 4,
                pendingRequests: 1,
                inProgressRequests: 1,
                resolvedRequests: 1,
                rejectedRequests: 1,
            });

        } finally {
            await prisma.request.deleteMany({
                where: {
                    id: {
                        in: createdRequests,
                    },
                },
            });
        }
    });

    test("should reject unauthenticated access", async () => {
        const response = await request(app)
            .get("/dashboard/student");

        expect(response.statusCode).toBe(401);
    });

    test("should reject STAFF user from accessing the student dashboard", async () => {
        const loginResponse = await request(app)
            .post("/auth/login")
            .send({
                email: "manager@example.com",
                password: "TestPassword123",
            });

        expect(loginResponse.statusCode).toBe(200);

        const token = loginResponse.body.token;

        const response = await request(app)
            .get("/dashboard/student")
            .set("Authorization", `Bearer ${token}`);

        expect(response.statusCode).toBe(403);
    });
});
