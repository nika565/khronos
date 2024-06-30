/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ProjectsController } from './projects.controller';
import { ProjectsService } from './projects.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Projects } from '../../models/projects.model';
import { Validation } from 'src/Validation/validation.service';

@Module({
  imports: [SequelizeModule.forFeature([Projects])],
  controllers: [ProjectsController],
  providers: [ProjectsService, Validation]
})
export class ProjectsModule {}
