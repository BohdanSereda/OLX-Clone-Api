import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { User } from "src/users/entities/user.entity";
import { UserDataBaseService } from "src/users/user.database.service";


@Injectable()
export class AccountActivationGuard implements CanActivate {
    constructor(private userDataBaseService: UserDataBaseService,){}

    async canActivate(context: ExecutionContext): Promise<boolean>  {
        const request = context.switchToHttp().getRequest()
        try {
            const user: User = await this.userDataBaseService.findUserByEmail(request.body.email)
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