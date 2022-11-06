const express = require("express");
const { uploadImage } = require("./uploadControllers");
const router = express.Router();
// const multer = require('multer')


// const upload = multer({ dest: 'uploads/' })

router.post("/upload", uploadImage);





module.exports = router;

