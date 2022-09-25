import { Request } from 'express';
import { User } from '../../users/entities/user.entity';
export interface IGetUserAuthInfoRequest extends Request {
    user: User;
}
