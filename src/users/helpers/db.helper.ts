import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateUserDto } from "../dto/create-user.dto";
import { User } from "../entities/user.entity";

@Injectable()
export class UserDataBaseHelper{

    constructor(@InjectRepository(User) private readonly userRepository: Repository<User>){}

    async createUser(createUserDto: CreateUserDto): Promise<false | User>{
        const existingUser = await this.findUserByEmail(createUserDto.email)
        if (existingUser) {
            return false
        }
        return await this.userRepository.save(createUserDto)
    }

    async findAllUsers(){
        return await this.userRepository.find()
    }

    async findUserByEmail(email: string){
        return await this.userRepository.findOneBy({email})
    }
}