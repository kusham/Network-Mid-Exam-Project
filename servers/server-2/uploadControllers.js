const { uploadFile, getURL } = require("./s3");

module.exports.uploadImage = async (req, res) => {
  console.log(req.body);
  try {
    const result = await uploadFile(req.file, req.body.name);
    console.log(result);
    return res.status(200).json({
        success: true,
        message: "File successfully uploaded",
      });
  } catch (error) { 
    return res.status(400).json({
      success: false,
      message: "File has not uploaded",
      error: error.message,
    });
  }
};



module.exports.getImageURL = async (req, res) => {
    console.log("url")

    console.log(req.params);
    try {
      const result = await getURL(req.params.name);
      console.log(result);
      return res.status(200).json({
          success: true,
          message: "URL successfully fetched",
          url: result
        });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: "URL has not fetched",
        error: error.message,
      });
    }
  };
  