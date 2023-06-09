import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UsePipes,
} from '@nestjs/common';

import { User } from '@/user/user.model';
import { UserService } from '@/user/user.service';
import { CreateUserDto } from '@/user/dto/create-user.dto';
import { ValidationPipe } from '@/pipes/validation.pipe';
import { BanUserDto } from '@/user/dto/ban-user.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @ApiOperation({ summary: 'Создание польователя' })
  @ApiResponse({ status: 200, type: User })
  @UsePipes(ValidationPipe)
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
  @Get('/:id')
  getById(@Param('id') id: string) {
    return this.userService.getById(id);
  }

  @ApiOperation({ summary: 'Редактирование польователя' })
  @ApiResponse({ status: 200, type: User })
  @UsePipes(ValidationPipe)
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

  @ApiOperation({ summary: 'Отправить в бан' })
  @ApiResponse({ status: 200 })
  @UsePipes(ValidationPipe)
  @Post('/ban')
  ban(@Body() dto: BanUserDto) {
    return this.userService.ban(dto);
  }
}
