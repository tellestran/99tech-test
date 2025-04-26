
import { Request, Response, NextFunction } from 'express';
import { data } from '../data/data';
export const getAllUsers = (req: Request, res: Response, next: NextFunction) => {
  try {
    res.json(data);
  } catch (error) {
    next(error);
  }
};
