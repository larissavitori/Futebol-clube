import { Request, Router, Response } from 'express';
import MatchController from '../controllers/MatcheControler';
import MatchService from '../service/matchService';
import MatchesModel from '../models/matchesModel';
import ValidLogin from '../middlewares/validLogin';

const MatchModel = new MatchesModel();
const service = new MatchService(MatchModel);
const MatchesController = new MatchController(service);

const router = Router();

router.get('/', (req: Request, res: Response) => MatchesController.getAllMatch(req, res));
router.patch(
  '/:id/finish',
  ValidLogin.validateToken,
  (req: Request, res: Response) => MatchesController.update(req, res),
);
router.patch(
  '/:id',
  ValidLogin.validateToken,
  (req: Request, res: Response) => MatchesController.getMatchById(req, res),
);
export default router;
