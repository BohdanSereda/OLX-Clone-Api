import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
    secret: process.env.PRIVATE_KEY || 'SECRET',
    signOptions : {
      expiresIn: '24h'
    }
  })],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
