/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ProjectsController } from './projects.controller';
import { ProjectsService } from './projects.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Projects } from './projects.model';

@Module({
  imports: [SequelizeModule.forFeature([Projects])],
  controllers: [ProjectsController],
  providers: [ProjectsService]
})
export class ProjectsModule {}
