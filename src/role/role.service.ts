import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from '../entities/role.entity';

@Injectable()
export class RoleService {

  constructor(@InjectRepository(Role) private repository: Repository<Role>){

  }


  create(createRoleDto: CreateRoleDto) {
    let data = this.repository.create(createRoleDto);
    return this.repository.save(data);
  }

  createBulk(listCreateRoleDto: CreateRoleDto[]) {
    let data = this.repository.create(listCreateRoleDto);
    return this.repository.save(data);
  }

  findAll(take: number = 10, skip: number = 0) {
    return this.repository.findAndCount({
      take,
      skip,
      relations: {
        user:true
      }
    })
  }

  findOne(id: number) {
    return this.repository.findOne({
      where: { id },
      relations: {
        user:true
      }
    })
  }

  count() {
    return this.repository.count();
  }

  async update(id: number, updateRoleDto: UpdateRoleDto) {
    const data = await this.repository.preload({
      id: id,
      ...updateRoleDto
    });
    if (!data) {
      throw new NotFoundException(`Role ${id} not found!!`);
    }
    return this.repository.save(data);
  }

  async remove(id: number) {
    const data = await this.findOne(id);
    return this.repository.remove(data);
  }
}
