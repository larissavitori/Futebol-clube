import { Request, Router, Response } from 'express';
import MatchController from '../controllers/MatcheControler';
import MatchService from '../service/matchService';
import MatchesModel from '../models/matchesModel';

const MatchModel = new MatchesModel();
const service = new MatchService(MatchModel);
const MatchesController = new MatchController(service);

const router = Router();

router.get('/', (req: Request, res: Response) => MatchesController.getAllMatch(req, res));

export default router;
