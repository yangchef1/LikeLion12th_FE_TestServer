import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ExtractJwt, Strategy, VerifiedCallback } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { AccessPayload } from "./access.payload.interface";
import { UsersService } from "../users.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(private usersService: UsersService){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: true,
            secretOrKey: '',
        })
    }

    async validate(payload: AccessPayload, done: VerifiedCallback): Promise<any> {
        const user = await this.usersService.AccessTokenValidateUser(payload);
        if (!user) {
            return done(new UnauthorizedException({ message: 'JWT가 유효하지 않습니다.' }), false);
        }

        return done(null, user);
    }
}