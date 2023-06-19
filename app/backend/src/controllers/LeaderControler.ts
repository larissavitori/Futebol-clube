import { Request, Response } from 'express';
// import MatchService from '../service/matchService';
import leaderService from '../service/leaderService';
// import mapStatusHTTP from '../middlewares/mapStatusHttp';

export default class MatchController {
  constructor(
    private MatchServices: leaderService,
  ) { }

  public async getAllLeader(req: Request, res: Response) {
    const serviceResponse = await this.MatchServices.getAllLeader();
    // const serviceProgress = await this.MatchServices.getByQuery('false');

    /*  if (serviceResponse !== 'SUCCESSFUL') {
      return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse);
    } */
    res.status(200).json(serviceResponse);
  }
}
