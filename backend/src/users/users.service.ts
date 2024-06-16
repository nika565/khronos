/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Users } from './users.model';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(Users) private readonly usersModel: typeof Users
    ){}

    async findAll(): Promise<Users[]> {
        return this.usersModel.findAll();
    }

    async find(id: number): Promise<Users> {
        return this.usersModel.findByPk(id);
    }
}
