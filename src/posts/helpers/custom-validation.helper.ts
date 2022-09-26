import {
    Injectable,
    PipeTransform,
    ArgumentMetadata,
    BadRequestException,
} from '@nestjs/common';
import {
    registerDecorator,
    ValidationOptions,
    ValidationArguments,
} from 'class-validator';

export function IsBiggerThan(
    property: string,
    validationOptions?: ValidationOptions,
) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            name: 'isBiggerThan',
            target: object.constructor,
            propertyName: propertyName,
            constraints: [property],
            options: validationOptions,
            validator: {
                validate(value: any, args: ValidationArguments) {
                    const [relatedPropertyName] = args.constraints;
                    const relatedValue = (args.object as any)[
                        relatedPropertyName
                    ];
                    return (
                        typeof value === 'number' &&
                        typeof relatedValue === 'number' &&
                        value > relatedValue
                    );
                },
            },
        });
    };
}

@Injectable()
export class ParseFiles implements PipeTransform {
    transform(
        files: Express.Multer.File[],
        metadata: ArgumentMetadata,
    ): Express.Multer.File | Express.Multer.File[] {
        files.forEach((file) => {
            if (file.size > 5242880) {
                throw new BadRequestException(
                    `validation failed (file: ${file.filename} is larger then 5mb)`,
                );
            }
            if (!file.mimetype.includes('image/')) {
                throw new BadRequestException(
                    `validation failed (file: ${file.filename} must be image)`,
                );
            }
        });

        return files;
    }
}
