import { Controller, Post, Get, Query, Body, Param, UseGuards, Request, BadRequestException } from '@nestjs/common';
import { ContactsService } from './contacts.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';


@Controller('contacts')
export class ContactsController {

    constructor(private readonly contactsService: ContactsService) {}
    
    @UseGuards(JwtAuthGuard)
    @Post()
    async addContact(@Request() req, @Body() contactDto: []) {
        console.log(req.user)
        return this.contactsService.addContact(req.user.userId, contactDto);
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    async getContacts(
    @Request() req,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('search') search?: string,
    ) {
    console.log(req.user)    
    if (limit > 50) {
        throw new BadRequestException('Limit cannot exceed 50');
    }
    return this.contactsService.getContacts(req.user.userId, { page, limit, search });
    }


    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async getContactById(@Request() req, @Param('id') contactId: number) {
      return this.contactsService.getContactById(req.user.userId, contactId);
    }

}

