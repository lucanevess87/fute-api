import TokenRepository from '@repositories/tokenRepository';
import { Request, Response, NextFunction } from 'express';

export default async function auth(req: Request, res: Response, next: NextFunction) {
  try {
    const authToken = req.headers.authorization;

    if (!authToken) {
      next({
        status: 401,
        message: 'Unauthorized.',
      });
    } else {
      const [, token] = authToken.split(' ');
      const tokenRepository = new TokenRepository();

      tokenRepository.verifyAccessToken(token);
      next();
    }
  } catch (error: any) {
    res.status(401).send({ error: error.message });
  }
}
