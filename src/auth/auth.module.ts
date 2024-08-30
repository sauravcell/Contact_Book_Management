import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { MailModule } from '../mail/mail.module';
import { MailService } from 'src/mail/mail.service';


@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'secret', // Replace with your secret key
      signOptions: { expiresIn: '5m' },
    }),
    MailModule,
  ],
  providers: [AuthService ],
  controllers: [AuthController],
})
export class AuthModule {}
