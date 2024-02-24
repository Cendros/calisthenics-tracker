import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model, NonAttribute } from 'sequelize';
import { sequelize } from '../database';
import { Exercice } from './Exercice';

export class Day extends Model<InferAttributes<Day>, InferCreationAttributes<Day>> {
    declare id: CreationOptional<number>;
    declare date: Date;

    declare exercices?: NonAttribute<Day[]>;
}

Day.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        unique: true,
    }
}, { sequelize, tableName: 'day', timestamps: false });

Day.belongsToMany(Exercice, { through: 'day_exercice' });
Day.hasMany(Exercice, {
    as: 'exercices'
});

await sequelize.sync({ alter: true });