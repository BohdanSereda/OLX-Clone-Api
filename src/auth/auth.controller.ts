import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AccountActivationGuard } from './account-activation.guard';
import { AuthService } from './auth.service';
import { User } from 'src/users/entities/user.entity';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {

  constructor(private readonly authService: AuthService) {}

  @UseGuards(AccountActivationGuard)
  @Post('/login')
  @ApiOperation({summary: "User login"})
  @ApiResponse({status: 201})
  login(@Body() userDto: CreateUserDto): Promise<{token: string}>{
    return this.authService.login(userDto)
  }

  @Post('/registration')
  registration(@Body() userDto: CreateUserDto): Promise<User>{
    return this.authService.registration(userDto)
  }

  @Get('/activate/:activationLink')
  activate(@Param('activationLink') activationLink: string): Promise<string>{
    return this.authService.activation(activationLink)
  }
}
