import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class JwtAuthGuard implements CanActivate {
    constructor(private jwtService: JwtService){}

    canActivate(context: ExecutionContext): boolean  {
        const request = context.switchToHttp().getRequest()
        try {
            const authHeader = request.headers.authorization
            const bearer = authHeader.split(' ')[0]
            const token = authHeader.split(' ')[1]

            if (bearer !== 'Bearer' || !token) {
                throw new HttpException({
                    status: HttpStatus.UNAUTHORIZED,
                    error: 'user unauthorized'
                }, HttpStatus.UNAUTHORIZED)
            }

            const user =  this.jwtService.verify(token)
            request.user =  user
            return true
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.UNAUTHORIZED,
                error: 'user unauthorized'
            }, HttpStatus.UNAUTHORIZED)
        }
    }
}