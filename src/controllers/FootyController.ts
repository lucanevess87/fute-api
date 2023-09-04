import { Request, Response, NextFunction } from 'express';
import { hash } from 'bcryptjs';
import { FootyRepository } from '../repositories';

class FootyController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const data = req.body;

      const existsFootyWithEmail = await FootyRepository.findByEmail(
        data.email,
      );

      if (existsFootyWithEmail) {
        return next({
          status: 400,
          message: 'This email is already registred',
        });
      }

      const dataWithHashedPassword = {
        ...data,
        password: await hash(data.password, 6),
      };

      const footy = await FootyRepository.create(dataWithHashedPassword);

      res.locals = {
        status: 201,
        message: 'Footy created',
        data: footy,
      };

      return next({  });
    } catch (error) {
      return next(error);
    }
  }

  async readAll(req: Request, res: Response, next: NextFunction) {
    try {
      const footies = await FootyRepository.findAll();

      res.locals = {
        status: 200,
        data: footies,
      };

      return next();
    } catch (error) {
      return next(error);
    }
  }

  async read(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const footy = await FootyRepository.findById(id);

      if (!footy) {
        return next({
          status: 404,
          message: 'Footy not found',
        });
      }

      res.locals = {
        status: 200,
        data: footy,
      };

      return next();
    } catch (error) {
      return next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const data = req.body;

      const footy = await FootyRepository.update(id, data);

      if (!footy) {
        return next({
          status: 404,
          message: 'Footy not found',
        });
      }

      res.locals = {
        status: 200,
        data: footy,
        message: 'Footy updated',
      };

      return next();
    } catch (error) {
      return next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const footy = await FootyRepository.delete(id);

      if (!footy) {
        return next({
          status: 404,
          message: 'Footy not found',
        });
      }

      res.locals = {
        status: 200,
        message: 'Footy deleted',
      };

      return next();
    } catch (error) {
      return next(error);
    }
  }
}

export default new FootyController();
