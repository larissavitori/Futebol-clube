import { Request, Response } from 'express';
import UserService from '../service/UserService';
import mapStatusHTTP from '../middlewares/mapStatusHttp';

export default class UserController {
  constructor(
    private userService = new UserService(),
  ) { }

  public async login(req: Request, res: Response): Promise<Response> {
    const serviceResponse = await this.userService.login(req.body);

    if (serviceResponse.status !== 'SUCCESSFUL') {
      return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.messager);
    }
    return res.status(200).json(serviceResponse.messager);
  }
}
