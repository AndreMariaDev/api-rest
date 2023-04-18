import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { AccessTokenGuard } from '../common/accesstoken.guard';
import { RefreshTokenGuard } from '../common/refreshtoken.guard';

@ApiTags('Auth')
@Controller('Auth')
export class  AuthController {
    constructor(
        private authService: AuthService
    ){

    }

    @Post('SignIn')
    signIn(@Body() data: AuthDto) {
      return this.authService.getSignIn(data);
    }

    @UseGuards(AccessTokenGuard)
    @Get('LogOut')
    logout(@Req() req: Request) {
      this.authService.logout(req.user['id']);
    }

    @UseGuards(RefreshTokenGuard)
    @Get('RefreshToken')
    refreshTokens(@Req() req: Request) {
      const userId = req.user['id'];
      const refreshToken = req.user['refreshToken'];
      return this.authService.getRefreshTokens(userId, refreshToken);
    }
}