const dashboardService = require('./dashboard.service');

const getStudentDashboardStats = async (req, res) => {
    try {
        const userId = req.user.userId;

        const stats =
            await dashboardService.getStudentDashboardStats(userId);

        res.status(200).json(stats);

    } catch (error) {
        if (error.status) {
            return res.status(error.status).json({
                error: error.message
            });
        }

        res.status(500).json({
            error: 'Internal server error'
        });
    }
};

module.exports = {
    getStudentDashboardStats
};