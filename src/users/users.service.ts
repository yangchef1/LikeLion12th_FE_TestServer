import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserRequest } from './dto/create-user.request';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { FindOneOptions, Repository } from 'typeorm';
import { CreateUserResponse } from './dto/create-user.response';
import { GetUserResponse } from './dto/get-user.response';
import { LoginRequest } from './dto/login.request';
import { AccessPayload } from './jwt/access.payload.interface';
import { RefreshPayload } from './jwt/refresh.payload.interface';
import { JwtService } from '@nestjs/jwt';
import { TokenResponse } from './dto/token.response';  
import * as bcrypt from 'bcrypt';
import { RefreshRequest } from './dto/refresh.request';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService
  ){}

  async create(CreateUserRequest: CreateUserRequest) {
    let user = CreateUserRequest;
    user.pw = await bcrypt.hash(
      user.pw, 10,
    );
    await this.usersRepository.save(CreateUserRequest);
    return new CreateUserResponse(200, "회원가입 성공");
  }

  async findOne(id: string) {
    let user = await this.usersRepository.findOne({where: { id }});
    return new GetUserResponse(user.name, user.age)
  }

  async findByFields(options: FindOneOptions<LoginRequest>): Promise<User | undefined> {
    return await this.usersRepository.findOne(options);
  }

  async validateUser(LoginRequest: LoginRequest): Promise<{accessToken: string} | undefined> {
    let userFind = await this.findByFields({
      where: { id: LoginRequest.id }
    });
    const validatepw = await bcrypt.compare(LoginRequest.pw, userFind.pw);
    if(!userFind || !validatepw) {
        throw new BadRequestException("회원 정보가 없습니다.");
    }

    const accessPayload: AccessPayload = {id: userFind.id, name: userFind.name, age: userFind.age };
    const refreshPayload: RefreshPayload = {id: userFind.id };

    return new TokenResponse(this.jwtService.sign(accessPayload), this.jwtService.sign(refreshPayload));
  }

  async reissue(RefreshRequest: RefreshRequest) {
    let decodedToken;
    try {
      decodedToken = this.jwtService.verify(RefreshRequest.refreshToken);
    } catch (e) {
      throw new UnauthorizedException('유효하지 않은 refresh token입니다.');
    }

    const userFind = await this.findByFields({
      where: { id: decodedToken.id },
    });

    const accessPayload: AccessPayload = {id: userFind.id, name: userFind.name, age: userFind.age };
    const refreshPayload: RefreshPayload = {id: userFind.id };

    return new TokenResponse(this.jwtService.sign(accessPayload, { expiresIn: '1h' }), this.jwtService.sign(refreshPayload, { expiresIn: '7d' }));
  }

  async AccessTokenValidateUser(payload: AccessPayload) {
    return await this.findByFields({
        where: { id: payload.id }
    });
  }
}