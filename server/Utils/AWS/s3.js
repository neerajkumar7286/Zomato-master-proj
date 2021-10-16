import AWS from "aws-sdk";

const s3Bucket = new AWS.S3({
  accessKeyId: "AKIA2IAO5YUB4QJRELDK",
  secretAccessKey: "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",
  region: "ap-south-1"
});

export const s3Upload = (options) => {
  return new Promise((resolve, reject)=>
    s3Bucket.upload(options, (error,data)=>{
      if(error) return reject(error);
      return resolve(data);
    })
  );
};
