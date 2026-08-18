const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const getAllStaff = async (page, limit, search, sortBy, order) => {
    const skip = (page - 1) * limit;

    const where = search
    ? {
          OR: [
              {
                  name: {
                      contains: search,
                  },
              },
              {
                  phone: {
                      contains: search,
                  },
              },
              {
                  user: {
                      email: {
                          contains: search,
                      },
                  },
              },
              {
                  supportUnit: {
                      name: {
                          contains: search,
                      },
                  },
              },
          ],
      }
    : {};

    const allowedSortFields = [
        "id",
        "name",
        "staffRole",
    ];

    const safeSortBy = allowedSortFields.includes(sortBy)
        ? sortBy
        : "id";

    const safeOrder = order === "desc" ? "desc" : "asc";

    const [staffs, totalStaff] = await Promise.all([
        prisma.staffProfile.findMany({
            where,
            skip,
            take: limit,

            orderBy: {
                [safeSortBy]: safeOrder,
            },

            select: {
                id: true,
                name: true,
                phone: true,
                staffRole: true,

                user: {
                    select: {
                        id: true,
                        email: true,
                    },
                },

                supportUnit: {
                    select: {
                        id: true,
                        name: true,
                    },
                },
            },
        }),

        prisma.staffProfile.count({
            where,
        }),
    ]);

    const totalPages = Math.ceil(totalStaff / limit);

    return {
        staffs,
        totalStaff,
        totalPages,
        currentPage: page,
    };
};

module.exports = {
    getAllStaff,
};