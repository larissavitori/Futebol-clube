import { Router } from 'express';
import UserController from '../controllers/UserControler';
import validLogin from '../middlewares/validLogin';

const userController = new UserController();

const router = Router();

router.post(
  '/',
  validLogin.validateCampos,
  validLogin.validateLogin,
  (req, res) => userController.login(req, res),
);

export default router;
