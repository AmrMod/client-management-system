// const { PrismaClient } = require('@prisma/client');
// const prisma = new PrismaClient();

//pagination and search
// const getAllStudentsWithPagination = async (page, limit) => {
//     const skip = (page - 1) * limit;

//     const [students, totalStudents] = await Promise.all([
//         prisma.studentProfile.findMany({
//             skip,
//             take: limit,
//             orderBy: {
//                 createdAt: "desc",
//             },
//         }),

//         prisma.studentProfile.count(),
//     ]);

//     const totalPages = Math.ceil(totalStudents / limit);

//     return {
//         students,
//         totalStudents,
//         totalPages,
//         currentPage: page,
//         limit,
//     };
// };


// module.exports = {
//     getAllStudentsWithPagination,
// };


//select * not efficient
// const { PrismaClient } = require("@prisma/client");

// const prisma = new PrismaClient();

// const getAllStudents = async (page, limit, search) => {
//     const skip = (page - 1) * limit;

//     const where = search
//         ? {
//               OR: [
//                   {
//                       name: {
//                           contains: search,
//                       },
//                   },
//                   {
//                       studentId: {
//                           contains: search,
//                       },
//                   },
//                   {
//                       department: {
//                           contains: search,
//                       },
//                   },
//                   {
//                       programme: {
//                           contains: search,
//                       },
//                   },
//               ],
//           }
//         : {};

//     const [students, totalStudents] = await Promise.all([
//         prisma.studentProfile.findMany({
//             where,
//             skip,
//             take: limit,
//             orderBy: {
//                 id: "asc",
//             },
//             include: {
//                 user: true,
//             },
//         }),

//         prisma.studentProfile.count({
//             where,
//         }),
//     ]);

//     const totalPages = Math.ceil(totalStudents / limit);

//     return {
//         students,
//         totalStudents,
//         totalPages,
//         currentPage: page,
//     };
// };

// module.exports = {
//     getAllStudents,
// };

//using joins instead of include 
//selecting specific columns for better performance


//added sorting and ordering parameters

const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const getAllStudents = async (
    page,
    limit,
    search,
    sortBy,
    order
) => {
    const skip = (page - 1) * limit;

    // ==========================================
    // SEARCH
    // ==========================================

    const where = search
        ? {
              OR: [
                  {
                      name: {
                          contains: search,
                      },
                  },
                  {
                      studentId: {
                          contains: search,
                      },
                  },
                  {
                      department: {
                          contains: search,
                      },
                  },
                  {
                      programme: {
                          contains: search,
                      },
                  },
              ],
          }
        : {};

    // ==========================================
    // SORTING
    // ==========================================

    const allowedSortFields = [
        "id",
        "name",
        "studentId",
        "department",
        "programme",
        "level",
    ];

    const validSortBy = allowedSortFields.includes(sortBy)
        ? sortBy
        : "id";

    const validOrder = order === "desc" ? "desc" : "asc";

    // ==========================================
    // DATABASE QUERY
    // ==========================================

    const [students, totalStudents] = await Promise.all([
        prisma.studentProfile.findMany({
            where,
            skip,
            take: limit,
            
            //computed property syntax
            orderBy: {
                [validSortBy]: validOrder,
            },

            select: {
                id: true,
                studentId: true,
                name: true,
                phone: true,
                department: true,
                programme: true,
                level: true,

                user: {
                    select: {
                        id: true,
                        email: true,
                    },
                },
            },
        }),

        prisma.studentProfile.count({
            where,
        }),
    ]);

    const totalPages = Math.ceil(totalStudents / limit);

    return {
        students,
        totalStudents,
        totalPages,
        currentPage: page,
        sortBy: validSortBy,
        order: validOrder,
    };
};

module.exports = {
    getAllStudents,
};