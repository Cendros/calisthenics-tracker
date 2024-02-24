import { CreationOptional, DataTypes, ForeignKey, InferAttributes, InferCreationAttributes, Model, NonAttribute } from 'sequelize';
import { sequelize } from '../database';
import { Type } from './type';
import { Group } from './Group';
import { Day } from './Day';

export class Exercice extends Model<InferAttributes<Exercice>, InferCreationAttributes<Exercice>> {
    declare id: CreationOptional<number>;
    declare typeId: ForeignKey<Type['id']>;
    declare groupId: ForeignKey<Type['id']>;
    declare label: string;
    declare quantity: number;

    declare type?: NonAttribute<Type>;

    declare groups?: NonAttribute<Group[]>;
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
    },
    quantity: {
        type: DataTypes.INTEGER,
    }
}, { sequelize, tableName: 'exercice', timestamps: false });

Exercice.belongsTo(Type, { targetKey: 'id' });
Exercice.belongsTo(Group, { targetKey: 'id' });
Exercice.belongsToMany(Day, { through: 'day_exercice' });
Exercice.hasMany(Day, {
    as: 'days'
});

await sequelize.sync({ alter: true });