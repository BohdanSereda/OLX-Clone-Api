import { Controller, Get, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import {
    ApiBearerAuth,
    ApiOperation,
    ApiResponse,
    ApiTags,
} from '@nestjs/swagger';
import { User } from './entities/user.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AccountValidationGuard } from '../auth/account-activation.guard';

@ApiTags('Users')
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}
    @ApiOperation({ summary: 'Find all users' })
    @ApiResponse({ status: 201, type: [User] })
    @ApiBearerAuth()
    @UseGuards(AccountValidationGuard)
    @UseGuards(JwtAuthGuard)
    @Get()
    findAll() {
        return this.usersService.findAllUsers();
    }
}
