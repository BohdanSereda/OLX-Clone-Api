import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UserDataBaseHelper } from 'src/users/helpers/db.helper';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs'
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class AuthService {

  constructor(private userService: UsersService,
              private userDataBaseHelper: UserDataBaseHelper,
              private jwtService: JwtService){}
    
  async login(userDto: CreateUserDto){
    const user = await this.validateUser(userDto)
    return this.generateToken(user)
  }

  async registration(userDto: CreateUserDto){
    const candidate = await this.userDataBaseHelper.findUserByEmail(userDto.email)
    
    if(candidate){
      throw new HttpException({
        status: HttpStatus.CONFLICT,
        error: 'User with this email already exists'
      }, HttpStatus.CONFLICT)
    }
    const hashPassword = await bcrypt.hash(userDto.password, 5)
    const user = await this.userService.createUser({...userDto, password: hashPassword})
    return this.generateToken(user)
  }

  private generateToken(user: User) {
    const payload = {email: user.email, id: user.id, activated: user.activated}

    return {token: this.jwtService.sign(payload)}
  }

  private async validateUser(userDto: CreateUserDto){
    const user = await this.userDataBaseHelper.findUserByEmail(userDto.email)
    const passwordEquals = await bcrypt.compare(userDto.password, user.password)
    if(user && passwordEquals){
      return user
    }
    throw new HttpException({
      status: HttpStatus.UNAUTHORIZED,
      error: 'incorrect email or password'
    }, HttpStatus.UNAUTHORIZED)
  }

}
