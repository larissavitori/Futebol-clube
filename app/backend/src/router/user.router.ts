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

router.get('/role', validLogin.validateToken, (req, res) => UserController.findAllRole(req, res));

export default router;
