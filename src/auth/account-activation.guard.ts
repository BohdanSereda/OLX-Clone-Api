import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { IGetUserAuthInfoRequest } from "src/posts/dto/custom-request.dto";
import { User } from "src/users/entities/user.entity";
import { UserDataBaseService } from "src/users/user.database.service";


@Injectable()
export class AccountActivationGuard implements CanActivate {
    constructor(private userDataBaseService: UserDataBaseService,
                private jwtService: JwtService){}

    async canActivate(context: ExecutionContext): Promise<boolean>  {
        const request: IGetUserAuthInfoRequest = context.switchToHttp().getRequest()
        try {
            const authHeader = request.headers.authorization
            const token = authHeader.split(' ')[1]
            const user =  this.jwtService.verify(token)
            
            if(!user.activated){
                throw new HttpException({
                    status: HttpStatus.FORBIDDEN,
                    error: 'account is not activated'
                }, HttpStatus.FORBIDDEN)
            }

            return true
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.FORBIDDEN,
                error: 'account is not activated'
            }, HttpStatus.FORBIDDEN)
        }
    }
}