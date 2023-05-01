import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class BanUserDto {
  @IsNumber({}, { message: 'Поле должно быть числом' })
  @ApiProperty({ example: 'mail@bk.ru', description: 'Логин пользователя' })
  readonly userId: number;

  @IsString({ message: 'Поле должно быть строкой' })
  @ApiProperty({ example: 'Шалил', description: 'ИРезон для бана' })
  readonly reason: string;
}
