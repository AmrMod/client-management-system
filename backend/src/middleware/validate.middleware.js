const validate = (schema) => {
    return (req, res, next) => {

        const result = schema.safeParse({
            body: req.body,
            query: req.query,
            params: req.params
        });

        if (!result.success) {
            return res.status(400).json({
                error: "Validation failed",
                details: result.error.issues
            });
        }

        req.validated = result.data;

        next();
    };
};

module.exports = validate;