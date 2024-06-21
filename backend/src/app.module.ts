/* eslint-disable prettier/prettier */
import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from './modules/users/users.module';
import { ProjectsModule } from './modules/projects/projects.module';
import { TasksModule } from './modules/tasks/tasks.module';
import { SquadsModule } from './modules/squads/squads.module';
import { Users } from './models/users.model';
import { Projects } from './models/projects.model';
import { Tasks } from './modules/tasks/tasks.model';
import { Squads } from './models/squads.model';
import { AuthModule } from './auth/auth.module';
import { AuthRoleMiddleware } from './middleware/authRole.middleware';
import { UsersController } from './modules/users/users.controller';
import { ProjectsController } from './modules/projects/projects.controller';
import { TasksController } from './modules/tasks/tasks.controller';
import { SquadsController } from './modules/squads/squads.controller';

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
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService
  ],
})
export class AppModule implements NestModule {

  configure(consumer: MiddlewareConsumer) {
    consumer
    .apply(AuthRoleMiddleware)
    .forRoutes(
      UsersController, 
      ProjectsController, 
      TasksController, 
      SquadsController
    )
  }
}
