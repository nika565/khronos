/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Users } from '../../models/users.model';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(Users) private readonly usersModel: typeof Users
    ) { }

    // Por padrão, serão buscados apenas usuários ativos
    async findAll(active: string = 'true'): Promise<Users[] | boolean> {
        try {
            return await this.usersModel.findAll({
                where: { active: active }
            });
        } catch (error) {
            console.log(error);
            return false
        }
    }

    async find(id: number, active: string = 'true', email?: string): Promise<Users | boolean> {
        try {

            // Usando e-mail para login
            if(email) return await this.usersModel.findOne({
                where: { userEmail: email }
            });

            // Busca comum por id e filtro de ativos e inativos
            return await this.usersModel.findOne({
                where: { userId: id, active: active }
            });

        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async create(userName: string, userEmail: string, userPassword: string, userRole: string): Promise<Users | boolean> {
        try {
            return this.usersModel.create({
                userName,
                userEmail,
                userPassword,
                userRole
            });
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async update(id: number, user: Users): Promise<[affectedCount: number] | boolean> {
        try {
            return this.usersModel.update(user, { where: { userId: id } });
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async inactivate(id: number): Promise<[affectedCount: number] | boolean> {
        try {
            return this.usersModel.update({ active: 'false' }, { where: { userId: id  } });
        } catch (error) {
            console.log(error);
            return false;
        }
    }
}
