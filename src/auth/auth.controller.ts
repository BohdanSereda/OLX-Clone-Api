import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AccountActivationGuard } from './account-activation.guard';
import { AuthService } from './auth.service';


@ApiTags('Authentication')
@Controller('auth')
export class AuthController {

  constructor(private readonly authService: AuthService) {}

  @UseGuards(AccountActivationGuard)
  @Post('/login')
  login(@Body() userDto: CreateUserDto){
    return this.authService.login(userDto)
  }

  @Post('/registration')
  registration(@Body() userDto: CreateUserDto){
    return this.authService.registration(userDto)
  }

  @Get('/activate/:activationLink')
  activate(@Param('activationLink') activationLink: string){
    return this.authService.activation(activationLink)
  }
}
