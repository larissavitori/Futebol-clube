import { Router } from 'express';
import teamRouter from '../router/team.routes'
const router = Router();

router.use('/teams', teamRouter);


export default router;
