import { Request, Router, Response } from 'express';
import TeamController from '../controllers/TeamControler';
import TeamService from '../service/TeamService';
import TeamModel from '../models/TeamsModel';

const teamsModel = new TeamModel();
const service = new TeamService(teamsModel);
const teamsController = new TeamController(service);

const router = Router();

router.get('/', (req: Request, res: Response) => teamsController.getAllteams(req, res));
router.get('/:id', (req: Request, res: Response) => teamsController.getteamsById(req, res));

export default router;
