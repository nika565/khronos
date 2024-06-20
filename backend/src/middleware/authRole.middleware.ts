import { Injectable, NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response, NextFunction } from 'express';
import { config } from 'dotenv';
config();

@Injectable()
export class AuthRoleMiddleware implements NestMiddleware {

    constructor(
        private jwt: JwtService
    ){}

    /* Middlware para extrair token e salvar 
    cargo do usuário na request */
    async use(req: Request, res: Response, next: NextFunction) {
        
        const [type, token] = req.headers.authorization?.split(' ') ?? [];
        
        if(!token) next();
        
        const payload = await this.jwt.verifyAsync(token, {
            secret: process.env.SECRET
        });

        // Salvando role para autenticação futura de rotas
        req['user'] = {
            roles: payload.roles
        };

        next();
    }
}