const userService = require('./user.service');



const getCurrentUser = async (req, res) => {
    try {
        const user = await userService.getCurrentUser(req.user.userId);
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};






module.exports = {
    getCurrentUser
};
