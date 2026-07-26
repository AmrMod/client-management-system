const userService = require('./user.service');

const getAllUsers = async (req, res) => {
    try {
        const users = await userService.getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await userService.getUserById(id);
        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const createUserByAdmin = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        const newUser = await userService.createUserByAdmin({ name, email, password, role });
        res.status(201).json(newUser);
    } catch (error) {
        console.error(error);
        if (error.status) {
            return res.status(error.status).json({ error: error.message });
        }
        res.status(500).json({ error: 'Internal server error' });
    }
};

const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await userService.deleteUser(id);
        res.status(200).json({ message: "User deleted successfully", user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const updateUserByAdmin = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, password, role } = req.body;
        const user = await userService.updateUserByAdmin(id, { name, email, password, role });
        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const updateClientProfile = async (req, res) => {
    try {
        const { id } = req.params;
        const { userId, name, email, Phone, company, status } = req.body;
        const result = await userService.updateClientProfile(id, { userId, name, email, Phone, company, status });
        res.status(200).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const updatePassword = async (req, res) => {
    try {
        const { id } = req.params;
        const { currentPassword, password } = req.body;
        const user = await userService.updatePassword(id, { currentPassword, password });
        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        if (error.status) {
            return res.status(error.status).json({ error: error.message });
        }
        res.status(500).json({ error: 'Internal server error' });
    }
};

// const getTotalUsers = async (req, res) => {
//     try {
//         const users = await userService.getTotalUsers();
//         res.status(200).json(users);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// };

// const getUsersThisMonth = async (req, res) => {
//     try {
//         const users = await userService.getUsersThisMonth();
//         res.status(200).json(users);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// };

const getDashboardStats = async (req, res) => {
    try {
        const stats = await userService.getDashboardStats();
        res.status(200).json(stats);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

//route get all users or search name
const searchUsers = async (req, res) => {
    try {
        const {query} = req.query;
        const users = await userService.searchUsers(query);
        res.status(200).json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};



module.exports = {
    getAllUsers,
    getUserById,
    createUserByAdmin,
    deleteUser,
    updateUserByAdmin,
    updateClientProfile,
    updatePassword,
    // getTotalUsers,
    // getUsersThisMonth,
    getDashboardStats,
    searchUsers
};
