import User from '../models/User';
import Group from '../models/Group';
import UserGroup from '../models/UserGroup';
import { Model } from 'sequelize';

export default (): Array<DatabaseModel> => {
    const userModel = {
        name: 'userModel' as string,
        model: new User()
    };
    const groupModel = {
        name: 'groupModel' as string,
        model: new Group()
    };
    const userGroupRelation = {
        name: 'userGroupModel' as string,
        model: new UserGroup()
    };

    User.belongsToMany(Group, { through: UserGroup });
    Group.belongsToMany(User, { through: UserGroup });
    User.hasMany(UserGroup, { onDelete: 'CASCADE' });
    UserGroup.belongsTo(User);
    Group.hasMany(UserGroup, { onDelete: 'CASCADE' });
    UserGroup.belongsTo(Group);

    return [userModel, groupModel, userGroupRelation];
};

export interface DatabaseModel {
    name: string,
    model: Model<any, any>
}
