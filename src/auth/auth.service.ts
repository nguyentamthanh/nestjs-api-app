import { Injectable } from "@nestjs/common";
import { PrismaService } from '../prisma/prisma.service';

@Injectable({})
export class AuthService {
    constructor(private prismaService: PrismaService) { }
    register() {
        return {
            x: 1,
            y: 2,
            z: ""
        }
    }

    login() {
        let x: number = 2
        let y: number = 10
        return x + y
    }
}
