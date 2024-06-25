import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Squads } from 'src/models/squads.model';
import { Users } from 'src/models/users.model';

@Injectable()
export class SquadsService {
    constructor(
        @InjectModel(Squads) private readonly squadsModel: typeof Squads
    ){}

    async findAll(userId: number): Promise<Squads[] | boolean>{
        try {
            return await this.squadsModel.findAll({
                include: [{
                    model: Users,
                    required: true,
                    where: {
                        fkIdUsers: userId,
                    }
                }]
            });
        } catch (error) {
            console.log(error)
            return false;
        }
    }

    async find(id: number): Promise<Squads | boolean> {
        try {
            return await this.squadsModel.findByPk(id);
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async createSquad(squad: Squads): Promise<boolean | Squads> {
        try {
            return await this.squadsModel.create(squad);
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async update(squad: Squads, id: number ) {
        try {
            return await this.squadsModel.update(squad, { where: { idSquad: id } })
        } catch (error) {
            console.log(error);
            return false;
        }
    };
}
