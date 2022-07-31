var multer = require("multer");


function createMulter(formats) {
    const storage = multer.memoryStorage({
        destination: function (req, file, cb) {
            cb(null, '')
        }
    });

    const fileFilter = createFileFilter(formats);

    const upload = multer({
        storage: storage,
        limits: { fileSize: 1000000 },
        fileFilter: fileFilter
    });

    return upload
}
// 'image/jpeg' 'image/jpg'
function createFileFilter(formats) {
    return (req, file, cb) => {
        if (formats.includes(file.mimetype)) {
            cb(null, true)
        }
        else {
            cb(null, false)
        }
    }
}    

module.exports = {createMulter: createMulter};