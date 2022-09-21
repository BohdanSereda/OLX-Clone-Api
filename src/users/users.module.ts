import { forwardRef, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { AuthModule } from 'src/auth/auth.module';
import { UserDataBaseService } from './user.database.service';

@Module({
  imports:[
    TypeOrmModule.forFeature([User]),
    forwardRef(()=>AuthModule)
  ],
  controllers: [UsersController],
  providers: [UsersService, UserDataBaseService],
  exports: [UsersService, UserDataBaseService]
})
export class UsersModule {}
