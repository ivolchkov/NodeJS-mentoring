import { DataTypes, Model, Optional } from 'sequelize';
import { sequelizeConnection } from '../loaders/db.connection.loader';

export interface GroupAttributes {
    uuid: string,
    name: string,
    permissions: Array<Permission>
}

enum Permission {
    READ,
    WRITE,
    DELETE,
    SHARE,
    UPLOAD_FILES
}

export type GroupDTO = Optional<GroupAttributes, 'uuid'>
export type GroupModel = Required<GroupAttributes>

class Group extends Model<GroupAttributes, GroupDTO> implements GroupAttributes {
    public uuid!: string;
    public name!: string;
    public permissions!: Array<Permission>;
}

Group.init({
    uuid: {
        primaryKey: true,
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    permissions: {
        type: DataTypes.ARRAY(DataTypes.ENUM('READ', 'WRITE', 'DELETE', 'SHARE', 'UPLOAD_FILES'))
    }
}, {
    timestamps: false,
    sequelize: sequelizeConnection
});

export default Group;
