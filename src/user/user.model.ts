import { Column, DataType, Model, Table } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';

interface UserCreationAttrs {
  email: string;
  name: string;
  password: string;
}

@Table({ tableName: 'user' })
export class User extends Model<User, UserCreationAttrs> {
  @ApiProperty({ example: '1', description: 'Идентификатор' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'mail@bk.ru', description: 'Логин пользователя' })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  email: string;

  @ApiProperty({ example: 'Vasya', description: 'Имя пользователя' })
  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @ApiProperty({ example: '123qwe', description: 'Пароль пользователя' })
  @Column({ type: DataType.STRING, allowNull: false })
  password: string;

  @ApiProperty({ example: 'true', description: 'Администратор' })
  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  isAdmin: boolean;

  @ApiProperty({ example: 'true', description: 'Пользователь забанен' })
  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  isBlocked: boolean;

  @ApiProperty({ example: 'Слишком умный', description: 'Причина бана' })
  @Column({ type: DataType.STRING, allowNull: true })
  blockReason: string;
}
