import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @IsString({ message: 'Поле должно быть строкой' })
  @IsEmail({}, { message: 'Email не корректный' })
  @ApiProperty({ example: 'mail@bk.ru', description: 'Логин пользователя' })
  readonly email: string;

  @IsString({ message: 'Поле должно быть строкой' })
  @Length(3, 20, { message: 'От 3 до 20 знаков' })
  @ApiProperty({ example: 'Vasyan', description: 'Имя пользователя' })
  readonly name: string;

  @IsString({ message: 'Поле должно быть строкой' })
  @Length(6, 10, { message: 'От 6 до 10 знаков' })
  @ApiProperty({ example: '123qwe', description: 'Пароль пользователя' })
  readonly password: string;
}
