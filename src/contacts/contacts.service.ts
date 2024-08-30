import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Contact } from './contact.entity';
import { User } from '../auth/user.entity';

@Injectable()
export class ContactsService {
    constructor(
        @InjectRepository(Contact)
        private contactsRepository: Repository<Contact>,
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) { }

    async addContact(userId: number, contactDto: []): Promise<Contact> {
        const user = await this.usersRepository.findOne({ where: { id: userId } });

        if (!user) {
            throw new NotFoundException('User not found');
        }

        const contact = this.contactsRepository.create({
            ...contactDto,
            user,
        });

        // return this.contactsRepository.save(contact);
        return this.contactsRepository.save(contact)
    }

    async getContacts(
        userId: number,
        options: { page: number; limit: number; search?: string },
    ): Promise<{ data: Contact[]; total: number; page: number; limit: number }> {
        const { page, limit, search } = options;
        const query = this.contactsRepository
            .createQueryBuilder('contact')
            .where('contact.userId = :userId', { userId });

        if (search) {
            query.andWhere('contact.name ILIKE :search OR contact.phoneNumber ILIKE :search', {
                search: `%${search}%`,
            });
        }

        const [data, total] = await query
            .skip((page - 1) * limit)
            .take(limit)
            .getManyAndCount();

        return {
            data,
            total,
            page,
            limit,
        };
    }

    async getContactById(userId: number, contactId: number): Promise<Contact> {
        const contact = await this.contactsRepository.findOne({
            where: { id: contactId, user: { id: userId } },
        });

        if (!contact) {
            throw new NotFoundException('Contact not found');
        }

        return contact;
    }
}
