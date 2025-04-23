import AWS from "aws-sdk";

const s3 = new AWS.S3({
  accessKeyId: "",
  secretAccessKey: ""
});

export default s3;