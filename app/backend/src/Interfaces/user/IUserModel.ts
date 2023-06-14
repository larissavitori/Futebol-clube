import { ICRUDModelCreator } from './ICrudModel';
import { IUser } from './IUser';

export interface IUserModel extends ICRUDModelCreator<IUser>,
  ICRUDModelCreator<IUser>{
  findByEmail(email: IUser['email']): Promise<IUser | null>,
}
