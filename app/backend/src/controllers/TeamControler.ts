import { Request, Response } from 'express';
// import { ServiceResponse } from '../Interfaces/ServiceResponse';
import TeamService from '../service/TeamService';

export default class teamController {
  constructor(
    private TeamServices: TeamService,
  ) { }

  public async getAllteams(_req: Request, res: Response) {
    const serviceResponse = await this.TeamServices.getAllteams();
    return res.status(200).json(serviceResponse.messager);
  }

  public async getteamsById(req: Request, res: Response) {
    const { id } = req.params;

    const serviceResponse = await this.TeamServices.getteamById(Number(id));

    /*  if (serviceResponse.status !== 'SUCCESSFUL') {
        return res.status((ServiceResponse.status)).json(serviceResponse.messager);
      } */

    res.status(200).json(serviceResponse.messager);
  }
}
