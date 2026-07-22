const { PrismaClient } = require("@prisma/client");
const { faker } = require("@faker-js/faker");

const prisma = new PrismaClient();

async function main() {
  const users = [];

  for (let i = 0; i < 100; i++) {
    users.push({
      name: faker.person.fullName(),
      email: faker.internet.email().toLowerCase(),
      password: "123456",
      role: i < 80 ? "CLIENT" : "ADMIN",
      createdAt: faker.date.between({
        from: new Date("2026-01-01"),
        to: new Date("2026-07-31"),
      }),
    });
  }

  await prisma.user.createMany({
  data: users,
});

  console.log("✅ 100 fake users inserted successfully!");
}

main()
  .catch((error) => {
    console.error(error);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });