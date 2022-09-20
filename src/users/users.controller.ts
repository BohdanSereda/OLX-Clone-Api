import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './entities/user.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';


@ApiTags('Users')
@Controller('users')
export class UsersController {
  
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({summary: "User creation"})
  @ApiResponse({status: 201, type: User})
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  @ApiOperation({summary: "Find all users"})
  @ApiResponse({status: 201, type: [User]})
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {    
    return this.usersService.findAllUsers();
  }
}
