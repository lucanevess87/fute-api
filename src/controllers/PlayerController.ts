import { FootyRepository, PlayerRepository } from '@repositories/index';
import { Request, Response, NextFunction } from 'express';

class PlayerController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { footy: footyId } = req.body;

      const footy = await FootyRepository.findById(footyId);

      if (!footy) {
        return next({ status: 404, message: 'Pelada não encontrada.' });
      }

      const player = await PlayerRepository.create({
        ...req.body,
        footy: {
          connect: {
            id: footyId,
          },
        },
      });

      res.locals = {
        status: 201,
        message: 'Jogador criado com sucesso.',
        data: player,
      };

      return next();
    } catch (error) {
      return next(error);
    }
  }

  async readAllByFooty(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const players = await PlayerRepository.findAllByFooty(id);

      res.locals = {
        status: 200,
        data: players,
      };

      return next();
    } catch (error) {
      return next(error);
    }
  }

  async read(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const player = await PlayerRepository.findById(id);

      if (!player) {
        return next({
          status: 404,
          message: 'Jogador não encontrado.',
        });
      }

      res.locals = {
        status: 200,
        data: player,
      };

      return next();
    } catch (error) {
      return next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const playerData = req.body;

      const player = await PlayerRepository.update(id, playerData);

      res.locals = {
        status: 200,
        data: player,
        message: 'Jogador atualizado com sucesso.',
      };

      return next();
    } catch (error) {
      return next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      await PlayerRepository.delete(id);

      res.locals = {
        status: 200,
        message: 'Jogador deletado com sucesso.',
      };

      return next();
    } catch (error) {
      return next(error);
    }
  }
}

export default new PlayerController();
