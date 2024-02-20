import { Association, CreationOptional, DataTypes, HasManyAddAssociationMixin, HasManyCountAssociationsMixin, HasManyCreateAssociationMixin, HasManyGetAssociationsMixin, HasManyHasAssociationMixin, HasManyHasAssociationsMixin, HasManyRemoveAssociationMixin, HasManyRemoveAssociationsMixin, HasManySetAssociationsMixin, InferAttributes, InferCreationAttributes, Model, NonAttribute } from 'sequelize';
import { sequelize } from '../database';
import { Exercice } from './Exercice';

export class Type extends Model<InferAttributes<Type>, InferCreationAttributes<Type>> {
    declare id: CreationOptional<number>;
    declare label: string;
    declare color: string | null;
    declare getExercices: HasManyGetAssociationsMixin<Exercice>;
    declare addExercice: HasManyAddAssociationMixin<Exercice, number>;
    declare setExercices: HasManySetAssociationsMixin<Exercice, number>;
    declare removeExercice: HasManyRemoveAssociationMixin<Exercice, number>;
    declare removeExercices: HasManyRemoveAssociationsMixin<Exercice, number>;
    declare hasExercice: HasManyHasAssociationMixin<Exercice, number>;
    declare hasExercices: HasManyHasAssociationsMixin<Exercice, number>;
    declare countExercices: HasManyCountAssociationsMixin;
    declare createExercice: HasManyCreateAssociationMixin<Exercice, 'typeId'>;

    declare exercices?: NonAttribute<Exercice[]>;

    declare static associations: {
        exercices: Association<Type, Exercice>;
    };
}

Type.init({
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
    color: DataTypes.STRING(7)
}, { sequelize, tableName: 'type', timestamps: false });

Type.hasMany(Exercice, {
    sourceKey: 'id',
    foreignKey: 'typeId',
    as: 'exercices'
});

await sequelize.sync({ alter: true });