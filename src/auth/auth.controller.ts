import { Controller, Post,Body,UseGuards,Request,Res, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import {JwtAuthGuard} from './jwt-auth.guard'
import { Response } from 'express';
import { request } from 'http';

@Controller('auth')
export class AuthController {

    constructor (private readonly authService: AuthService){}

    @Post('register')
    async register(@Body() registerDto:any){
        return this.authService.register(registerDto);
    }

    // @UseGuards(JwtAuthGuard)
    @Get('verify')
    async verify(@Request() req){
        console.log(req);
        return this.authService.verifyEmail(req.user.userId);
    }
}
