// const multer = require("multer");

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, "uploads/");
//     },

//     filename: (req, file, cb) => {
//         const uniqueName =
//             `${Date.now()}-${Math.round(Math.random() * 1E9)}-${file.originalname}`;

//         cb(null, uniqueName);
//     }
// });

// const fileFilter = (req, file, cb) => {

//     const allowedTypes = [
//         "application/pdf",
//         "image/jpeg",
//         "image/png",
//         "application/msword",
//         "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
//     ];

//     if (allowedTypes.includes(file.mimetype)) {
//         cb(null, true);
//     } else {
//         cb(new Error("Unsupported file type"), false);
//     }
// };

// const upload = multer({
//     storage,
//     fileFilter,
//     limits: {
//         fileSize: 5 * 1024 * 1024
//     }
// });

// module.exports = upload;



const multer = require("multer");
const path = require("path");
const fs = require("fs");
const crypto = require("crypto");

// Use a consistent absolute path for uploaded files.
const uploadDir = path.resolve(process.cwd(), "uploads");

// Create the directory if it does not exist.
fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },

    filename: (req, file, cb) => {
        const extension = path.extname(file.originalname).toLowerCase();
        const uniqueName = `${Date.now()}-${crypto.randomUUID()}${extension}`;

        cb(null, uniqueName);
    }
});

const fileFilter = (req, file, cb) => {
    const allowedTypes = [
        "application/pdf",
        "image/jpeg",
        "image/png",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ];

    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error("Unsupported file type"), false);
    }
};

const upload = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024
    }
});

module.exports = upload;
