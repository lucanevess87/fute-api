import { NextFunction, Request, Response } from 'express';
import { compare } from 'bcryptjs';

import {
  FootyRepository,
  TokenRepository,
  clearCookies,
  setCookie,
} from '@repositories/index';

class LoginController {
  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { username, password } = req.body;

      const footy = await FootyRepository.findByUsername(username);

      if (!footy) {
        return next({
          status: 400,
          message: 'Credenciais inválidas',
        });
      }

      const checkPassword = await compare(password, footy.password);

      if (!checkPassword) {
        return next({
          status: 400,
          message: 'Credenciais inválidas',
        });
      }

      const tokenRepository = new TokenRepository();
      const accessToken = tokenRepository.generateAccessToken(footy.id, '60s');
      const refreshToken = tokenRepository.generateRefreshToken(footy.id, '5d');

      setCookie(res, 'refresh_token', refreshToken);

      const { password: _,  ...loggedFooty} = footy;

      res.locals = {
        status: 200,
        message: 'Logado com successo.',
        data: {
          loggedFooty,
          accessToken,
        },
      };

      return next();
    } catch (error) {
      return next(error);
    }
  }

  async refresh(req: Request, res: Response, next: NextFunction) {
    try {
      const refreshToken = req.cookies.refresh_token;

      if (!refreshToken) {
        delete req.headers.authorization;

        return next({
          status: 401,
          message: 'Token inválido',
        });
      }

      const tokenRepository = new TokenRepository();
      const decodedRefreshToken =
        tokenRepository.verifyRefreshToken(refreshToken);

      if (!decodedRefreshToken) {
        delete req.headers.authorization;

        return next({
          status: 401,
          message: 'Token inválido',
        });
      }

      const footy = await FootyRepository.findById(decodedRefreshToken.id);

      if (!footy) {
        return next({
          status: 400,
          message: 'Footy não encontrada',
        });
      }

      clearCookies(res, 'refresh_token');

      const newRefreshToken = tokenRepository.generateRefreshToken(
        footy.id,
        '1d',
      );
      const accessToken = tokenRepository.generateAccessToken(footy.id, '30s');

      setCookie(res, 'refresh_token', newRefreshToken);

      const { password: _, ...loggedUser } = footy;

      res.locals = {
        status: 200,
        message: 'Token refreshed',
        data: {
          loggedUser,
          accessToken,
        },
      };

      return next();
    } catch (error) {
      return next(error);
    }
  }

  async logout(req: Request, res: Response, next: NextFunction) {
    try {
      clearCookies(res, 'refresh_token');
      delete req.headers.authorization;

      res.locals = {
        status: 200,
        message: 'Footy deslogada',
      };

      return next();
    } catch (error) {
      return next(error);
    }
  }
}

export default new LoginController();
