import { Body, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { createUserDto } from './dto/userCreate.dto';
import { userFetchdto } from './dto/userFetch.dto';
@Injectable()
export class UsersService {

    constructor(
        @InjectRepository (User)
        private usersRepository: Repository<User>,
    ) {}

    async findAllUser():Promise<User[]> {
        try {
            console.log('service called');
            return await this.usersRepository.find();
            
            
        } catch (error) {
            console.log(error);
            return(error);   
        }
    }

    save(createUserDto: createUserDto){
        console.log('saving data');
        return this.usersRepository.save(createUserDto);
    }
}
