import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from '../entities/user.entity';
import { encodePassword } from '../utils/cryptography';

@Injectable()
export class UserService {

  constructor(@InjectRepository(User) private repository: Repository<User>){

  }

  create(createUserDto: CreateUserDto) {
    let data = this.repository.create(createUserDto);
    data.password = encodePassword(data.password);
    return this.repository.save(data);
  }

  findAll(take: number = 10, skip: number = 0) {
    return this.repository.findAndCount({
      take,
      skip,
      relations: {
        role:true
      }
    })
  }

  findOne(id: number) {
    return this.repository.findOne({
      where: { id },
      relations: {
        role:true
      }
    })
  }

  findByEmail(email: string) {
    return this.repository.findOne({
      where: { email },
      relations: {
        role:true
      }
    })
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const data = await this.repository.preload({
      id: id,
      ...updateUserDto
    });
    if (!data) {
      throw new NotFoundException(`User ${id} not found!!`);
    }
    return this.repository.save(data);
  }

  async remove(id: number) {
    const data = await this.findOne(id);
    return this.repository.remove(data);
  }
}
