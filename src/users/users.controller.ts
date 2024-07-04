import { Controller, Get, Post, Body, UseGuards, UnauthorizedException, Headers} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserRequest } from './dto/create-user.request';
import { JwtService } from '@nestjs/jwt';
import { LoginRequest } from './dto/login.request';
import { RefreshRequest } from './dto/refresh.request';
import { AuthGuard } from '@nestjs/passport';

@Controller('')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) {}

  @Post("signup")
  register(@Body() CreateUserRequest: CreateUserRequest) {
    return this.usersService.create(CreateUserRequest);
  }

  @Get('mypage')
  @UseGuards(AuthGuard('jwt'))
  async findOne(@Headers('authorization') authHeader: string) {
    if (!authHeader) {
      throw new UnauthorizedException('Authorization header not found');
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      throw new UnauthorizedException('Token not found');
    }

    try {
      const decoded = this.jwtService.verify(token);
      const userId = decoded.id;

      return await this.usersService.findOne(userId);
    } catch (err) {
      throw new UnauthorizedException('Invalid token');
    }
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
