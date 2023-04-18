import { Injectable, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class RefreshTokenGuard extends AuthGuard('jwt-refresh'){
    canActivate(context: ExecutionContext){
        let result = super.canActivate(context);
        return result;
    }

    handleRequest(error, user, info){
        if(error || !user){
            throw error || new UnauthorizedException();
        }

        return user;
    }
}