import { Request, Response, NextFunction } from 'express';
import bcryptjs from 'bcryptjs';
import { FootySchema, UpdateFootySchema } from '@DTOs/Footy';
import { FootyRepository, PlayerRepository } from '../repositories';

class FootyController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const {
        email,
        username,
        name,
        password,
        location,
        start_hour,
        end_hour,
        players_per_team,
        num_of_teams,
        players,
    } = req.body;

      const existsFootyWithUsername = await FootyRepository.findByUsername(
        username,
      );

      if (existsFootyWithUsername) {
        return next({
          status: 400,
          message: 'This username is already registered',
        });
      }

      const existsFootyWithEmail = await FootyRepository.findByEmail(
        email,
      );

      if (existsFootyWithEmail) {
        return next({
          status: 400,
          message: 'This email is already registered',
        });
      }

      const dataWithHashedPassword = {
        email,
        username,
        name,
        location,
        players_per_team,
        num_of_teams,
        end_hour: new Date(end_hour),
        start_hour: new Date(start_hour),
        password: await bcryptjs.hash(password, 6),
      };

      const dataValidated = FootySchema.safeParse(dataWithHashedPassword);

      if (!dataValidated.success) {
        return next({
          status: 400,
          message: dataValidated.error.message,
        });
      }

      const footy = await FootyRepository.create(dataWithHashedPassword);

      const newPlayers = await Promise.all(
        players.map(async (player: any) => {
          const newPlayer = await PlayerRepository.create({
            footy: {
              connect: {
                id: footy.id,
              },
            },
            name: player.name,
            stars: 0,
            type: 'monthly',
          });

          return newPlayer;
        }),
      );

      res.locals = {
        status: 201,
        message: 'Pelada criada com sucesso.',
        data: {...footy, players: newPlayers},
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
