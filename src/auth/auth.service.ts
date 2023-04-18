import { Injectable,BadRequestException, ForbiddenException } from '@nestjs/common';
const argon2 = require('argon2');
import { UserService } from '../user/user.service';
import { AuthDto } from './dto/auth.dto';
import { isValideHash } from '../utils/cryptography'
import { User } from '../entities/user.entity';
import { Login } from './entities/login';
import { JwtService } from '@nestjs/jwt';
import { UpdateUserDto } from '../user/dto/update-user.dto';
import { Auth, Token } from './entities/auth';
require('dotenv-flow').config();

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        private userService: UserService,
    ) {}

    async getSignIn(auth: AuthDto){
        const user =  await this.userService.findByEmail(auth.email);

        if(user && user.isActive){
            if(isValideHash(auth.password,user.password)){
                return await this.getSignUser(user);
            } else{
                return {
                    token: null,
                    status: 401,
                    message: 'Unauthorized'
                } as Auth
            }
        } else{
            return {
                token: null,
                status: 401,
                message: 'Non-existent or disabled User'
            } as Auth
        }
    }

    async getSignUser(user:User){
        const loginToken: Login = {
            name: user?.name,
            userName: user?.email,
            idUser:user.id,
            role: user?.role
        };
        const tokens = await this.getTokens(loginToken);
        const _refreshToken = await argon2.hash(tokens.refreshToken);
        await this.updateRefreshToken(user.id,{ refreshToken: _refreshToken });
        return {
            token: tokens as Token,
            status: 200,
            message: 'login sucess',
        } as Auth;
    }

    async getRefreshTokens(userId: number, refreshToken: string) {
        const user = await this.userService.findOne(userId);
        if (!user || !user.refreshToken)
          throw new ForbiddenException('Access Denied');

        try {
            const refreshTokenMatches = await argon2.verify(
                user.refreshToken,
                refreshToken,
              ).catch((error)=>{
                throw new ForbiddenException(error.message);
              });

              if (!refreshTokenMatches) throw new ForbiddenException('Access Denied');
      
              const loginToken: Login = {
                  name: user?.name,
                  userName: user?.email,
                  idUser:user.id,
                  role: user?.role
              };
      
              const tokens = await this.getTokens(loginToken);
              await this.updateRefreshToken(user.id, { refreshToken: tokens.refreshToken });
              return {
                  token :tokens,
                  status:200,
                  message:'login sucess',
              } as Auth;
        } catch (error) {
            if(error.name ==='ForbiddenException'){
                throw new ForbiddenException('Access Denied');
            }
            else{
                throw new ForbiddenException(error.message);
            } 
        }
    }

    async getTokens(login:Login) {
        const [accessToken, refreshToken] = await Promise.all([
        this.jwtService.signAsync(
            login,
            {
                secret: process.env.JWT_ACCESS_SECRET,
                expiresIn: '5m',
            },
        ),
        this.jwtService.signAsync(
            login,
            {
                secret: process.env.JWT_REFRESH_SECRET,
                expiresIn: '1d',
            },
        ),
        ]);

        return {
            accessToken,
            refreshToken,
        };
    }

    async updateRefreshToken(userId: number,user:UpdateUserDto) {
        await this.userService.update(userId, user);
    }

    async logout(userId: number) {
        return this.userService.update(userId, { refreshToken: null });
    }
}