import { Request, Response, NextFunction } from 'express';
import bcryptjs from 'bcryptjs';
import { Footy } from '@prisma/client';
import { FootySchema, UpdateFootySchema } from '@DTOs/Footy';
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
      );

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
        end_hour: new Date(data.end_hour),
        start_hour: new Date(data.start_hour),
        password: await bcryptjs.hash(data.password, 6),
      };

      const dataValidated = FootySchema.safeParse(dataWithHashedPassword);

      if (!dataValidated.success) {
        return next({
          status: 400,
          message: dataValidated.error.message,
        });
      }

      const footy = await FootyRepository.create(dataWithHashedPassword);

      res.locals = {
        status: 201,
        message: 'Footy criado com sucesso.',
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
      const footies = await FootyRepository.findAll({
        name: name as string | undefined,
      });

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

      const dataValidated = UpdateFootySchema.safeParse({
        ...data,
        start_hour: new Date(data.start_hour),
        end_hour: new Date(data.end_hour),
      });

      if (!dataValidated.success) {
        return next({
          status: 400,
          message: dataValidated.error.message,
        });
      }

      const footy = await FootyRepository.update(id, {
        name: data.name,
        location: data.location,
        start_hour: data.start_hour,
        end_hour: data.end_hour,
        players_per_team: data.players_per_team,
        num_of_teams: data.num_of_teams,
        players: data.players,
      });

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
