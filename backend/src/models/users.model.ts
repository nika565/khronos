/* eslint-disable prettier/prettier */
import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';
import { Tasks } from './tasks.model';

@Table({
    tableName: 'users',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    underscored: true,
})
export class Users extends Model<Users> {
    @Column({
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        type: DataType.INTEGER,
        field: 'id_user',
    })
    userId: number

    @Column({
        allowNull: false,
        field: 'user_name'
    })
    userName: string

    @Column({
        allowNull: false,
        unique: true,
        field: 'user_email',
    })
    userEmail: string

    @Column({
        allowNull: false,
        field: 'user_password',
    })
    userPassword: string

    @Column({
        allowNull: false,
        type: DataType.ENUM('true', 'false'),
        defaultValue: 'true',
        field: 'active'
    })
    active: string

    @Column({
        allowNull: false,
        type: DataType.ENUM('common', 'admin'),
        defaultValue: 'common',
        field: 'user_role'
    })
    userRole: string

    /*
        Indica que a tabela `users` tem relação de "um para muitos" com 
        a tabela de `Tasks`
    */
    @HasMany(() => Tasks)
    tasks: Tasks[]

}