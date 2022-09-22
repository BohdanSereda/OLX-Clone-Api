import { Injectable } from '@nestjs/common';
import * as AWS from "aws-sdk";
import * as fs from 'fs';



@Injectable()
export class S3Service{

    s3 = new AWS.S3({
        region: process.env.AWS_BUCKET_REGION,
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_KEY
    })
    
    async upload(images: Array<Express.Multer.File>, postId: number){
        return Promise.all(images.map(async (image)=>{
            const fileStream = fs.createReadStream(image.path)
            const uploadParams = {
                Bucket: process.env.AWS_BUCKET_NAME,
                Body: fileStream,
                Key: `${postId}-${image.filename}` 
            }
            return this.s3.upload(uploadParams).promise()
        }))
    }
}