/* eslint-disable prettier/prettier */
import { Controller, Get, Req, Res, Param } from '@nestjs/common';
import { Request, Response } from 'express';
import { UsersService } from './users.service';
import { Users } from './users.model';

@Controller('users')
export class UsersController {

    constructor(
        private readonly usersService: UsersService
    ){}

    @Get()
    async findAll(): Promise<Users[]> {
        return await this.usersService.findAll();
    }

    @Get(':id')
    async find(@Param() param: any): Promise<Users> {
        return await this.usersService.find(Number(param.id))
    }

}
