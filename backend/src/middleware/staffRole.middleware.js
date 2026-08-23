const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();


const requireStaffRole = (...allowedRoles) => {

    return async (req, res, next) => {

        try {

            const userId = req.user?.userId;

            if (!userId) {
                return res.status(401).json({
                    error: "Authentication required"
                });
            }

            const staff = await prisma.staffProfile.findUnique({
                where: {
                    userId
                },
                select: {
                    staffRole: true
                }
            });

            if (!staff) {
                return res.status(403).json({
                    error: "Staff profile not found"
                });
            }

            if (!allowedRoles.includes(staff.staffRole)) {
                return res.status(403).json({
                    error: "Access denied"
                });
            }

            next();

        } catch (error) {

            console.error(error);

            res.status(500).json({
                error: "Internal server error"
            });
        }
    };
};


module.exports = requireStaffRole;