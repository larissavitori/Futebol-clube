import { Request, Router, Response } from 'express';
import teamController from '../controllers/teamControler';
import teamService from '../service/TeamService';
import teamModel from '../models/teamsModel';

const teamsModel = new teamModel();
const service = new teamService(teamsModel);
const teamsController = new teamController(service);

const router = Router();


router.get('/', (req: Request, res: Response) => teamsController.getAllBooks (req, res));
router.get('/:id', (req: Request, res: Response) => teamsController.getBookById(req, res));

export default router;