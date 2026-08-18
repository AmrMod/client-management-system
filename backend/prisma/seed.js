// const { PrismaClient } = require("@prisma/client");
// const { faker } = require("@faker-js/faker");

// const prisma = new PrismaClient();

// async function main() {
//   const users = [];

//   for (let i = 0; i < 100; i++) {
//     users.push({
//       name: faker.person.fullName(),
//       email: faker.internet.email().toLowerCase(),
//       password: "123456",
//       role: i < 80 ? "CLIENT" : "ADMIN",
//       createdAt: faker.date.between({
//         from: new Date("2026-01-01"),
//         to: new Date("2026-07-31"),
//       }),
//     });
//   }

//   await prisma.user.createMany({
//   data: users,
// });

//   console.log("✅ 100 fake users inserted successfully!");
// }

// main()
//   .catch((error) => {
//     console.error(error);
//   })
//   .finally(async () => {
//     await prisma.$disconnect();
//   });

// const { PrismaClient } = require("@prisma/client");

// const prisma = new PrismaClient();

// async function main() {
//   console.log("Clearing database...");

//   // Delete dependent records first
//   await prisma.studentNote.deleteMany();
//   await prisma.request.deleteMany();
//   await prisma.staffProfile.deleteMany();
//   await prisma.studentProfile.deleteMany();
//   await prisma.supportUnit.deleteMany();
//   await prisma.user.deleteMany();

//   console.log("Database cleared.");

//   // ==========================================
//   // ADMIN
//   // ==========================================

//   await prisma.user.create({
//     data: {
//       email: "admin@admin.admin",
//       password: "123456",
//       role: "ADMIN",
//     },
//   });

//   // ==========================================
//   // SUPPORT UNITS
//   // ==========================================

//   const itSupport = await prisma.supportUnit.create({
//     data: {
//       name: "IT Support",
//     },
//   });

//   const academicSupport = await prisma.supportUnit.create({
//     data: {
//       name: "Academic Support",
//     },
//   });

//   const financeSupport = await prisma.supportUnit.create({
//     data: {
//       name: "Finance Support",
//     },
//   });

//   // ==========================================
//   // MANAGERS
//   // ==========================================

//   await prisma.user.create({
//     data: {
//       email: "manager1@admin.com",
//       password: "123456",
//       role: "STAFF",

//       staffProfile: {
//         create: {
//           name: "John Manager",
//           phone: "08012345678",
//           staffRole: "MANAGER",
//           supportUnitId: itSupport.id,
//         },
//       },
//     },
//   });

//   await prisma.user.create({
//     data: {
//       email: "manager2@admin.com",
//       password: "123456",
//       role: "STAFF",

//       staffProfile: {
//         create: {
//           name: "Sarah Manager",
//           phone: "08023456789",
//           staffRole: "MANAGER",
//           supportUnitId: academicSupport.id,
//         },
//       },
//     },
//   });

//   // ==========================================
//   // SUPPORT STAFF
//   // ==========================================

//   await prisma.user.create({
//     data: {
//       email: "support1@admin.com",
//       password: "123456",
//       role: "STAFF",

//       staffProfile: {
//         create: {
//           name: "David Support",
//           phone: "08034567890",
//           staffRole: "SUPPORT_STAFF",
//           supportUnitId: itSupport.id,
//         },
//       },
//     },
//   });

//   await prisma.user.create({
//     data: {
//       email: "support2@admin.com",
//       password: "123456",
//       role: "STAFF",

//       staffProfile: {
//         create: {
//           name: "Mary Support",
//           phone: "08045678901",
//           staffRole: "SUPPORT_STAFF",
//           supportUnitId: academicSupport.id,
//         },
//       },
//     },
//   });

//   await prisma.user.create({
//     data: {
//       email: "support3@admin.com",
//       password: "123456",
//       role: "STAFF",

//       staffProfile: {
//         create: {
//           name: "Daniel Support",
//           phone: "08056789012",
//           staffRole: "SUPPORT_STAFF",
//           supportUnitId: financeSupport.id,
//         },
//       },
//     },
//   });

//   // ==========================================
//   // STUDENTS
//   // ==========================================

//   await prisma.user.create({
//     data: {
//       email: "student1@student.com",
//       password: "123456",
//       role: "STUDENT",

//       studentProfile: {
//         create: {
//           studentId: "AUN2026001",
//           name: "Amir Ahmed",
//           phone: "08011111111",
//           department: "Computer Science",
//           programme: "BSc Computer Science",
//           level: "400",
//         },
//       },
//     },
//   });

//   await prisma.user.create({
//     data: {
//       email: "student2@student.com",
//       password: "123456",
//       role: "STUDENT",

//       studentProfile: {
//         create: {
//           studentId: "AUN2026002",
//           name: "Fatima Yusuf",
//           phone: "08022222222",
//           department: "Information Systems",
//           programme: "BSc Information Systems",
//           level: "300",
//         },
//       },
//     },
//   });

//   await prisma.user.create({
//     data: {
//       email: "student3@student.com",
//       password: "123456",
//       role: "STUDENT",

//       studentProfile: {
//         create: {
//           studentId: "AUN2026003",
//           name: "Ibrahim Musa",
//           phone: "08033333333",
//           department: "Software Engineering",
//           programme: "BSc Software Engineering",
//           level: "200",
//         },
//       },
//     },
//   });

//   await prisma.user.create({
//     data: {
//       email: "student4@student.com",
//       password: "123456",
//       role: "STUDENT",

//       studentProfile: {
//         create: {
//           studentId: "AUN2026004",
//           name: "Aisha Bello",
//           phone: "08044444444",
//           department: "Computer Science",
//           programme: "BSc Computer Science",
//           level: "100",
//         },
//       },
//     },
//   });

//   await prisma.user.create({
//     data: {
//       email: "student5@student.com",
//       password: "123456",
//       role: "STUDENT",

//       studentProfile: {
//         create: {
//           studentId: "AUN2026005",
//           name: "Mustapha Ali",
//           phone: "08055555555",
//           department: "Cybersecurity",
//           programme: "BSc Cybersecurity",
//           level: "400",
//         },
//       },
//     },
//   });

//   console.log("=================================");
//   console.log("Database seeding completed!");
//   console.log("=================================");
// }

// main()
//   .catch((error) => {
//     console.error(error);
//     process.exit(1);
//   })
//   .finally(async () => {
//     await prisma.$disconnect();
//   });

const { PrismaClient } = require("@prisma/client");
const { faker } = require("@faker-js/faker");

const prisma = new PrismaClient();

async function main() {
  console.log("Clearing database...");

  // ==========================================
  // CLEAR DATABASE
  // ==========================================

  await prisma.message.deleteMany();
  await prisma.conversation.deleteMany();
  await prisma.notification.deleteMany();
  await prisma.studentNote.deleteMany();
  await prisma.requestAttachment.deleteMany();
  await prisma.request.deleteMany();
  await prisma.staffProfile.deleteMany();
  await prisma.studentProfile.deleteMany();
  await prisma.supportUnit.deleteMany();
  await prisma.user.deleteMany();

  console.log("Database cleared.");

  // ==========================================
  // ADMIN
  // ==========================================

  await prisma.user.create({
    data: {
      email: "admin@admin.admin",
      password: "123456",
      role: "ADMIN",
    },
  });

  // ==========================================
  // SUPPORT UNITS
  // ==========================================

  const itSupport = await prisma.supportUnit.create({
    data: {
      name: "IT Support",
    },
  });

  const academicSupport = await prisma.supportUnit.create({
    data: {
      name: "Academic Support",
    },
  });

  const financeSupport = await prisma.supportUnit.create({
    data: {
      name: "Finance Support",
    },
  });

  const supportUnits = [
    itSupport.id,
    academicSupport.id,
    financeSupport.id,
  ];

  // ==========================================
  // MANAGERS
  // ==========================================

  await prisma.user.create({
    data: {
      email: "manager1@admin.com",
      password: "123456",
      role: "STAFF",

      staffProfile: {
        create: {
          name: "John Manager",
          phone: "08012345678",
          staffRole: "MANAGER",
          supportUnitId: itSupport.id,
        },
      },
    },
  });

  await prisma.user.create({
    data: {
      email: "manager2@admin.com",
      password: "123456",
      role: "STAFF",

      staffProfile: {
        create: {
          name: "Sarah Manager",
          phone: "08023456789",
          staffRole: "MANAGER",
          supportUnitId: academicSupport.id,
        },
      },
    },
  });

  // ==========================================
  // SUPPORT STAFF
  // ==========================================

  await prisma.user.create({
    data: {
      email: "support1@admin.com",
      password: "123456",
      role: "STAFF",

      staffProfile: {
        create: {
          name: "David Support",
          phone: "08034567890",
          staffRole: "SUPPORT_STAFF",
          supportUnitId: itSupport.id,
        },
      },
    },
  });

  await prisma.user.create({
    data: {
      email: "support2@admin.com",
      password: "123456",
      role: "STAFF",

      staffProfile: {
        create: {
          name: "Mary Support",
          phone: "08045678901",
          staffRole: "SUPPORT_STAFF",
          supportUnitId: academicSupport.id,
        },
      },
    },
  });

  await prisma.user.create({
    data: {
      email: "support3@admin.com",
      password: "123456",
      role: "STAFF",

      staffProfile: {
        create: {
          name: "Daniel Support",
          phone: "08056789012",
          staffRole: "SUPPORT_STAFF",
          supportUnitId: financeSupport.id,
        },
      },
    },
  });

  // ==========================================
  // ORIGINAL STUDENTS
  // ==========================================

  const originalStudents = [
    {
      email: "student1@student.com",
      studentId: "AUN2026001",
      name: "Amir Ahmed",
      phone: "08011111111",
      department: "Computer Science",
      programme: "BSc Computer Science",
      level: "400",
    },
    {
      email: "student2@student.com",
      studentId: "AUN2026002",
      name: "Fatima Yusuf",
      phone: "08022222222",
      department: "Information Systems",
      programme: "BSc Information Systems",
      level: "300",
    },
    {
      email: "student3@student.com",
      studentId: "AUN2026003",
      name: "Ibrahim Musa",
      phone: "08033333333",
      department: "Software Engineering",
      programme: "BSc Software Engineering",
      level: "200",
    },
    {
      email: "student4@student.com",
      studentId: "AUN2026004",
      name: "Aisha Bello",
      phone: "08044444444",
      department: "Computer Science",
      programme: "BSc Computer Science",
      level: "100",
    },
    {
      email: "student5@student.com",
      studentId: "AUN2026005",
      name: "Mustapha Ali",
      phone: "08055555555",
      department: "Cybersecurity",
      programme: "BSc Cybersecurity",
      level: "400",
    },
  ];

  for (const student of originalStudents) {
    await prisma.user.create({
      data: {
        email: student.email,
        password: "123456",
        role: "STUDENT",

        studentProfile: {
          create: {
            studentId: student.studentId,
            name: student.name,
            phone: student.phone,
            department: student.department,
            programme: student.programme,
            level: student.level,
          },
        },
      },
    });
  }

  // ==========================================
  // FAKE STAFF
  // ==========================================

  for (let i = 1; i <= 50; i++) {
    await prisma.user.create({
      data: {
        email: `staff${i}@admin.com`,
        password: "123456",
        role: "STAFF",

        staffProfile: {
          create: {
            name: faker.person.fullName(),
            phone: faker.phone.number(),
            staffRole: i <= 15 ? "MANAGER" : "SUPPORT_STAFF",
            supportUnitId:
              supportUnits[
                Math.floor(Math.random() * supportUnits.length)
              ],
          },
        },
      },
    });
  }

  // ==========================================
  // FAKE STUDENTS
  // ==========================================

  const departments = [
    "Computer Science",
    "Information Systems",
    "Software Engineering",
    "Accounting",
    "Business Administration",
    "Economics",
    "Cybersecurity",
  ];

  const programmes = {
    "Computer Science": "B.Sc. Computer Science",
    "Information Systems": "B.Sc. Information Systems",
    "Software Engineering": "B.Sc. Software Engineering",
    Accounting: "B.Sc. Accounting",
    "Business Administration": "B.Sc. Business Administration",
    Economics: "B.Sc. Economics",
    Cybersecurity: "B.Sc. Cybersecurity",
  };

  const levels = ["100", "200", "300", "400"];

  for (let i = 1; i <= 50; i++) {
    const department =
      departments[Math.floor(Math.random() * departments.length)];

    await prisma.user.create({
      data: {
        email: `student${i + 5}@student.com`,
        password: "123456",
        role: "STUDENT",

        studentProfile: {
          create: {
            studentId: `AUN/2026/${String(i + 5).padStart(3, "0")}`,
            name: faker.person.fullName(),
            phone: faker.phone.number(),
            department,
            programme: programmes[department],
            level:
              levels[Math.floor(Math.random() * levels.length)],
          },
        },
      },
    });
  }

  console.log("=================================");
  console.log("Database seeding completed!");
  console.log("=================================");
  console.log("1 admin");
  console.log("55 staff");
  console.log("55 students");
  console.log("=================================");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });