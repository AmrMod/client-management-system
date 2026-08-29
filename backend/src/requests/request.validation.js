const { z } = require("zod");


const getMyRequestsSchema = z.object({

    query: z.object({

        page: z.coerce
            .number()
            .int()
            .positive()
            .default(1),

        limit: z.coerce
            .number()
            .int()
            .positive()
            .max(100)
            .default(10),

        search: z.string()
            .trim()
            .default(""),

        sortBy: z.enum([
            "id",
            "title",
            "priority",
            "status",
            "createdAt"
        ])
        .default("createdAt"),

        order: z.enum([
            "asc",
            "desc"
        ])
        .default("asc")

    })

});


const managerRequestsSchema = z.object({

    query: z.object({

        page: z.coerce
            .number()
            .int()
            .min(1)
            .default(1),

        limit: z.coerce
            .number()
            .int()
            .min(1)
            .max(100)
            .default(10),

        search: z.string()
            .trim()
            .default(""),

        status: z.enum([
            "PENDING",
            "IN_PROGRESS",
            "RESOLVED",
            "REJECTED"
        ]).optional(),

        priority: z.enum([
            "LOW",
            "MEDIUM",
            "HIGH",
            "URGENT"
        ]).optional(),

        sortBy: z.enum([
            "id",
            "title",
            "priority",
            "status",
            "createdAt"
        ]).default("createdAt"),

        order: z.enum([
            "asc",
            "desc"
        ]).default("desc")

    })

});

const supportRequestsSchema = z.object({
    query: z.object({

        page: z.coerce
            .number()
            .int()
            .min(1)
            .default(1),

        limit: z.coerce
            .number()
            .int()
            .min(1)
            .max(100)
            .default(10),

        search: z.string()
            .trim()
            .default(""),

        status: z.enum([
            "PENDING",
            "IN_PROGRESS",
            "RESOLVED",
            "REJECTED"
        ])
        .optional(),

        priority: z.enum([
            "LOW",
            "MEDIUM",
            "HIGH",
            "URGENT"
        ])
        .optional(),

        sortBy: z.enum([
            "id",
            "title",
            "priority",
            "status",
            "createdAt"
        ])
        .default("createdAt"),

        order: z.enum([
            "asc",
            "desc"
        ])
        .default("desc")

    })
});


module.exports = {
    getMyRequestsSchema,
    managerRequestsSchema,
    supportRequestsSchema
};