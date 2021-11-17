import { DataTypes, Model, Optional } from 'sequelize';
import { sequelizeConnection }  from '../loaders/db.connection.loader';

export interface UserAttributes {
    uuid: string,
    login:string,
    password:string,
    age:number,
    isDeleted:boolean
}
export type UserDTO = Optional<UserAttributes, 'uuid'>
export type UserModel = Required<UserAttributes>

class User extends Model<UserAttributes, UserDTO> implements UserAttributes {
    public uuid!: string
    public login!: string
    public password!: string
    public age!: number
    public isDeleted!: boolean
}

User.init({
    uuid: {
        primaryKey: true,
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4
    },
    login: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    age: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    isDeleted: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
}, {
    timestamps: false,
    sequelize: sequelizeConnection
});

export default User;
