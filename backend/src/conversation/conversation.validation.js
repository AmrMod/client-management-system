const { z } = require("zod");

const createConversationSchema = z.object({
    body: z.object({
        supportUnitId: z.coerce
            .number({
                message: "Support unit must be a number"
            })
            .int({
                message: "Invalid support unit"
            })
            .positive({
                message: "Please select a valid support unit"
            })
    })
});

const createMessageSchema = z.object({

    body: z.object({

        content: z.string()
            .trim()
            .min(1, {
                message: "Message cannot be empty"
            })
            .max(5000, {
                message: "Message cannot exceed 5000 characters"
            })

    })

});

module.exports = {
    createConversationSchema,
    createMessageSchema
};