import { Request, Response } from 'express';

const requestHandler = (req: Request, res: Response) => {
  console.count('requestHandler');
  console.log(res.locals);
  res.status(res.locals.status).json({ data: res.locals.data, message: res.locals.message });
};

export default requestHandler;
