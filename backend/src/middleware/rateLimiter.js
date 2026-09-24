const rateLimit = require("express-rate-limit");

const generalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    limit: 100,
    standardHeaders: "draft-8",
    legacyHeaders: false,
    message: {
        error: "Too many requests. Please try again later."
    }
});

const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    limit: 100, // return this to 10
    standardHeaders: "draft-8",
    legacyHeaders: false,
    message: {
        error: "Too many authentication attempts. Please try again later."
    }
});

module.exports = {
    generalLimiter,
    authLimiter
};