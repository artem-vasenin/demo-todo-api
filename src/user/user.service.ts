import * as bcrypt from 'bcryptjs';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { User } from './user.model';
import { CreateUserDto } from '@/user/dto/create-user.dto';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class UserService {
  constructor(@InjectModel(User) private userRepo: typeof User) {}

  async create(dto: CreateUserDto): Promise<User> {
    try {
      const user = await this.userRepo.findOne({ where: { email: dto.email } });
      if (user) {
        throw new HttpException('Email уже занят', HttpStatus.BAD_REQUEST);
      }
      const password = await bcrypt.hash(dto.password, 5);
      return await this.userRepo.create({ ...dto, password });
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  async getList(): Promise<User[]> {
    return await this.userRepo.findAll({
      attributes: { exclude: ['password'] },
    });
  }

  async getById(id: string): Promise<User> {
    return await this.userRepo.findByPk(id, {
      attributes: { exclude: ['password'] },
    });
  }

  async update(dto: CreateUserDto): Promise<User> {
    try {
      const user = await this.userRepo.findOne({ where: { email: dto.email } });
      if (!user) {
        throw new HttpException('Пользователь не найден', HttpStatus.NOT_FOUND);
      }
      const hashPasswd = await bcrypt.hash(dto.password, 5);
      user.name = dto.name;
      user.password = hashPasswd;
      await user.save();
      return user;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.NOT_FOUND);
    }
  }

  async delete(id: string): Promise<number> {
    return await this.userRepo.destroy({ where: { id } });
  }
}
