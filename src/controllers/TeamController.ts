import { NextFunction, Request, Response } from 'express';
import teamRepository from '@repositories/teamRepository';
import { FootyEventRepository } from '@repositories/index';

class TeamController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { footyEventId } = req.body;

      const footyEvent = await FootyEventRepository.findById(footyEventId);

      if (!footyEvent) {
        return next({ status: 404, message: 'Pelada não encontrada.' });
      }

      const team = await teamRepository.create(req.body);

      res.locals = {
        status: 201,
        message: 'Time criado com sucesso.',
        data: team,
      };

      return next();
    } catch (error) {
      return next(error);
    }
  }

  async read(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const team = await teamRepository.findById(id);

      if (!team) {
        return next({ status: 404, error: 'Time não encontrado.' });
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
      const teams = await teamRepository.findAllByFootyEvent(id);

      res.locals = {
        status: 200,
        data: teams,
      };

      return next();
    } catch (error) {
      return next();
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const teamData = req.body;

      const updatedTeam = await teamRepository.update(id, teamData);

      res.locals = {
        status: 200,
        message: 'Time atualizado com sucesso.',
        data: updatedTeam,
      };

      return next(updatedTeam);
    } catch (error) {
      return next();
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      await teamRepository.delete(id);

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

export default new TeamController();
