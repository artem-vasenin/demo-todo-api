import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import {
  ArgumentMetadata,
  HttpException,
  HttpStatus,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class ValidationPipe implements PipeTransform {
  async transform(value: any, metadata: ArgumentMetadata): Promise<any> {
    const obj = plainToClass(metadata.metatype, value);
    const errors = await validate(obj);

    if (errors.length) {
      const messages = errors.map(
        (e) => `${e.property} - ${Object.values(e.constraints).join(', ')}`,
      );
      throw new HttpException(
        `JSON${JSON.stringify(messages)}`,
        HttpStatus.BAD_REQUEST,
      );
    }
    return value;
  }
}
