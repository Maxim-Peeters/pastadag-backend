import { Request, Response, NextFunction } from 'express';
import { auth } from '../config/firebase';

interface AuthRequest extends Request {
  user?: any;
}

export const protect = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  if (!req.headers.authorization?.startsWith('Bearer ')) {
    res.status(401).json({ message: 'Not authorized, no token' });
    return;
  }

  try {
    const token = req.headers.authorization.split(' ')[1];
    const currentUser = auth.currentUser;
    
    if (!currentUser) {
      res.status(401).json({ message: 'Not authorized, no user found' });
      return;
    }

    req.user = currentUser;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Not authorized, token failed' });
  }
};