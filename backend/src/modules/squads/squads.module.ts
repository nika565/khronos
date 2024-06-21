/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { SquadsController } from './squads.controller';
import { SquadsService } from './squads.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Squads } from '../../models/squads.model';

@Module({
  imports: [SequelizeModule.forFeature([Squads])],
  controllers: [SquadsController],
  providers: [SquadsService]
})
export class SquadsModule {}
