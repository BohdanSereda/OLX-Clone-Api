import { HttpException, HttpStatus, Injectable, Scope } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { v4 as uuidv4 } from 'uuid';
import { UserDataBaseService } from './user.database.service';

@Injectable({ scope: Scope.REQUEST })
export class UsersService {
    constructor(private readonly userDataBaseService: UserDataBaseService) {}

    async createUser(createUserDto: CreateUserDto) {
        const activationLink = uuidv4();
        const createdUser = await this.userDataBaseService.createUser(
            createUserDto,
            activationLink,
        );

        if (!createdUser) {
            throw new HttpException(
                {
                    status: HttpStatus.CONFLICT,
                    error: 'User with this email already exists',
                },
                HttpStatus.CONFLICT,
            );
        }
        return createdUser;
    }

    async findAllUsers() {
        const existingUsers = await this.userDataBaseService.findAllUsers();

        if (!existingUsers.length) {
            throw new HttpException(
                {
                    status: HttpStatus.NOT_FOUND,
                    error: "Can't find users",
                },
                HttpStatus.NOT_FOUND,
            );
        }
        return existingUsers;
    }
}
