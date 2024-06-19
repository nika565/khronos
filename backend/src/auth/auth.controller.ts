import { Controller, Body, Post, HttpStatus, Res } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { Public } from '../decorators/PublicRoute';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
    ){}

    @Public()
    @Post('login')
    async signIn(@Body() body: Record<string, any>, @Res() res: Response): Promise<Record<string, any>> {
        try {

            const { token } = await this.authService.singIn(body['userEmail'], body['userPassword']);

            return res.status(HttpStatus.OK).json({
                status: `success`,
                msg: `Autenticado com sucesso!`,
                token: token
            });
        } catch (error) {
            console.log(error);
            return res.status(HttpStatus.BAD_REQUEST).json(error['response']);
        }
    }

}
