import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { config } from 'dotenv';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from 'src/decorators/PublicRoute';
config();

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(
        private jwt: JwtService,
        private reflector: Reflector,
    ){}

    async canActivate(context: ExecutionContext): Promise<boolean> {

        // Configuração para rotas publicas
        const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);

        if(isPublic) return true;

        // Configuração para rotas protegidas
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);

        if(!token) throw new UnauthorizedException({
            status: `error`,
            msg: `Sua sessão expirou, faça o login novamente!`
        });

        try {

            // Verificando o token e salvando os dados na estrutura da solicitação
            const payload = await this.jwt.verifyAsync(token, { secret: process.env.SECRET });
            request['userPayload'] = payload;

        } catch (error) {
            throw new UnauthorizedException({
                status: `error`,
                msg: `Você precisa se autenticar novamente.`
            });
        }

        // Deu tudo certo, passou por todas as verificações do token
        return true;
    }

    extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === "Bearer" ? token : undefined;
    }

}