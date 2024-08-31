import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import { MailService } from 'src/mail/mail.service';


@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
        private jwtService: JwtService,
        private mailService: MailService,
    ) { }

    async register(registerDto: any): Promise<any> {
        const { username, email, password } = registerDto;
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log(registerDto);
        const user = this.usersRepository.create({
            username,
            email,
            password: hashedPassword,
        });

        const newUser = await this.usersRepository.save(user);
        const payload = { username: newUser.username, sub: newUser.id };
        console.log(payload);
        const token = this.jwtService.sign(payload);
        console.log(`Token in auth service: ${token}`)
        await this.mailService.sendVerificationEmail(user, token);

        return { message: 'User registered successfully' };
    }

    async login(loginDto: any): Promise<any> {
        const { email, password } = loginDto;
        const user = await this.usersRepository.findOne({ where: { email } });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const payload = { username: user.username, sub: user.id };
        return {
            accessToken: this.jwtService.sign(payload),
        };
    }

    async verifyEmail(userId: number): Promise<any> {
        const user = await this.usersRepository.findOne({ where: { id: userId } });
        if (!user) throw new UnauthorizedException('Invavlid user');

        user.isVerified = true;
        await this.usersRepository.save(user);

        return { message: 'Email verified successfully' };
    }

}
