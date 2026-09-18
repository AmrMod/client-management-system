const request = require("supertest");
const app = require("../app");

const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

describe("POST /requests", () => {
    test("should reject unauthenticated request creation", async () => {
        const response = await request(app)
            .post("/requests")
            .send({
                supportUnitId: 1,
                title: "Test request",
                description: "This is a test request",
                priority: "MEDIUM",
            });

        expect(response.statusCode).toBe(401);
    });

    test("should reject STAFF user from creating a student request", async () => {
    const loginResponse = await request(app)
        .post("/auth/login")
        .send({
            email: "manager@example.com",
            password: "TestPassword123",
        });

    expect(loginResponse.statusCode).toBe(200);

    const token = loginResponse.body.token;

    const response = await request(app)
        .post("/requests")
        .set("Authorization", `Bearer ${token}`)
        .send({
            supportUnitId: 1,
            title: "Test request",
            description: "This is a test request",
            priority: "MEDIUM",
        });

    expect(response.statusCode).toBe(403);
});

    test("should allow a STUDENT to create a request", async () => {
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

    const response = await request(app)
        .post("/requests")
        .set("Authorization", `Bearer ${token}`)
        .send({
            supportUnitId: supportUnit.id,
            title: "Test request",
            description: "This is a test request",
            priority: "MEDIUM",
        });

    expect(response.statusCode).toBe(201);

    expect(response.body).toHaveProperty("id");
    expect(response.body.title).toBe("Test request");
    expect(response.body.description).toBe("This is a test request");
    expect(response.body.priority).toBe("MEDIUM");
    expect(response.body.status).toBe("PENDING");
});

    test("should reject a STUDENT request with invalid data", async () => {
    const loginResponse = await request(app)
        .post("/auth/login")
        .send({
            email: "test@example.com",
            password: "TestPassword123",
        });

    expect(loginResponse.statusCode).toBe(200);

    const token = loginResponse.body.token;

    const response = await request(app)
        .post("/requests")
        .set("Authorization", `Bearer ${token}`)
        .send({});

    expect(response.statusCode).toBe(400);
});

test("should allow a MANAGER to assign a request to support staff", async () => {
    const supportUnit = await prisma.supportUnit.findUnique({
        where: {
            name: "Test Support Unit",
        },
    });

    const supportStaff = await prisma.staffProfile.findFirst({
        where: {
            staffRole: "SUPPORT_STAFF",
            supportUnitId: supportUnit.id,
        },
    });

    const student = await prisma.studentProfile.findUnique({
        where: {
            studentId: "TEST001",
        },
    });

    const newRequest = await prisma.request.create({
        data: {
            studentId: student.id,
            supportUnitId: supportUnit.id,
            title: "Assignment test request",
            description: "Testing manager assignment",
            priority: "MEDIUM",
        },
    });

    const loginResponse = await request(app)
        .post("/auth/login")
        .send({
            email: "manager@example.com",
            password: "TestPassword123",
        });

    expect(loginResponse.statusCode).toBe(200);

    const token = loginResponse.body.token;

    const response = await request(app)
        .patch(`/requests/${newRequest.id}/assign`)
        .set("Authorization", `Bearer ${token}`)
        .send({
            staffId: supportStaff.id,
        });

    expect(response.statusCode).toBe(200);
    
    expect(response.body.assignedStaff.id).toBe(supportStaff.id);
});

test("should allow SUPPORT_STAFF to update an assigned request status", async () => {
    const supportUnit = await prisma.supportUnit.findUnique({
        where: {
            name: "Test Support Unit",
        },
    });

    const supportStaff = await prisma.staffProfile.findFirst({
        where: {
            staffRole: "SUPPORT_STAFF",
            supportUnitId: supportUnit.id,
        },
    });

    const student = await prisma.studentProfile.findUnique({
        where: {
            studentId: "TEST001",
        },
    });

    const newRequest = await prisma.request.create({
        data: {
            studentId: student.id,
            supportUnitId: supportUnit.id,
            assignedStaffId: supportStaff.id,
            title: "Status update test request",
            description: "Testing support staff status update",
            priority: "MEDIUM",
        },
    });

    const loginResponse = await request(app)
        .post("/auth/login")
        .send({
            email: "support@example.com",
            password: "TestPassword123",
        });

    expect(loginResponse.statusCode).toBe(200);

    const token = loginResponse.body.token;

    const response = await request(app)
        .patch(`/requests/${newRequest.id}/status`)
        .set("Authorization", `Bearer ${token}`)
        .send({
            status: "IN_PROGRESS",
        });

    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe("IN_PROGRESS");
});
});