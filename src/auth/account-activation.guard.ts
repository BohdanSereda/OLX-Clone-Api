import { CanActivate, ExecutionContext, HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { REQUEST } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { IGetUserAuthInfoRequest } from "src/posts/dto/custom-request.dto";
import { User } from "src/users/entities/user.entity";
import { UserDataBaseService } from "src/users/user.database.service";
import * as bcrypt from 'bcryptjs'

@Injectable()
export class AccountValidationGuard implements CanActivate {
    constructor(
        @Inject(REQUEST) private readonly request: IGetUserAuthInfoRequest,
        private userDataBaseService: UserDataBaseService,
        private jwtService: JwtService) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        try {
            const request = this.request
            let user: User
            let passwordEquals: Boolean = true
            if (request.body.email) {
                user = await this.userDataBaseService.findUserByEmail(request.body.email)
                if (!user) {
                    throw new HttpException({
                        status: HttpStatus.UNAUTHORIZED,
                        error: 'incorrect email or password'
                    }, HttpStatus.UNAUTHORIZED)
                }
                passwordEquals = await bcrypt.compare(request.body.password, user.password)
                if (!passwordEquals) {
                    throw new HttpException({
                        status: HttpStatus.UNAUTHORIZED,
                        error: 'incorrect email or password'
                    }, HttpStatus.UNAUTHORIZED)
                }
            } else {
                const authHeader = request.headers.authorization
                const token = authHeader.split(' ')[1]
                user = this.jwtService.verify(token)
            }

            if (!user.activated) {
                throw new HttpException({
                    status: HttpStatus.FORBIDDEN,
                    error: 'account is not activated'
                }, HttpStatus.FORBIDDEN)
            }

            return true
        } catch (error) {
            throw new HttpException({
                status: error.status,
                error: error.response.error
            }, error.status)
        }
    }
}