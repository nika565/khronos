import { Controller, Get, Post, Put, Res, Param, Body, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { SquadsService } from './squads.service';

@Controller('squads')
export class SquadsController {
    constructor(
        private readonly squadsService: SquadsService,
    ){}

    @Get('/squad-user/:userId')
    async findAllSquads(@Param() param: any, @Res() res: Response): Promise<Record<string, any>> {
        const userId = parseInt(param.userId);

        const squads = await this.squadsService.findAll(userId);

        if(!squads) return res.status(HttpStatus.NOT_FOUND).json({
            status: `error`,
            msg: `Nenhum resgitro encontrado.`
        });

        return res.status(HttpStatus.OK).json({
            status: `success`,
            data: squads
        });
    }

    @Get(':squadId')
    async findSquad(@Param() param: any, @Res() res: Response): Promise<Record<string, any>> {
        const id = parseInt(param.squadId);
        const squad = await this.squadsService.find(id);

        if(!squad) return res
        .status(HttpStatus.NOT_FOUND)
        .json({
            status: `error`,
            msg: `Nenhum registro foi encontrado.`
        });

        return res.status(HttpStatus.OK).json({
            status: `success`,
            data: squad
        });
    }

    @Post()
    async createSquad(@Body() body: any, @Res() res: Response): Promise<Record<string, any>>  {
        const createANewSquad = await this.squadsService.createSquad(body);

        if(!createANewSquad) return res.status(HttpStatus.BAD_REQUEST).json({
            status: `error`,
            msg: `Erro ao tentar criar um novo grupo.`,
        });

        return res.status(HttpStatus.OK).json({
            status: `success`,
            msg: `Novo grupo criado com sucesso!`,
            data: createANewSquad,
        });
    }

    @Put(':idSquad')
    async updateSquad(@Param() param: any, @Body() body: any, @Res() res: Response): Promise<Record<string, any>> {
        const id = parseInt(param.idSquad);
        const updatedSquad = await this.squadsService.update(body, id);

        if(!updatedSquad) return res.status(HttpStatus.BAD_REQUEST).json({
            status: `error`,
            msg: `Erro ao tentar editar a squad.`
        });

        return res.status(HttpStatus.OK).json({
            status: `error`,
            msg: `Grupo modificado com sucesso!`
        });
    }
}
