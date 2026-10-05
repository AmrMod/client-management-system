const authService = require('./auth.service');



const login = async (req, res) => {
    try {
        const { email, password } = req.validated.body;

        const result = await authService.login({
            email,
            password
        });


        res.cookie("token", result.token, {
            httpOnly: true,
            secure: false, //https in production true
            sameSite: "lax",
            maxAge: 24 * 60 * 60 * 1000
        });


        res.status(200).json(result.user);

    } catch (error) {
        console.error("LOGIN ERROR:", error);

        if (error.status) {
            return res.status(error.status).json({
                error: error.message
            });
        }

        res.status(500).json({
            error: "Internal server error"
        });
    }
};

const logout = async (req, res) => {
    res.clearCookie("token", {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
    });

    res.status(200).json({
        message: "Logged out successfully",
    });
};

module.exports = {
    login,
    logout
};
