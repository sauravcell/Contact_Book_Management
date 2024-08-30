import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { createUserDto } from './dto/userCreate.dto';

@Controller('/user')
export class UsersController {
    
    constructor(private usersService: UsersService){}
    
    @Get()
    async getUser(){    
        return this.usersService.findAllUser();
    }

    @Post()
    async store(@Body() createUserDto: createUserDto){
        this.usersService.save(createUserDto);
    }
}
