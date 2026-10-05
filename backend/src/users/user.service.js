const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();





const getCurrentUser = async (userId) => {

    const user = await prisma.user.findUnique({
        where: {
            id: userId,
        },
        select: {
            id: true,
            email: true,
            role: true,

            studentProfile: {
                select: {
                    name: true,
                    phone: true,
                
                },
            },

            staffProfile: {
                select: {
                    name: true,
                    staffRole: true
                },
            },
        },
    });

    if (!user) {
        const error = new Error("User not found");
        error.status = 404;
        throw error;
    }

    return user;
};




module.exports = {
    getCurrentUser
};
