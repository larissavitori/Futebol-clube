import SequelizeUser from '../database/models/usersModel';
import { IUser } from '../Interfaces/user/IUser';
import { IUserModel } from '../Interfaces/user/IUserModel';

export default class UsersModel implements IUserModel {
  private model = SequelizeUser;

  async findByEmail(email: IUser['email']): Promise<IUser | null> {
    const user = await this.model.findOne({ where: { email } });
    if (!user) return null;
    const { id, password, username, role } = user;
    return { id, email, password, username, role };
  }

  async findAll(): Promise<IUser[]> {
    const dbData = await this.model.findAll();
    return dbData.map(({ email, password, id, username, role }) => (
      { email, password, id, username, role }
    ));
  }
}
