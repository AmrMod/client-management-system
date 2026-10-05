

const { z } = require("zod");


const createRequestSchema = z.object({
    body: z.object({
        supportUnitId: z.coerce
            .number({
                message: "Please select a support unit"
            })
            .int({
                message: "Invalid support unit"
            })
            .positive({
                message: "Please select a valid support unit"
            }),

        title: z.string()
            .trim()
            .min(1, {
                message: "Request subject is required"
            }),

        description: z.string()
            .trim()
            .min(1, {
                message: "Request description is required"
            }),

        priority: z.enum(
            [
                "LOW",
                "MEDIUM",
                "HIGH"
            ],
            {
                message: "Please select a valid priority"
            }
        )
    })
});


const getMyRequestsSchema = z.object({

    query: z.object({

        page: z.coerce
            .number({
                message: "Page must be a number"
            })
            .int({
                message: "Page must be a whole number"
            })
            .positive({
                message: "Page must be greater than 0"
            })
            .default(1),

        limit: z.coerce
            .number({
                message: "Limit must be a number"
            })
            .int({
                message: "Limit must be a whole number"
            })
            .positive({
                message: "Limit must be greater than 0"
            })
            .max(100, {
                message: "Limit cannot exceed 100"
            })
            .default(10),

        search: z.string()
            .trim()
            .default(""),

        sortBy: z.enum(
            [
                "id",
                "title",
                "priority",
                "status",
                "createdAt"
            ],
            {
                message: "Invalid sort field"
            }
        )
        .default("createdAt"),

        order: z.enum(
            [
                "asc",
                "desc"
            ],
            {
                message: "Sort order must be asc or desc"
            }
        )
        .default("asc")

    })

});


const managerRequestsSchema = z.object({

    query: z.object({

        page: z.coerce
            .number({
                message: "Page must be a number"
            })
            .int({
                message: "Page must be a whole number"
            })
            .min(1, {
                message: "Page must be greater than 0"
            })
            .default(1),

        limit: z.coerce
            .number({
                message: "Limit must be a number"
            })
            .int({
                message: "Limit must be a whole number"
            })
            .min(1, {
                message: "Limit must be greater than 0"
            })
            .max(100, {
                message: "Limit cannot exceed 100"
            })
            .default(10),

        search: z.string()
            .trim()
            .default(""),

        status: z.enum(
            [
                "PENDING",
                "IN_PROGRESS",
                "RESOLVED",
                "REJECTED"
            ],
            {
                message: "Invalid request status"
            }
        ).optional(),

        priority: z.enum(
            [
                "LOW",
                "MEDIUM",
                "HIGH",
                "URGENT"
            ],
            {
                message: "Invalid request priority"
            }
        ).optional(),

        sortBy: z.enum(
            [
                "id",
                "title",
                "priority",
                "status",
                "createdAt"
            ],
            {
                message: "Invalid sort field"
            }
        )
        .default("createdAt"),

        order: z.enum(
            [
                "asc",
                "desc"
            ],
            {
                message: "Sort order must be asc or desc"
            }
        )
        .default("desc")

    })

});


const supportRequestsSchema = z.object({

    query: z.object({

        page: z.coerce
            .number({
                message: "Page must be a number"
            })
            .int({
                message: "Page must be a whole number"
            })
            .min(1, {
                message: "Page must be greater than 0"
            })
            .default(1),

        limit: z.coerce
            .number({
                message: "Limit must be a number"
            })
            .int({
                message: "Limit must be a whole number"
            })
            .min(1, {
                message: "Limit must be greater than 0"
            })
            .max(100, {
                message: "Limit cannot exceed 100"
            })
            .default(10),

        search: z.string()
            .trim()
            .default(""),

        status: z.enum(
            [
                "PENDING",
                "IN_PROGRESS",
                "RESOLVED",
                "REJECTED"
            ],
            {
                message: "Invalid request status"
            }
        ).optional(),

        priority: z.enum(
            [
                "LOW",
                "MEDIUM",
                "HIGH",
                "URGENT"
            ],
            {
                message: "Invalid request priority"
            }
        ).optional(),

        sortBy: z.enum(
            [
                "id",
                "title",
                "priority",
                "status",
                "createdAt"
            ],
            {
                message: "Invalid sort field"
            }
        )
        .default("createdAt"),

        order: z.enum(
            [
                "asc",
                "desc"
            ],
            {
                message: "Sort order must be asc or desc"
            }
        )
        .default("desc")

    })
});

const managerStudentSummarySchema = z.object({
    query: z.object({
        page: z.coerce.number().int().min(1).default(1),

        limit: z.coerce.number().int().min(1).max(100).default(10),

        search: z.string().trim().default("")
    })
});

const managerStaffSummarySchema = z.object({
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

        sortBy: z.enum([
            "name"
        ]).default("name"),

        order: z.enum([
            "asc",
            "desc"
        ]).default("asc")
    })
});

const adminRequestsSchema = z.object({
    query: z.object({

        page: z.coerce
            .number({
                message: "Page must be a number"
            })
            .int({
                message: "Page must be a whole number"
            })
            .min(1, {
                message: "Page must be greater than 0"
            })
            .default(1),

        limit: z.coerce
            .number({
                message: "Limit must be a number"
            })
            .int({
                message: "Limit must be a whole number"
            })
            .min(1, {
                message: "Limit must be greater than 0"
            })
            .max(100, {
                message: "Limit cannot exceed 100"
            })
            .default(10),

        search: z.string()
            .trim()
            .default(""),

        status: z.enum(
            [
                "PENDING",
                "IN_PROGRESS",
                "RESOLVED",
                "REJECTED"
            ],
            {
                message: "Invalid request status"
            }
        ).optional(),

        priority: z.enum(
            [
                "LOW",
                "MEDIUM",
                "HIGH"
            ],
            {
                message: "Invalid request priority"
            }
        ).optional(),

        supportUnitId: z.coerce
            .number({
                message: "Support unit ID must be a number"
            })
            .int({
                message: "Support unit ID must be a whole number"
            })
            .positive({
                message: "Invalid support unit"
            })
            .optional(),

        sortBy: z.enum(
            [
                "id",
                "title",
                "priority",
                "status",
                "createdAt"
            ],
            {
                message: "Invalid sort field"
            }
        )
        .default("createdAt"),

        order: z.enum(
            [
                "asc",
                "desc"
            ],
            {
                message: "Sort order must be asc or desc"
            }
        )
        .default("desc")

    })
});


module.exports = {
    getMyRequestsSchema,
    managerRequestsSchema,
    supportRequestsSchema,
    createRequestSchema,
    managerStudentSummarySchema,
    managerStaffSummarySchema,
    adminRequestsSchema
};