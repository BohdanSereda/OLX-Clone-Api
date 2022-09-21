import { ParseFilePipe, FileTypeValidator } from "@nestjs/common";
import { MulterOptions } from "@nestjs/platform-express/multer/interfaces/multer-options.interface";
import { ApiBodyOptions } from "@nestjs/swagger";
import { diskStorage } from "multer";
import path = require('path');
import { v4 as uuidv4 } from 'uuid';
import { fileFilter } from "../dto/custom-types.dto";
import * as fs from 'fs';
import * as util from 'util';

export const parseFilePipe = new ParseFilePipe({
  validators: [
    new FileTypeValidator({fileType: fileFilter})
  ]
})
export const filesInterceptorConfig: [string, number, MulterOptions] =['images', 8, {
    storage: diskStorage({
      destination: './images',
      filename: (req, file, cb) =>{
        const fileExtension: string = path.extname(file.originalname);
        const fileName: string = uuidv4() + fileExtension
        cb(null, fileName)
      }
    })
}]

export const apiBodySchema: ApiBodyOptions = {
  schema: {
    type: 'object',
    properties: {
      name: {example: 'Car', type: 'string', description: 'good\'s name'},
      category: {example: 'cars',  type: "CategoryType", description: 'good\'s category'},
      description: {example: 'Very cool car',  type: 'string', description: 'good\'s description'},
      price: {example: 28000,  type: 'number', description: 'good\'s price'},
      condition: {example: 'New',  type: 'string', description: 'good\'s condition'},
      address:{example: 'Lviv, Naukova 36/9',  type: 'string', description: 'user\'s address'},
      phone: {example: '+380734162069',  type: 'string', description: 'user\'s phone number'},
      images: {
        type: 'array',
        items: {
          type: 'string',
          format: 'binary'
        },
        description: 'good\'s images'
      },
    },
  },
}

export const unlinkFile = util.promisify(fs.unlink)