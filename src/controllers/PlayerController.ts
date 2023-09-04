import { PlayerRepository } from '@repositories/index';
import { Request, Response, NextFunction } from 'express';

 class PlayerController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const playerData = req.body;

      const player = await PlayerRepository.create(playerData);

      res.locals = {
        status: 201,
        message: 'Player created',
        data: player,
      };

      return next();
    } catch (error) {
      return next(error);
    }
  }

  async readAll(req: Request, res: Response, next: NextFunction) {
    try {
      const players = await PlayerRepository.findAll();

      console.count('readAll');
      console.log(players);

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
      const { playerId } = req.params;

      const player = await PlayerRepository.findById(playerId);

      if (!player) {
        return next({
          status: 404,
          message: 'Player not found'        
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
      const { playerId } = req.params;
      const playerData = req.body;

      const player = await PlayerRepository.update(playerId, playerData);

      if (!player) {
        return next({
          status: 404,
          message: 'Player not found',
        });
      }

      res.locals = {
        status: 200,
        data: player, 
        message: 'Player updated',
      };

      return next();
    } catch (error) {
      return next(error);
    }
  }
  
  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { playerId } = req.params;

      const player = await PlayerRepository.delete(playerId);

      if (!player) {
        return next({
          status: 404,
          message: 'Player no found'
        });
      }

      res.locals = {
        status: 200,
        message: 'Player deleted'
      };

      return next();
    } catch (error) {
      return next(error);
    }
  }
}

 export default new PlayerController();