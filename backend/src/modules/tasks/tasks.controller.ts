import { Controller, Get, Post, Put, Query, Param, Body, Res, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { TasksService } from './tasks.service';
import { Validation } from 'src/Validation/validation.service';

@Controller('tasks')
export class TasksController {
    constructor(
        private readonly tasksService: TasksService,
        private readonly validation: Validation,
    ){}

    @Get()
    async findAllTasksByUser(@Query() query: any, @Res() res: Response): Promise<Record<string, any>> {

        // Verificando se as variáveis de parâmetro existem
        const { idUser, idProject } = query;
        let tasks: any;

        if(idUser) {
            tasks = await this.tasksService.findAllTasksUser(parseInt(idUser));
        }
        
        if(idProject) {
            tasks = await this.tasksService.findAllTasksProject(idProject);
        }

        if(!tasks || tasks.length === 0) return res
        .status(HttpStatus.NOT_FOUND)
        .json({
            status: `error`,
            msg: `Nenhuma tarefa foi encontrada.`,
        });

        return res.status(HttpStatus.OK).json({
            status: `success`,
            data: tasks,
        });
    }

    @Get(':idTask')
    async findOneTask(@Param() param: any, @Res() res: Response) {

        const id = parseInt(param.idTask);

        const getTask = await this.tasksService.findOneTask(id);

        if(!getTask) return res.status(HttpStatus.NOT_FOUND).json({
            status: `error`,
            msg: `Nenhuma tarefa encontrada.`
        });

        return res.status(HttpStatus.OK).json({
            status: `success`,
            data: getTask,
        });
    }

    @Post()
    async createANewTask(@Body() body: any, @Res() res: Response) {

        // Validação de campos vazios
        if(this.validation.dataEmptyValidate(Object.values(body))){
            return res.status(HttpStatus.BAD_REQUEST).json({
                status: `error`,
                msg: `Preencha todos os dados`,
            });
        }

        // Validação de data
        const { dateStart, dateFinish } = body;

        if(this.validation.timeValidate(dateStart, dateFinish) === false){
            return res.status(HttpStatus.BAD_REQUEST).json({
                status: `error`,
                msg: `A data foi inserida de forma incorreta, verifique e tente novamente`,
            });
        }

        const newTask = await this.tasksService.createTask(body);

        if(!newTask) return res.status(HttpStatus.BAD_REQUEST).json({
            status: `error`,
            msg: `Algo deu errado ao tentar criar nova tarefa`,
        });

        return res.status(HttpStatus.CREATED).json({
            status: `success`,
            msg: `Tarefa criada com sucesso!`,
            data: newTask,
        });
    }

    @Put(':idTask')
    async updateTask(@Param() param: any, @Body() body: any, @Res() res: Response) {

        // Validação de data
        const { dateStart, dateFinish } = body;

        if(this.validation.timeValidate(dateStart, dateFinish) === false){
            return res.status(HttpStatus.BAD_REQUEST).json({
                status: `error`,
                msg: `A data foi inserida de forma incorreta, verifique e tente novamente`,
            });
        }

        const id = parseInt(param.idTask);
        const taskUpdated = await this.tasksService.update(body, id);

        if(!taskUpdated) return res.status(HttpStatus.BAD_REQUEST).json({
            status: `error`,
            msg: `Não foi possível modificar tarefa`,
        });

        return res.status(HttpStatus.OK).json({
            status: `success`,
            msg: `Tarefa modificada com sucesso!`,
        });
    }

}
