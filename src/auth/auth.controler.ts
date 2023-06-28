import { Body, Controller, Get, Post, Req } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthDTO } from "./dto";

@Controller("auth")
export class AuthController {
    constructor(private authService: AuthService) {

    }
    @Post("register")
    register(
        @Body("email") body: AuthDTO,
    ) {
        console.log("🚀 ~ file: auth.controler.ts:15 ~ AuthController ~ body:", body)
        return this.authService.register()
    }

    @Post("login")
    login() {
        return this.authService.login()
    }

}