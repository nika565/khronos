/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from './users/users.module';
import { ProjectsModule } from './projects/projects.module';
import { TasksModule } from './tasks/tasks.module';
import { SquadsModule } from './squads/squads.module';
import { Users } from './users/users.model';
import { Projects } from './projects/projects.model';
import { Tasks } from './tasks/tasks.model';
import { Squads } from './squads/squads.model';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE,
      models: [Users, Projects, Tasks, Squads],
      define: {
        underscored: true,
      },
    }),
    UsersModule,
    ProjectsModule,
    TasksModule,
    SquadsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
