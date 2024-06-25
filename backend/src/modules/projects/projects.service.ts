import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Projects } from 'src/models/projects.model';
import { Squads } from 'src/models/squads.model';

@Injectable()
export class ProjectsService {
    constructor(
        @InjectModel(Projects) private readonly projectsModel: typeof Projects
    ){}

    async findAll(): Promise<boolean | Projects[]> {
        try {
            return await this.projectsModel.findAll();
        } catch (error) {
            console.log(error);
            return false
        }
    }

    async findAllSquadProject(squadId: number): Promise< boolean | Projects[]> {
        try {
            return this.projectsModel.findAll({
               include: [{
                model: Squads,
                required: true,
                where: {
                    idSquad: squadId
                }
               }]
            });
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async find(id: number): Promise<Projects | boolean> {
        try {
            return this.projectsModel.findByPk(id);
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async createProject(project: Projects): Promise<boolean | Projects> {
        try {
            return await this.projectsModel.create(project);
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async update(id: number, project: Projects): Promise<[affectedCount: number] | boolean> {
        try {
            return this.projectsModel.update(project, { where: { idProject: id } });
        } catch (error) {
            console.log(error);
            return false;
        }
    }
}
