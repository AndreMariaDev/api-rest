import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { RoleModule } from './role/role.module';
import { typeOrmConfig } from './config/database.config';
import { mailerConfig } from './config/mailer.config';
import { MockModule } from './mock/mock.module';
import { ReportModule } from './report/report.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    MailerModule.forRoot(mailerConfig),
    AuthModule,
    UserModule, 
    ReportModule,
    RoleModule, MockModule, ReportModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
