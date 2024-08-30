import { IsNumber, IsString } from "class-validator";

export class createUserDto{
    @IsString()
    name: string;
    @IsString()
    email: string;
    @IsNumber()
    phone: number;
    @IsString()
    address: string;
}