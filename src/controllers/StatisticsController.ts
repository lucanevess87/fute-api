import { Request, Response, NextFunction } from 'express';
import { TeamPlayerRepository } from '../repositories';

class FootyController {
  async footyStatistics(req: Request, res: Response, next: NextFunction) {
    try {
      const { footyId } = req.params;

      const teamPlayers = await TeamPlayerRepository.findByFootyId(footyId);

      const statistics = teamPlayers.map(({ goals, assists, player }) => ({
        goals: goals ?? 0,
        assists: assists ?? 0,
        playerName: player.name,
      }));

      res.locals = {
        status: 200,
        data: statistics,
      };

      return next();
    } catch (error) {
      return next(error);
    }
  }

  async footyEventStatistics(req: Request, res: Response, next: NextFunction) {
    try {
      const { footyEventId } = req.params;

      const teamPlayers = await TeamPlayerRepository.findByFootyEventId(
        footyEventId,
      );

      const teamsIndexedById = Object.fromEntries(
        teamPlayers.map(({ team }) => [team.id, team]),
      );
      const teams = Object.values(teamsIndexedById);

      const teamPlayersGroupedByTeam = teams.map((team) => {
        const players = teamPlayers
          .filter((player) => player.team.id === team.id)
          .map(({ goals, assists, player }) => ({
            goals: goals ?? 0,
            assists: assists ?? 0,
            playerName: player.name,
          }));

        return {
          id: team.id,
          name: team.name,
          players,
        };
      });

      res.locals = {
        status: 200,
        data: teamPlayersGroupedByTeam,
      };

      return next();
    } catch (error) {
      return next(error);
    }
  }
}

export default new FootyController();
