import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsModule } from './posts/posts.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env'
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.MYSQL_HOST,
      port: +process.env.MYSQL_PORT,
      username: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DB,
      entities: ["dist/**/*.entity.js"],
      synchronize: true,
      autoLoadEntities: true
    }),
    UsersModule, 
    AuthModule, PostsModule]
})
export class AppModule {}
