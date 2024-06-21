/* eslint-disable prettier/prettier */
import { Table, Model, Column, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Users } from  './users.model';
import { Projects } from './projects.model';

@Table({
    tableName: 'squads',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    underscored: true,
})
export class Squads extends Model<Squads> {
    @Column({
        primaryKey: true,
        autoIncrement: true,
        type: DataType.INTEGER,
        allowNull: false,
        field: 'id_squad',
    })
    idSquad: number

    @Column({
        type: DataType.STRING,
        allowNull: false,
        field: 'name_squad',
    })
    nameSquad: string

    @ForeignKey(() => Projects)
    @Column({
        allowNull: false,
        type: DataType.INTEGER,
        field: 'fk_id_projects',
    })
    fkIdProjects: number

    @BelongsTo(() => Projects)
    projects: Projects

    @ForeignKey(() => Users)
    @Column({
        allowNull: false,
        type: DataType.INTEGER,
        field: 'fk_id_users',
    })
    fkIdUsers: number

    @BelongsTo(() => Users)
    users: Users
}