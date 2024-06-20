/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Put, Delete, Res, Body, Param, Query, HttpStatus, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { UsersService } from './users.service';
import * as bcrypt from 'bcrypt';
import { Public } from '../../decorators/PublicRoute';
import { RolesGuard } from 'src/guards/roles.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/enums/role.enum';

@Controller('users')
export class UsersController {

    constructor(
        private readonly usersService: UsersService
    ){}

    @Roles(Role.Admin)
    @UseGuards(RolesGuard)
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

    @Roles(Role.Admin, Role.Common)
    @UseGuards(RolesGuard)
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

    @Public()
    @Post()
    async create(@Body() body: any, @Res() res: Response) {
        const { userName, userEmail, userPassword, userRole } = body;

        if(!userName || !userEmail || !userPassword || !userRole) {
            return res.status(HttpStatus.BAD_REQUEST).json({
                status: `error`,
                msg: `Você deve preencher todos os campos solicitados`,
            })
        }

        // Adicionando criptografia de senha
        const hash = await bcrypt.hash(userPassword, 12);

        const register = await this.usersService.create(userName, userEmail, hash, userRole);

        if(!register) return res.status(HttpStatus.BAD_REQUEST).json({
            status: `error`,
            msg: `Algo deu errado ao tentar cadastrar um novo usuário`,
        });

        return res.status(HttpStatus.CREATED).json({
            status: `success`,
            data: register
        })
    }

    @Roles(Role.Admin, Role.Common)
    @UseGuards(RolesGuard)
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

    @Roles(Role.Admin)
    @UseGuards(RolesGuard)
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
