import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AccountValidationGuard } from './account-activation.guard';
import { AuthService } from './auth.service';
import { User } from 'src/users/entities/user.entity';
import { ActivationMessage, Token } from './dto/custom-types.dto';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {

  constructor(private readonly authService: AuthService) {}

  @UseGuards(AccountValidationGuard)
  @ApiOperation({summary: "User login"})
  @ApiResponse({status: 201, description: "return bearer token for authentication", type: Token})
  @Post('/login')
  login(@Body() userDto: CreateUserDto): Promise<Token>{
    return this.authService.login(userDto)
  }


  @ApiOperation({summary: "User registration"})
  @ApiResponse({status: 201, description: "register new user", type: User})
  @Post('/registration')
  registration(@Body() userDto: CreateUserDto): Promise<User>{
    return this.authService.registration(userDto)
  }

  @ApiOperation({summary: "User account activation"})
  @ApiResponse({status: 201, description: "activate user's account", type: ActivationMessage})
  @Get('/activate/:activationLink')
  activate(@Param('activationLink') activationLink: string): Promise<ActivationMessage>{
    return this.authService.activation(activationLink)
  }
}
