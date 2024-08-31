import { Entity,PrimaryGeneratedColumn,Column,OneToMany } from "typeorm";
import {Contact} from '../contacts/contact.entity';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique: true})
    username: string;

    @Column({unique:true})
    email: string;

    @Column()
    password: string;

    @Column({default: false})
    isVerified: boolean;

    @OneToMany(()=>Contact,(contact)=>contact.user)
    contacts: Contact[];



}