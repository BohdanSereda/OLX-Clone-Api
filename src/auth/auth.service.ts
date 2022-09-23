import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs'
import { User } from 'src/users/entities/user.entity';
import { MailService } from 'src/mail/mail.service';
import { UserDataBaseService } from 'src/users/user.database.service';
import {  ActivationMessage, Token } from './dto/custom-types.dto';

@Injectable()
export class AuthService {

  constructor(private userService: UsersService,
              private userDataBaseService: UserDataBaseService,
              private mailService: MailService,
              private jwtService: JwtService){}
    
  async login(userDto: CreateUserDto): Promise<Token>{
    const user = await this.userDataBaseService.findUserByEmail(userDto.email)
    if (!user) {
      throw new HttpException({
          status: HttpStatus.UNAUTHORIZED,
          error: 'incorrect email or password'
      }, HttpStatus.UNAUTHORIZED)
  }
    return this.generateToken(user)
  }

  async registration(userDto: CreateUserDto): Promise<User>{
    const candidate = await this.userDataBaseService.findUserByEmail(userDto.email)
    if(candidate){
      throw new HttpException({
        status: HttpStatus.CONFLICT,
        error: 'User with this email already exists'
      }, HttpStatus.CONFLICT)
    }

    const hashPassword = await bcrypt.hash(userDto.password, 5)
    const user = await this.userService.createUser({...userDto, password: hashPassword})
    await this.mailService.sendActivationEmail(user)
    return user
  }

  async activation(activationLink: string): Promise<ActivationMessage>{
    const user = await this.userDataBaseService.findUserByActivationLink(activationLink)
    if(!user){
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error: 'User not found'
      }, HttpStatus.NOT_FOUND)
    }
    
    user.activated = true
    await this.userDataBaseService.updateUser(user)
    return {activationMessage: "It's you! Your email address has been successfully verified."}
  }

  private generateToken(user: User): Token {
    const payload = {email: user.email, id: user.id, activated: user.activated}
    return {token: this.jwtService.sign(payload)}
  }

}
