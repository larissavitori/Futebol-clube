import * as bcrypt from 'bcryptjs';
import UserModel from '../models/UserModel';
import { ILogin, IUser } from '../Interfaces/user/IUser';
import { IUserModel } from '../Interfaces/user/IUserModel';
import { ServiceMessage, ServiceResponse } from '../Interfaces/ServiceResponse';
import JWT from '../middlewares/JWT';
import { IToken } from '../Interfaces/user/IToken';

export default class UserService {
  constructor(
    private userModel: IUserModel = new UserModel(),
    private jwtService = JWT,
  ) { }

  public async login(data: ILogin): Promise<ServiceResponse<ServiceMessage | IToken>> {
    const user = await this.userModel.findByEmail(data.email);
    if (user) {
      if (!bcrypt.compareSync(data.password, user.password)) {
        return { status: 'UNAUTHORIZED', messager: { message: 'Invalid email or password' } };
      }
      const { email } = user as IUser;
      const token = this.jwtService.sign({ email });
      return { status: 'SUCCESSFUL', messager: { token } };
    }
    return { status: 'UNAUTHORIZED', messager: { message: 'Invalid email or password' } };
  }
}
