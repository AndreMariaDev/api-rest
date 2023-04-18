import { Module } from '@nestjs/common';
import { MockService } from './mock.service';
import { MockController } from './mock.controller';
import { UserModule } from '../user/user.module';
import { RoleModule } from '../role/role.module';

@Module({
  imports:[
    UserModule,
    RoleModule
  ],
  controllers: [MockController],
  providers: [MockService]
})
export class MockModule {}
