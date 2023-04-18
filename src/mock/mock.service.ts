import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { CreateRoleDto } from '../role/dto/create-role.dto';
import { RoleService } from '../role/role.service';
import { UserService } from '../user/user.service';
import { ListRoles, UserMock } from './data/mock.data';
import { User } from '../entities/user.entity';

@Injectable()
export class MockService {
    constructor(
        private readonly roleService: RoleService,
        private readonly userService: UserService) {}

    async createAllRoles(){
        let status: number = 201;
        let message: string = "";
        
        let isRoles = await this.roleService.count();
        if(isRoles === 0){
            await this.roleService.createBulk(ListRoles as CreateRoleDto[])
            .catch(error=>{
                status = 500;
                message = `${message} role error: ${error}`;
            });

            return{
                listUsers: ListRoles,
                status: status,
                message: message === "" ? "process carried out successfully" : message
            };
        }
    }

    async UserMock () {
        let status: number = 201;
        let message: string = "";

        await this.userService.create(UserMock as CreateUserDto)                    
        .then((resp: User)=>{
            UserMock.password = resp.password;
        })
        .catch(error=>{
            status = 500;
            message = `${message} user error: ${error}`;
        });

        return{
            listUsers: UserMock,
            status: status,
            message: message === "" ? "process carried out successfully" : message
        };
    }
}
