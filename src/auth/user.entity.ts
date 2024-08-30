import { Entity,PrimaryGeneratedColumn,Column,OneToMany } from "typeorm";
import {Contact} from '../contacts/contact.entity';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique: false})
    username: string;

    @Column({unique:false})
    email: string;

    @Column()
    password: string;

    @Column({default: false})
    isVerified: boolean;

    @OneToMany(()=>Contact,(contact)=>contact.user)
    contacts: Contact[];



}