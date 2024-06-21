/* eslint-disable prettier/prettier */
import { Table, Model, Column, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Users } from './users.model';
import { Projects } from './projects.model';

@Table({
    tableName: 'tasks',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    underscored: true
})
export class Tasks extends Model<Tasks> {
    @Column({
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        type: DataType.INTEGER,
        field: 'id_task',
    })
    idTask: number

    @Column({
        allowNull: false,
        type: DataType.STRING,
        field: 'name_task',
    })
    nameTask: string

    @Column({
        allowNull: false,
        type: DataType.TEXT,
        field: 'task_description',
    })
    taskDescription: string

    @Column({
        allowNull: false,
        type: DataType.DATEONLY,
        field: 'date_start'
    })
    dateStart: Date

    @Column({
        allowNull: false,
        type: DataType.DATEONLY,
        field: 'date_finish',
    })
    dateFinish: Date

    // Definição da chave estrangeira
    @ForeignKey(() => Users)
    @Column({
        allowNull: false,
        type: DataType.INTEGER,
        field: 'fk_id_users',
    })
    fkIdUsers: number

    // Indica que cada task pertence a um usuário.
    @BelongsTo(() => Users)
    user: Users

    @ForeignKey(() => Projects)
    @Column({
        allowNull: false,
        type: DataType.INTEGER,
        field: 'fk_id_projects',
    })
    fkIdProjects: number

    @BelongsTo(() => Projects)
    projects: Projects

    @Column({
        allowNull: false,
        type: DataType.ENUM('In Progress', 'Delayed', 'Finished', 'Cancelled'),
        field: 'task_status'
    })
    taskStatus: string
}
