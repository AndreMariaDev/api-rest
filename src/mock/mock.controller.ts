import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { response } from 'express';
import { MockService } from './mock.service';

@ApiTags('Mock')
@Controller('Mock')
export class MockController {
  constructor(private readonly mockService: MockService) {

  }

  @Get('StartUp')
  async StartUp(){
    let results = [];
    return await this.mockService.createAllRoles().then((resRoles)=>{
      if(resRoles.status === 201){
        results.push(resRoles);
        this.mockService.UserMock().then((respUser)=>{
          results.push(respUser);
        })
      }
    }).catch((error)=>{
      console.log(error);
    })
  }
}
