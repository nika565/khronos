/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { APP_GUARD } from '@nestjs/core';
import { Users } from './users.model';
import { AuthModule } from 'src/auth/auth.module';
import { AuthGuard } from 'src/auth/auth.guard';

@Module({
  imports: [
    SequelizeModule.forFeature([Users]),
    // AuthModule,
  ],
  controllers: [UsersController],
  providers: [
    UsersService,
    {
      provide: APP_GUARD, 
      useClass: AuthGuard
    }
  ],
  exports: [UsersService],
})
export class UsersModule {}
