import { Request, Router, Response } from 'express';
import LeaderController from '../controllers/LeaderControler';
import MatchService from '../service/leaderService';
// import MatchesModel from '../models/';

// const MatchModel = new MatchesModel();
const service = new MatchService();
const MatchesController = new LeaderController(service);

const router = Router();

router.get('/home', (req: Request, res: Response) => MatchesController.getAllLeader(req, res));

export default router;
