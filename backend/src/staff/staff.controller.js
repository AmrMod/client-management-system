// const staffService = require("./staff.service");

// const getAllStaff = async (req, res) => {
//     try {
//         const { page, limit } = req.query;

//         const parsedPage = parseInt(page, 10);
//         const parsedLimit = parseInt(limit, 10);

//         const result = await staffService.getAllStaff(
//             parsedPage,
//             parsedLimit
//         );

//         res.status(200).json(result);

//     } catch (error) {
//         console.error(error);

//         res.status(500).json({
//             error: "Failed to fetch staff",
//         });
//     }
// };

// module.exports = {
//     getAllStaff,
// };

const staffService = require("./staff.service");

const getAllStaff = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;

        const search = req.query.search || "";
        const sortBy = req.query.sortBy || "id";
        const order = req.query.order || "asc";

        const result = await staffService.getAllStaff(
            page,
            limit,
            search,
            sortBy,
            order
        );

        res.status(200).json(result);
    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: "Failed to fetch staff",
        });
    }
};

module.exports = {
    getAllStaff,
};