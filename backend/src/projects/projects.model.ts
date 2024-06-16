/* eslint-disable prettier/prettier */
import { Table, Model, Column, DataType, HasOne, HasMany } from 'sequelize-typescript';
import { Squads } from '../squads/squads.model';
import { Tasks } from '../tasks/tasks.model';

@Table({
    tableName: 'projects',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    underscored: true
})
export class Projects extends Model<Projects> {
    @Column({
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        type: DataType.INTEGER,
        field: 'id_project'
    })
    idProject: number

    @Column({
        allowNull: false,
        field: 'name_project',
    })
    nameProject: string

    @Column({
        type: DataType.DATEONLY,
        field: 'date_start',
        allowNull: false
    })
    dateStart: Date

    @Column({
        type: DataType.DATEONLY,
        field: 'date_finish',
        allowNull: false
    })
    dateFinish: Date

    @Column({
        type: DataType.ENUM('Created', 'In Progress', 'Finished', 'Cancelled'),
        defaultValue: 'Created',
        allowNull: false,
        field: 'project_status',
    })
    projectStatus: string

    @HasOne(() => Squads)
    squads: Squads

    @HasMany(() => Tasks)
    tasks: Tasks[]

}