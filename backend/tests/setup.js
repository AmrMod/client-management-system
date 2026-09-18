require("dotenv").config({
    path: ".env.test",
});

const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

beforeAll(async () => {
    const hashedPassword = await bcrypt.hash("TestPassword123", 10);

    await prisma.message.deleteMany();
    await prisma.conversation.deleteMany();
    await prisma.request.deleteMany();
    await prisma.studentProfile.deleteMany();
    await prisma.staffProfile.deleteMany();
    await prisma.supportUnit.deleteMany();

    await prisma.user.deleteMany({
        where: {
            email: {
                in: ["test@example.com","staff@example.com","manager@example.com", "support@example.com",],
            },
        },
    });

    const studentUser = await prisma.user.create({
        data: {
            email: "test@example.com",
            password: hashedPassword,
            role: "STUDENT",
        },
    });

    const managerUser = await prisma.user.create({
        data: {
            email: "manager@example.com",
            password: hashedPassword,
            role: "STAFF",
        },
    });

    const supportUser = await prisma.user.create({
        data: {
            email: "support@example.com",
            password: hashedPassword,
            role: "STAFF",
        },
    });

    const supportUnit = await prisma.supportUnit.create({
        data: {
            name: "Test Support Unit",
        },
    });

    await prisma.studentProfile.create({
        data: {
            userId: studentUser.id,
            studentId: "TEST001",
            name: "Test Student",
            department: "Computer Science",
            programme: "BSc Computer Science",
            level: "400",
        },
    });

    await prisma.staffProfile.create({
        data: {
            userId: managerUser.id,
            name: "Test Manager",
            staffRole: "MANAGER",
            supportUnitId: supportUnit.id,
        },
    });

    await prisma.staffProfile.create({
        data: {
            userId: supportUser.id,
            name: "Test Support Staff",
            staffRole: "SUPPORT_STAFF",
            supportUnitId: supportUnit.id,
        },
    });
});

afterAll(async () => {
    await prisma.message.deleteMany();
    await prisma.conversation.deleteMany();
    await prisma.request.deleteMany();
    await prisma.studentProfile.deleteMany();
    await prisma.staffProfile.deleteMany();
    await prisma.supportUnit.deleteMany();

    await prisma.user.deleteMany({
        where: {
            email: {
                in: ["test@example.com", "staff@example.com","manager@example.com", "support@example.com",],
            },
        },
    });

    await prisma.$disconnect();
});