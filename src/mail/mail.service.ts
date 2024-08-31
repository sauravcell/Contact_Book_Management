/*

import { Injectable } from '@nestjs/common';
import * as FormData from 'form-data'
import Mailgun from 'mailgun.js'
import { IMailgunClient } from 'mailgun.js/Interfaces';

@Injectable()
export class MailService {
  private mg;

  constructor() {
    const mailgun = new Mailgun(FormData);
    this.mg = mailgun.client({
      username: 'saurav',
      key: 'a985530689b48a52b8991d443af98ac0'
    })

  }

  async sendVerificationEmail(user: any) {
    //   const data = {
    //     from: 'Your App <mailgun@sandbox971fdbe7f9374514a85cfb1f72a682be.mailgun.org>',
    //     to: user.email,
    //     subject: 'Email Verification',
    //     text: `Please verify your email by clicking on this link: http://localhost:3000/auth/verify?token=your-verification-token`,
    //   };

    //   await this.mailgun.messages().send(data);
    //  }
    console.log({"user":user});
    try {
      const response = await this.mg.messages.create('sandbox-123.mailgun.org', {
        from: "sandbox971fdbe7f9374514a85cfb1f72a682be.mailgun.org",
        to: user.email,
        subject: "Email Verification",
        text: `Please verify your email by clicking on this link: http://localhost:3000/auth/verify?token=your-verification-token`,
        html: "<h1>Verifying email!</h1>"
      });
      console.log(response);
      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
*/


//Below part is the latest code for this file

import { Injectable } from '@nestjs/common';
// import { ConfigService } from '@nestjs/config';
import Mailgun from 'mailgun.js';
import FormData from 'form-data';

@Injectable()
export class MailService {
  // constructor(private readonly config: ConfigService) {}

  // mailgun secret key
  //private MAILGUN_KEY = this.config.get<string>('MAILGUN_KEY');
  //private MAILGUN_DOMAIN = this.config.get<string>('MAILGUN_DOMAIN');
  // private jwtService : JwtService;
  
  private MAILGUN_KEY = 'f37053417cda2396f7971177e24e6c1f-777a617d-8be66457'//process.env.MAILGUN_API_KEY
  private MAILGUN_DOMAIN = 'sandbox971fdbe7f9374514a85cfb1f72a682be.mailgun.org'

  private client = new Mailgun(FormData).client({
    username: 'api',
    key: this.MAILGUN_KEY,
  });


  /**
   * Send via API
   *
   * @param data
   */

  async sendVerificationEmail(user, token ) {
    // const token = this.generateVerificationToken(user)
    const data= {
      from: 'sauravdrive02@gmail.com',
      to: user.email,     //receciepent needs to be registered to mailgun first in the sender account
      subject: 'Email Verification',
      text: `Please verify your email by clicking on this link: http://localhost:3000/api/auth/verify?token=${token}`,
    };
    console.log({'Inside mail service':data})
    this.client.messages
      .create(this.MAILGUN_DOMAIN, data)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.error(err);
      });
  }
}