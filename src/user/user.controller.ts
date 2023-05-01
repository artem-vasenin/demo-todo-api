import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';

import { User } from '@/user/user.model';
import { UserService } from '@/user/user.service';
import { CreateUserDto } from '@/user/dto/create-user.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @ApiOperation({ summary: 'Создание польователя' })
  @ApiResponse({ status: 200, type: User })
  @Post()
  create(@Body() dto: CreateUserDto) {
    return this.userService.create(dto);
  }

  @ApiOperation({ summary: 'Получение списка польователей' })
  @ApiResponse({ status: 200, type: [User] })
  @Get()
  getList() {
    return this.userService.getList();
  }

  @ApiOperation({ summary: 'Получение польователя по логину' })
  @ApiResponse({ status: 200, type: [User] })
  @Get('/:login')
  getByLogin(@Param('email') email: string) {
    return this.userService.getByLogin(email);
  }

  @ApiOperation({ summary: 'Редактирование польователя' })
  @ApiResponse({ status: 200, type: User })
  @Put()
  update(@Body() dto: CreateUserDto) {
    return this.userService.update(dto);
  }

  @ApiOperation({ summary: 'Удаление польователя' })
  @ApiResponse({ status: 200, type: User })
  @Delete('/:login')
  delete(@Param('login') id: string) {
    return this.userService.delete(id);
  }
}
