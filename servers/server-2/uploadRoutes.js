const express = require("express");
const { uploadImage, getImageURL } = require("./uploadControllers");
const router = express.Router();
const multer = require('multer')

const storage = multer.memoryStorage();
const upload = multer({ storage: storage })

router.post("/upload", upload.single('file'), uploadImage);
router.get("/getURL/:name", getImageURL);






module.exports = router;

