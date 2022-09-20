import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateUserDto } from "../dto/create-user.dto";
import { User } from "../entities/user.entity";

@Injectable()
export class UserDataBaseService{

    constructor(@InjectRepository(User) private readonly userRepository: Repository<User>){}

    async createUser(createUserDto: CreateUserDto, activationLink: string): Promise<false | User>{
        const existingUser = await this.findUserByEmail(createUserDto.email)
        if (existingUser) {
            return false
        }
        const user = {...createUserDto, activationLink}
        return await this.userRepository.save(user)
    }

    async findAllUsers(){
        return await this.userRepository.find()
    }

    async findUserByEmail(email: string){
        return await this.userRepository.findOneBy({email})
    }

    async findUserByActivationLink(activationLink: string){
        return await this.userRepository.findOneBy({activationLink})
    }

    async updateUser(user: User) {
        return await this.userRepository.save(user)
    }
}