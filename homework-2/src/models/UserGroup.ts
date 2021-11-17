import { DataTypes, Model, Optional } from 'sequelize';
import { sequelizeConnection } from '../loaders/db.connection.loader';


export interface UserGroupAttributes {
     id: number
}

export type UserGroupDTO = Optional<UserGroupAttributes, 'id'>
export type UserGroupModel = Required<UserGroupAttributes>

class UserGroup extends Model<UserGroupAttributes, UserGroupDTO> implements UserGroupAttributes {
    public id!: number;
}

UserGroup.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    }
}, {
    timestamps: false,
    sequelize: sequelizeConnection
});

export default UserGroup;
