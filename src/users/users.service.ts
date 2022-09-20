import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UserDataBaseHelper } from './helpers/db.helper';

@Injectable()
export class UsersService {
  constructor(private readonly userDataBaseHelper: UserDataBaseHelper){}

  async createUser(createUserDto: CreateUserDto) {
    const createdUser = await this.userDataBaseHelper.createUser(createUserDto)
    if (!createdUser) {
      throw new HttpException({
        status: HttpStatus.CONFLICT,
        error: 'User with this email already exists'
      }, HttpStatus.CONFLICT)
    }
    return createdUser
  }

   async findAllUsers() {
    const existingUsers = await this.userDataBaseHelper.findAllUsers()
    if(!existingUsers.length){
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error: 'Can\'t find users'
      }, HttpStatus.NOT_FOUND)
    }
    return existingUsers
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async findUserByEmail(email: string){
    const user = ''
  }
}
