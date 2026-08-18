const studentService = require("./student.service");

const getAllStudents = async (req, res) => {
    try {
        const page = parseInt(req.query.page, 10) || 1;

        const limit = parseInt(req.query.limit, 10) || 10;

        const search = req.query.search || "";

        const sortBy = req.query.sortBy || "id";

        const order = req.query.order || "asc";

        const data = await studentService.getAllStudents(
            page,
            limit,
            search,
            sortBy,
            order
        );

        res.status(200).json(data);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: "Failed to fetch students",
        });
    }
};

module.exports = {
    getAllStudents,
};