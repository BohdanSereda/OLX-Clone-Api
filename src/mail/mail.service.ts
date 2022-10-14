import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class MailService {
    constructor(private readonly mailerService: MailerService) { }
    async sendActivationEmail(user: User): Promise<void> {
        const text = `Hi user please verify your email via link\n${process.env.API_URL}/auth/activate/${user.activationLink}`;
        const from = 'scraper.api.study@gmail.com';
        const subject = 'Confirmation';
        await this.sendEmail(from, subject, user.email, text);
    }
    async sendEmail(
        from: string,
        subject: string,
        to: string,
        text: string,
    ): Promise<void> {
        await this.mailerService.sendMail({ to, from, subject, text });
    }
}
