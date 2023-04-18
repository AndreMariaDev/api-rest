import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AccessTokenStrategy } from './strategies/accesstoken.strategy';
import { RefreshTokenStrategy } from './strategies/refreshtoken.strategy';
import { ConfigService } from '@nestjs/config';
import { UserModule } from '../user/user.module';


@Module({
    controllers: [AuthController],
    imports: [
      JwtModule.register({}),
      UserModule
    ],
    exports: [AuthService],
    providers: [AuthService, AccessTokenStrategy, RefreshTokenStrategy,ConfigService], // Here, make sure you have imported LocalStrategy and JwtStrategy.
  })
  export class AuthModule {}
