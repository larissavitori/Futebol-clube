// import { NewEntity } from '../Interfaces/user';
import SequelizeUser from '../database/models/usersModel';
import { IUser } from '../Interfaces/user/IUser';
import { IUserModel } from '../Interfaces/user/IUserModel';

export default class UsersModel implements IUserModel {
  private model = SequelizeUser;

  async findByEmail(email: IUser['email']): Promise<IUser | null> {
    const user = await this.model.findOne({ where: { email } });
    if (!user) return null;
    const { id, password, username } = user;
    return { id, email, password, username };
  }

  async create(): Promise<IUser> {
    const user = await this.model.create();
    const { id, email, password, username } = user;
    return { id, email, password, username };
  }
}
