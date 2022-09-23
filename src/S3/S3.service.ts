import { Injectable } from '@nestjs/common';
import * as AWS from "aws-sdk";
import * as fs from 'fs';
import * as fsExtra from 'fs-extra'


@Injectable()
export class S3Service {
    amazonS3ObjectOrl = 'https://olx-amazing-clone.s3.eu-central-1.amazonaws.com/'
    s3 = new AWS.S3({
        region: process.env.AWS_BUCKET_REGION,
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_KEY
    })

    async upload(images: Array<Express.Multer.File>, postId: number): Promise<AWS.S3.ManagedUpload.SendData[]> {
        return Promise.all(images.map(async (image) => {
            const fileStream = fs.createReadStream(image.path)
            const uploadParams = {
                Bucket: process.env.AWS_BUCKET_NAME,
                Body: fileStream,
                Key: `${postId}-${image.filename}`
            }
            fsExtra.emptyDir('images')
            return this.s3.upload(uploadParams).promise()
        }))
    }

    async update(images: Array<Express.Multer.File>, postId: number, postImages: string[]): Promise<AWS.S3.ManagedUpload.SendData[]> {
        const imagesNames = images.map(images => `${postId}-${images.filename}`)
        const deleteImages = postImages.filter(image => !imagesNames.includes(image))
        await Promise.all(deleteImages.map(async (image: string) => {
            const uploadParams = {
                Bucket: process.env.AWS_BUCKET_NAME,
                Key: image.split(this.amazonS3ObjectOrl).join('')
            }

            return this.s3.deleteObject(uploadParams).promise()
        }))
        return await this.upload(images, postId)
    }

    async remove(images: string[]): Promise<void>{        
        await Promise.all(images.map(async (image: string) => {
            const uploadParams = {
                Bucket: process.env.AWS_BUCKET_NAME,
                Key: image.split(this.amazonS3ObjectOrl).join('')
            }
            return this.s3.deleteObject(uploadParams).promise()
        }))
    }
}