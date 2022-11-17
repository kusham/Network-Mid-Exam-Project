const fs = require("fs");
const {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
} = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

const bucketName = process.env.AWS_BUCKET_NAME;
const region = process.env.AWS_BUCKET_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_KEY;

const s3 = new S3Client({
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
  region,
});

// uploads a file to s3
const uploadFile = async (file, name) => {
  console.log("first");

  const uploadParams = {
    Bucket: bucketName,
    Body: file.buffer,
    Key: name,
    ContentType: file.mimetype,
  };

  const command = new PutObjectCommand(uploadParams);
  return await s3.send(command);
};

// downloads a file from s3
const getURL = async (fileName) => {
    console.log(fileName)
  const getObjectParams = {
    Key: fileName,
    Bucket: bucketName,
  };
  const command = new GetObjectCommand(getObjectParams);
  return await getSignedUrl(s3, command, { expiresIn: 3600*24 });
};

module.exports = { uploadFile, getURL };
