"use server";
 
import AWS from "aws-sdk";
import * as fs from "node:fs";

const s3 = new AWS.S3();

const uploadFile = (fileName, data, bucketName) => {

  fs.writeFile("./image_db.jpg", data, function(err) {
    if(err) throw err;
  });
  const fileContent = fs.readFileSync("./image_db.jpg");

  const params = {
    Bucket: "shopablog",
    Key: "./image_db.jpg",
    Body: fileContent,
  };

  s3.upload(params, (err, data) => {
    if (err) {
      console.error('Error uploading file:', err);
    } else {
      console.log(`File uploaded successfully. ${data.Location}`);
    }
  });
};

export default uploadFile;