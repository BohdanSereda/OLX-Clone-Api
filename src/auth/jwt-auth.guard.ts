import {
    CanActivate,
    ExecutionContext,
    HttpException,
    HttpStatus,
    Inject,
    Injectable,
} from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { IGetUserAuthInfoRequest } from 'src/posts/dto/custom-request.dto';

@Injectable()
export class JwtAuthGuard implements CanActivate {
    constructor(
        @Inject(REQUEST) private readonly request: IGetUserAuthInfoRequest,
        private jwtService: JwtService,
    ) {}

    canActivate(context: ExecutionContext): boolean {
        const request = this.request;
        try {
            const authHeader = request.headers.authorization;
            const bearer = authHeader.split(' ')[0];
            const token = authHeader.split(' ')[1];

            if (bearer !== 'Bearer' || !token) {
                throw new HttpException(
                    {
                        status: HttpStatus.UNAUTHORIZED,
                        error: 'user unauthorized',
                    },
                    HttpStatus.UNAUTHORIZED,
                );
            }

            const user = this.jwtService.verify(token);
            request.user = user;
            return true;
        } catch (error) {
            throw new HttpException(
                {
                    status: HttpStatus.UNAUTHORIZED,
                    error: 'user unauthorized',
                },
                HttpStatus.UNAUTHORIZED,
            );
        }
    }
}
