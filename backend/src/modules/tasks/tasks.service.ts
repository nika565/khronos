import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Projects } from 'src/models/projects.model';
import { Tasks } from 'src/models/tasks.model';
import { Users } from 'src/models/users.model';

@Injectable()
export class TasksService {
    constructor(
        @InjectModel(Tasks) private readonly tasksModel: typeof Tasks
    ){}

    async findAllTasksUser(idUser: number): Promise<boolean | Tasks[]> {
        try {
            return await this.tasksModel.findAll({ 
                where: {
                    fkIdUsers: idUser
                } 
            });
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async findAllTasksProject(idProject: number): Promise<boolean | Tasks[]> {
        try {
            return await this.tasksModel.findAll({  
                where: {
                    fkIdProjects: idProject
                }  
            });
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async findOneTask(idTask: number): Promise<boolean | Tasks> {
        try {
            return await this.tasksModel.findByPk(idTask);
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async createTask(task: Tasks): Promise<boolean | Tasks> {
        try {
            return await this.tasksModel.create(task);
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async update(task: Tasks, idTask: number): Promise<boolean | [affectedCount: number]> {
        try {
            return await this.tasksModel.update(task, {
                where: { idTask: idTask }
            })
        } catch (error) {
            console.log(error);
            return false;
        }
    }
}
