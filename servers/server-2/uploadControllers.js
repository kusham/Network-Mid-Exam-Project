const fs = require('fs')
const util = require('util')
const unlinkFile = util.promisify(fs.unlink)


module.exports.uploadImage = async (req, res) => {
    const file = req.body
    console.log(file.file);
    console.log(req.body)

    res.send(req.body)
  
    // apply filter
    // resize 
  
    // const result = await uploadFile(file)
    // await unlinkFile(file.path)
    // console.log(result)
    // res.send({imagePath: `/images/${result.Key}`})
}