const authService = require('./auth.service');

const register = async (req, res) => {
    try {
        const { email, password }    = req.body;
        const newUser = await authService.register({ email, password });
        res.status(201).json(newUser);
    } catch (error) {
        if (error.status) {
            return res.status(error.status).json({ error: error.message });
        }
        res.status(500).json({ error: 'Internal server error' });
    }
};

// const login = async (req, res) => {
//     try {
//         const { email, password } = req.validated.body;
//         const user = await authService.login({ email, password });

//         res.cookie("token", result.token, {
//             httpOnly: true,
//             secure: process.env.NODE_ENV === "production",
//             sameSite: "lax",
//             maxAge: 24 * 60 * 60 * 1000
//         });


//         res.status(200).json(user);
//     } catch (error) {
//         if (error.status) {
//             return res.status(error.status).json({ error: error.message });
//         }
//         res.status(500).json({ error: 'Internal server error' });
//     }
// };

const login = async (req, res) => {
    try {
        const { email, password } = req.validated.body;

        const result = await authService.login({
            email,
            password
        });

        console.log("LOGIN SUCCESS");
        console.log("TOKEN EXISTS:", !!result.token);

        res.cookie("token", result.token, {
            httpOnly: true,
            secure: false, //https in production true
            sameSite: "lax",
            maxAge: 24 * 60 * 60 * 1000
        });

        console.log("COOKIE SET");

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

module.exports = {
    register,
    login
};
