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

  /*   public async getMatchById(req: Request, res: Response) {
    const { id } = req.params;

    const serviceResponse = await this.MatchServices.getMatchById(Number(id));

    if (serviceResponse.status !== 'SUCCESSFUL') {
      return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.messager);
    }

    res.status(200).json(serviceResponse.messager);
  }
 */
  public async update(req: Request, res: Response): Promise<Response> {
    const id = Number(req.params.id);
    const serviceResponse = await this.MatchServices.update(id);
    return res.status(200).json(serviceResponse);
  }
}
