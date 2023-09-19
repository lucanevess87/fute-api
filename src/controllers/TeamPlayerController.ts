import { NextFunction, Request, Response } from 'express';
import {
  TeamPlayerRepository,
  TeamRepository,
  PlayerRepository,
} from '@repositories/index';

class TeamPlayerController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { teamId, playerId } = req.body;

      const team = await TeamRepository.findById(teamId);

      if (!team) {
        return next({
          status: 404,
          message: 'Time não encontrado.',
        });
      }

      const player = await PlayerRepository.findById(playerId);

      if (!player) {
        return next({
          status: 404,
          message: 'Jogador não encontrado.',
        });
      }

      const teamPlayer = await TeamPlayerRepository.create(req.body);

      res.locals = {
        status: 201,
        message: 'Jogador criado com sucesso.',
        data: teamPlayer,
      };

      return next();
    } catch (error) {
      return next(error);
    }
  }

  async read(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const team = await TeamPlayerRepository.findById(id);

      if (!team) {
        return next({ status: 404, error: 'Jogador não encontrado.' });
      }

      res.locals = {
        status: 200,
        data: team,
      };

      return next();
    } catch (error) {
      return next(error);
    }
  }

  async readAllByFootyEvent(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const teams = await TeamPlayerRepository.findByFootyEventId(id);

      res.locals = {
        status: 200,
        data: teams,
      };

      return next();
    } catch (error) {
      return next(error);
    }
  }

  async readAllByFooty(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const teams = await TeamPlayerRepository.findByFootyId(id);

      res.locals = {
        status: 200,
        data: teams,
      };

      return next();
    } catch (error) {
      return next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const teamData = req.body;

      const updatedTeam = await TeamPlayerRepository.update(id, teamData);

      res.locals = {
        status: 200,
        message: 'Jogador atualizado com sucesso.',
        data: updatedTeam,
      };

      return next();
    } catch (error) {
      return next();
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      await TeamPlayerRepository.delete(id);

      res.locals = {
        status: 200,
        message: 'Time deletado com sucesso.',
      };

      return next();
    } catch (error) {
      return next(error);
    }
  }
}

export default new TeamPlayerController();
