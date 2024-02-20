import { CreationOptional, DataTypes, ForeignKey, InferAttributes, InferCreationAttributes, Model, NonAttribute } from 'sequelize';
import { sequelize } from '../database';
import { Type } from './type';

export class Exercice extends Model<InferAttributes<Exercice>, InferCreationAttributes<Exercice>> {
    declare id: CreationOptional<number>;
    declare typeId: ForeignKey<Type['id']>;
    declare label: string;

    declare type?: NonAttribute<Type>;
}

Exercice.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    label: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    }
}, { sequelize, tableName: 'exercice', timestamps: false });

Exercice.belongsTo(Type, { targetKey: 'id' });

await sequelize.sync({ alter: true });