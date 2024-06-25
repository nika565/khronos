import { Controller, Get, Post, Put, Param, Body, Res, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { ProjectsService } from './projects.service';

@Controller('projects')
export class ProjectsController {
    constructor(
        private readonly projectsService: ProjectsService,
    ){}

    @Get()
    async findAllProjects(@Res() res: Response): Promise<Record<string, any>> {
        const projects = await this.projectsService.findAll();

        if(!projects) return res
        .status(HttpStatus.NOT_FOUND)
        .json({
            status: `error`,
            msg: `Nenhum registro foi encontrado.`
        });

        return res
        .status(HttpStatus.OK)
        .json({
            status: `success`,
            data: projects
        });
    }

    @Get('/squads/:squadId')
    async findAllProjectsBySquad(@Param() param: any, @Res() res: Response): Promise<Record<string, any>> {
        const id = parseInt(param.squadId);
        const projects = await this.projectsService.findAllSquadProject(id);

        if(!projects) return res
        .status(HttpStatus.NOT_FOUND)
        .json({
            status: `error`,
            msg: `Nenhum registro encontrado.`
        });

        return res
        .status(HttpStatus.OK)
        .json({
            status: `success`,
            data: projects
        });
    }

    @Get(':id')
    async findProjectById(@Param() param: any, @Res() res: Response) {
        const id = parseInt(param.id);
        const project = await this.projectsService.find(id);

        if(!project) return res.status(HttpStatus.NOT_FOUND).json({
            status: `error`,
            msg: `Nenhum registro foi encontrado.`
        });

        return res.status(HttpStatus.OK).json({
            status: `success`,
            data: project
        });
    }

    @Post()
    async createNewProject(@Body() body: any, @Res() res: Response): Promise<Record<string, any>> {
        const newProject = await this.projectsService.createProject(body);

        if(!newProject) return res
        .status(HttpStatus.BAD_REQUEST)
        .json({
            status: `error`,
            msg: `Erro ao tentar cadastrar um novo projeto.`
        });

        return res.status(HttpStatus.CREATED).json({
            status: `success`,
            msg: `Novo Projeto criado com sucesso!`,
            data: newProject
        });
    }

    @Put(':id')
    async updateProject(@Param() param: any, @Body() body: any, @Res() res: Response): Promise<Record<string, any>> {
        const id = parseInt(param.id);
        const updatedProject = await this.projectsService.update(id, body);

        if(!updatedProject) return res
        .status(HttpStatus.BAD_REQUEST)
        .json({
            status: `error`,
            msg: `Não foi possível realizar a edição.`
        });

        return res
        .status(HttpStatus.OK)
        .json({
            status: `success`,
            msg: `Edição realizada com sucesso!`
        });
    }

}
