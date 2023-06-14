import { Router } from 'express';
import teamRouter from './team.router';
import userRouter from './user.router';
import MatchRouter from './match.router';

const router = Router();

router.use('/teams', teamRouter);
router.use('/login', userRouter);
router.use('/matches', MatchRouter);

export default router;
