import { IsEmail, IsString, isNotEmpty } from "class-validator"

export class AuthDTO {
    @IsEmail()
    email: string

    @IsString()
    password: string
}