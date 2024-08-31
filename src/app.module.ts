import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { User } from './users/user.entity'; this import is meant for earlier project
import { ContactsModule } from './contacts/contacts.module';
import { MailService } from './mail/mail.service';
import { MailModule } from './mail/mail.module';
import { Contact } from './contacts/contact.entity';
import { User } from './auth/user.entity';
import { stringify } from 'querystring';
import { parseEnv } from 'util';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432, 
      username: 'postgres',//process.env.DB_USERNAME,
      password: 'saurav',//process.env.DB_PASSWORD,
      database: 'nestjs',
      entities: [User,Contact,],
      synchronize: true,
    }),
    AuthModule, UsersModule, ContactsModule, MailModule, 
  ],
  controllers: [AppController],
  providers: [AppService, MailService],
})
export class AppModule {}
