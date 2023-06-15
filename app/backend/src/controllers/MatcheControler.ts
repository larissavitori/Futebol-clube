import { Request, Response } from 'express';
import MatchService from '../service/matchService';
import mapStatusHTTP from '../middlewares/mapStatusHttp';

export default class MatchController {
  constructor(
    private MatchServices: MatchService,
  ) { }

  public async getAllMatch(req: Request, res: Response) {
    // pega true e false
    const serviceResponse = await this.MatchServices.getAllMatche();
    const progress = req.query.inProgress;
    // recebe true ou false;
    const serviceProgress = await this.MatchServices.getByQuery(progress as string);

    if (progress === undefined) {
      return res.status(200).json(serviceResponse.messager);
    }
    if (serviceResponse.status !== 'SUCCESSFUL') {
      return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.messager);
    }
    res.status(200).json(serviceProgress.messager);
  }

/*   public async getBookByQuery(req: Request, res: Response) {
    const progress = req.query.inProgress;
    const serviceResponse = await this.MatchServices.getByQuery(progress as unknown as boolean);
    if (serviceResponse.status !== 'SUCCESSFUL') {
      return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.messager);
    }
    res.status(200).json(serviceResponse.messager);
  } */
}
