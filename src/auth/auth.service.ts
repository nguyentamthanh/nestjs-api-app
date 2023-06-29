import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from '../prisma/prisma.service';
import { AuthDTO } from "./dto";
import * as argon from "argon2"
@Injectable({})
export class AuthService {
    constructor(private prismaService: PrismaService) { }
    async register(authDTO: AuthDTO) {
        const hashPassword = await argon.hash(authDTO.password)
        // inser data to database


        try {
            const user = this.prismaService.user.create({
                data: {
                    email: authDTO.email,
                    hashedPassWord: hashPassword,
                    firstName: "",
                    lastName: ""
                },
                // only select id email createdAt
                select: {
                    id: true,
                    email: true,
                    createdAt: true
                }
                // you shold
            })
            return user
        } catch (error) {
            if (error.code == 'P2002') {
                //throw new ForbiddenException(error.message)
                //for simple
                throw new ForbiddenException(
                    'User with this email already exists'
                )
            }
        }
    }

    async login(authDTO: AuthDTO) {
        const user = await this.prismaService
            .user.findUnique({
                where: {
                    email: authDTO.email
                }
            })
        if (!user) {
            throw new ForbiddenException(
                'User not found'
            )
        }
        const passwordMatched = await argon.verify(
            user.hashedPassWord,
            authDTO.password
        )
        if (!passwordMatched) {
            throw new ForbiddenException(
                'Incorrect password'
            )
        }
        delete user.hashedPassWord //remove 1 field in the object        
        // return await this.signJwtToken(user.id, user.email)
    }
}
