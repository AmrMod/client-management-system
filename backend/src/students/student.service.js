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