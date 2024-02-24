import { Association, BelongsToManyAddAssociationMixin, BelongsToManyGetAssociationsMixin, CreationOptional, DataTypes, ForeignKey, HasManyAddAssociationMixin, HasManyCountAssociationsMixin, HasManyCreateAssociationMixin, HasManyGetAssociationsMixin, HasManyHasAssociationMixin, HasManyHasAssociationsMixin, HasManyRemoveAssociationMixin, HasManyRemoveAssociationsMixin, HasManySetAssociationsMixin, InferAttributes, InferCreationAttributes, Model, NonAttribute } from 'sequelize';
import { sequelize } from '../database';
import { Exercice } from './Exercice';

export class Group extends Model<InferAttributes<Group>, InferCreationAttributes<Group>> {
    declare id: CreationOptional<number>;
    declare label: string;
    declare quantity: number | null;

    declare exercices?: NonAttribute<Exercice[]>;

    declare getExercices: HasManyGetAssociationsMixin<Exercice>;
    declare addExercice: HasManyAddAssociationMixin<Exercice, number>;
    declare setExercices: HasManySetAssociationsMixin<Exercice, number>;
    declare removeExercice: HasManyRemoveAssociationMixin<Exercice, number>;
    declare removeExercices: HasManyRemoveAssociationsMixin<Exercice, number>;
    declare hasExercice: HasManyHasAssociationMixin<Exercice, number>;
    declare hasExercices: HasManyHasAssociationsMixin<Exercice, number>;
    declare countExercices: HasManyCountAssociationsMixin;
    declare createExercice: HasManyCreateAssociationMixin<Exercice, 'typeId'>;

    declare static associations: {
        exercices: Association<Group, Exercice>;
    };
}

Group.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    label: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    quantity: {
        type: DataTypes.INTEGER,
    }
}, { sequelize, tableName: 'group', timestamps: false });

Group.hasMany(Exercice, {
    sourceKey: 'id',
    foreignKey: 'groupId',
    as: 'exercices'
});

await sequelize.sync({ alter: true });