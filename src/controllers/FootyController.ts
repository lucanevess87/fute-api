import { Request, Response, NextFunction } from 'express';
import { hash } from 'bcryptjs';
import { Footy } from '@prisma/client';
import { FootySchema } from '@DTOs/Footy';
import { FootyRepository } from '../repositories';

class FootyController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const data: Footy = req.body;

      const existsFootyWithUsername = await FootyRepository.findByUsername(
        data.username,
      );

      const existsFootyWithEmail = await FootyRepository.findByEmail(
        data.email,
      )

      if (existsFootyWithUsername) {
        return next({
          status: 400,
          message: 'This username is already registered',
        });
      }

      if (existsFootyWithEmail) {
        return next({
          status: 400,
          message: 'This email is already registered',
        });
      }

      const dataWithHashedPassword: Footy = {
        ...data,
        password: await hash(data.password, 6),
      };

      const dataValidated = FootySchema.safeParse(dataWithHashedPassword)

      if (!dataValidated.success) {
        return next({
          status: 400,
          message: dataValidated.error.message,
        });
      }

    const footy = await FootyRepository.create(dataWithHashedPassword);

    res.locals = {
      status: 201,
      message: "Footy criado com sucesso.",
      data: footy,
    };

      return next();
    } catch (error) {
      return next(error);
    }
  }

  async readAll(req: Request, res: Response, next: NextFunction) {
    try {
      const { name } = req.params;
      const footies = await FootyRepository.findAll({name: name as string | undefined});

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

      const dataValidated = FootySchema.safeParse(data)

      if (!dataValidated.success) {
        return next({
          status: 400,
          message: dataValidated.error.message,
        });
      }

      const footy = await FootyRepository.update(id, data);
      
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

      await FootyRepository.delete(id);

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
