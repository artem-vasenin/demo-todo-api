import * as bcrypt from 'bcryptjs';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { User } from './user.model';
import { CreateUserDto } from '@/user/dto/create-user.dto';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class UserService {
  constructor(@InjectModel(User) private userRepo: typeof User) {
  }

  async create(dto: CreateUserDto): Promise<User> {
    return await this.userRepo.create(dto);
  }

  async getList(): Promise<User[]> {
    return await this.userRepo.findAll();
  }

  async getByLogin(email: string): Promise<User> {
    return await this.findOrError(email);
  }

  async update(dto: CreateUserDto): Promise<User> {
    const user = await this.findOrError(dto.email);
    const hashPasswd = await bcrypt.hash(dto.password, 5);
    user.name = dto.name;
    user.password = hashPasswd;
    await user.save();
    return user;
  }

  async delete(id: string): Promise<number> {
    return await this.userRepo.destroy({ where: { id } });
  }

  private async findOrError(email: string): Promise<User> {
    try {
      const user = await this.userRepo.findOne({ where: { email } });
      if (!user) {
        throw new HttpException('Пользователь не найден', HttpStatus.NOT_FOUND);
      }
    } catch (e) {
      throw new HttpException('Пользователь не найден', HttpStatus.NOT_FOUND);
    }
  }
}
