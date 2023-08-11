import { NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';
import { HttpException } from './index';

const errorHandler = (
  error: HttpException,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  res.locals.status = error.status;
  res.locals.message = error.message;
  if (error instanceof ZodError) {
    res.locals.status = 400;
    res.locals.message = error.issues[0].message;
  }

  return next();
};

export default errorHandler;
