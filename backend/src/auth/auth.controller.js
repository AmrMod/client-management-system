const authService = require('./auth.service');

const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const newUser = await authService.register({ name, email, password });
        res.status(201).json(newUser);
    } catch (error) {
        console.error(error);
        if (error.status) {
            return res.status(error.status).json({ error: error.message });
        }
        res.status(500).json({ error: 'Internal server error' });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await authService.login({ email, password });
        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        if (error.status) {
            return res.status(error.status).json({ error: error.message });
        }
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    register,
    login
};
