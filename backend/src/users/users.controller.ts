/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Put, Delete, Res, Body, Param, Query, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {

    constructor(
        private readonly usersService: UsersService
    ){}

    @Get()
    async findAll(@Res() res: Response): Promise<Response<any, Record<string, any>>> {
        const data = await this.usersService.findAll();

        // Verificação dos dados
        if(!data) {
            return res.status(HttpStatus.NOT_FOUND).json({
                status: `error`,
                msg: `Nenhum registro encontrado`
            })
        }

        return res.status(HttpStatus.OK).json({
            status: `success`,
            data: data
        })
    }

    @Get(':id')
    async find(@Param() param: any, @Query() query: any, @Res() res: Response): Promise<Response<any, Record<string, any>>> {
        const data = await this.usersService.find(Number(param.id), query.active);

        if(!data) return res.status(HttpStatus.NOT_FOUND).json({
            status: `error`,
            msg: `Nenhum registro encontrado`
        })

        return res.status(HttpStatus.OK).json({
            status: `success`,
            data: data
        })
    }

    @Post()
    async create(@Body() body: any, @Res() res: Response) {
        const { userName, userEmail, userPassword, userRole } = body;

        if(!userName || !userEmail || !userPassword || !userRole) {
            return res.status(HttpStatus.BAD_REQUEST).json({
                status: `error`,
                msg: `Você deve preencher todos os campos solicitados`,
            })
        }

        const register = await this.usersService.create(userName, userEmail, userPassword, userRole);

        if(!register) return res.status(HttpStatus.BAD_REQUEST).json({
            status: `error`,
            msg: `Algo deu errado ao tentar cadastrar um novo usuário`,
        });

        return res.status(HttpStatus.CREATED).json({
            status: `success`,
            data: register
        })
    }

    @Put(':id')
    async update(@Param() param: any, @Body() body: any, @Res() res: Response) {
        const edit = await this.usersService.update(parseInt(param.id), body);

        if(!edit) return res.status(HttpStatus.BAD_REQUEST).json({
            status: `error`,
            msg: `Erro ao tentar editar usuário. Verifique os dados e tente novamente.`,
        });

        return res.status(HttpStatus.OK).json({
            status: `success`,
            msg: `Usuário alterado com sucesso!`
        })
    }

    @Delete(':id')
    async inactivate(@Param() param: any, @Res() res: Response) {
        const inactive = await this.usersService.inactivate(parseInt(param.id));

        if(!inactive) return res.status(HttpStatus.BAD_REQUEST).json({
            status: `error`,
            msg: `Não foi possível inativar usuário.`
        });

        return res.status(HttpStatus.OK).json({
            status: `success`,
            msg: `Usuário inativado com sucesso!`,
        });
    }
}
