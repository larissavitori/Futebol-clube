import { Request, Response } from 'express';
import MatchService from '../service/matchService';

export default class MatchController {
  constructor(
    private MatchServices: MatchService,
  ) { }

  public async getAllMatch(_req: Request, res: Response) {
    const serviceResponse = await this.MatchServices.getAllMatche();
    return res.status(200).json(serviceResponse.messager);
  }
}
