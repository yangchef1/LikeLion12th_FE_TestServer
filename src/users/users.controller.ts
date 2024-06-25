import { Controller, Get, Post, Body, UseGuards, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserRequest } from './dto/create-user.request';
import { User } from './entities/user.entity';
import { LoginRequest } from './dto/login.request';
import { RefreshRequest } from './dto/refresh.request';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@Controller('')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post("signup")
  register(@Body() CreateUserRequest: CreateUserRequest) {
    return this.usersService.create(CreateUserRequest);
  }

  @Get('mypage')
  @UseGuards(AuthGuard('jwt'))
  findOne(@Body() User: User) {
    return this.usersService.findOne(User.id);
  }

  @Post("login")
  login(@Body() LoginRequest: LoginRequest) {
    return this.usersService.validateUser(LoginRequest);
  }

  @Post("refresh")
  @UseGuards(AuthGuard('jwt'))
  reissue(@Body() RefreshRequest: RefreshRequest) {
    return this.usersService.reissue(RefreshRequest);
  }
}
