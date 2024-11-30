const multer = require('multer');
const fs = require('fs');
const path = require('path');


const uploadDir = './uploads';
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true }); 
}

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, uploadDir); 
    },
    filename: (req, file, callback) => {
        const filename = `image-${Date.now()}-${file.originalname}`;
        callback(null, filename);
    }
});

const fileFilter = (req, file, callback) => {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png" || file.mimetype === "image/jpg") {
        callback(null, true);
    } else {
        callback(null, false);
        return callback(new Error("Please upload the following file extensions (jpeg/png/jpg)"));
    }
};

const multerConfig = multer({
    storage,
    fileFilter
});

module.exports = multerConfig;
