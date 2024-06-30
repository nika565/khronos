/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { APP_GUARD } from '@nestjs/core';
import { Users } from '../../models/users.model';
import { AuthGuard } from '../../guards/auth.guard';
import { Validation } from 'src/Validation/validation.service';

@Module({
  imports: [
    SequelizeModule.forFeature([Users]),
  ],
  controllers: [UsersController],
  providers: [
    UsersService,
    Validation,
    {
      provide: APP_GUARD, 
      useClass: AuthGuard
    }
  ],
  exports: [UsersService],
})
export class UsersModule {}
