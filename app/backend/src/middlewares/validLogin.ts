import { NextFunction, Request, Response } from 'express';
import JWT from './JWT';

const mess = 'All fields must be filled';
class ValidLogin {
  static validateCampos(req: Request, res: Response, next: NextFunction): Response | void {
    const { email, password } = req.body;
    if (!email) {
      return res.status(400).json({ message: mess });
    }
    if (!password) return res.status(400).json({ message: mess });
    next();
  }

  static validateLogin(req: Request, res: Response, next: NextFunction): Response | void {
    const login = req.body;
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailRegex.test(login.email)) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    if (login.password.length < 6) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    next();
  }

  static async validateToken(req: Request, res: Response, next: NextFunction):
  Promise<Response | void> {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ message: 'Token not found' });
    }
    const validToken = await JWT.verify(token);
    if (validToken === 'Token must be a valid token') {
      return res.status(401).json({ message: 'Token must be a valid token' });
    }
    next();
  }
}

export default ValidLogin;
