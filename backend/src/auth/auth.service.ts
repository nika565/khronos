import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwt: JwtService,
    ){}

    // Buscando usuário para login
    async singIn(userEmail: string, userPassword: string): Promise<Record<string, any>> {
        
        // Buscando apenas pelo parâmetro do e-mail
        const user = await this.usersService.find(0, '', userEmail);
        
        if(!user) {
            throw new UnauthorizedException({
                status: `error`,
                msg: `Seu E-mail ou senha está incorreto!`,
            });
        };

        // Verificação da senha
        const isMatch: boolean = await bcrypt.compare(userPassword, user['userPassword']);
        if(isMatch === false) {
            throw new UnauthorizedException({
                status: `error`,
                msg: `Seu e-mail ou senha está incorreto!`,
            });
        };

        // Retornando o token
        const payload = { userId: user['userId'] };

        return {
            token: await this.jwt.signAsync(payload),
        };

    }
}
