import { NextFunction, Request, Response } from 'express';
import { Team } from '@prisma/client';
import {
  FootyEventRepository,
  FootyRepository,
  TeamRepository,
  PlayerRepository,
  TeamPlayerRepository,
} from '../repositories';

class FootyEventController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const {
        footyId,
        players,
        playersPerTeam,
        numberOfTeams,
        startHour,
        endHour,
      } = req.body;

      const footy = await FootyRepository.findById(footyId);

      if (!footy) {
        return next({
          error: 400,
          message: 'Pelada não encontrada.',
        });
      }

      const footyEvent = await FootyEventRepository.create({
        footy: { connect: { id: footyId } },
        start_hour: new Date(startHour),
        end_hour: new Date(endHour),
      });

      const teams: any[] = await Promise.all(
        Array.from({ length: numberOfTeams }).map(async (_, index) => {
          const team = await TeamRepository.create({
            footyEvent: {
              connect: {
                id: footyEvent.id,
              },
            },
            victories: 0,
            name: `${footy.name} - Time ${index + 1}`,
          });

          return {
            ...team,
            players: [],
          };
        }),
      );

      const { existingPlayers, playersToCreate } = players.reduce(
        (acc, player) => {
          if (player.id) acc.existingPlayers.push(player);
          else acc.playersToCreate.push(player);

          return acc;
        },
        {
          existingPlayers: [],
          playersToCreate: [],
        },
      );

      const newPlayers = await Promise.all(
        playersToCreate.map(async (player: any) => {
          const newPlayer = await PlayerRepository.create({
            footy: {
              connect: {
                id: footyId,
              },
            },
            name: player.name,
            stars: 0,
            type: 'daily',
          });

          return newPlayer;
        }),
      );

      const allPlayers = [...existingPlayers, ...newPlayers];

      const balanceTeams = () => {
        const sortedPlayers = allPlayers.sort((a, b) => b.stars - a.stars);

        sortedPlayers.forEach((player, index) => {
          const teamIndex = index % numberOfTeams;

          const team = teams[teamIndex];

          if (team.players.length < playersPerTeam) {
            team.players.push(player);
          } else {
            const nextTeamIndex = (teamIndex + 1) % numberOfTeams;
            const nextTeam = teams[nextTeamIndex];

            nextTeam.players.push(player);
          }
        });

        return teams;
      };

      const sortedTeams = balanceTeams();

      await Promise.all(
        sortedTeams.map(async (team) => {
          const teamPlayers = await Promise.all(
            team.players.map(async (player) => {
              const teamPlayer = await TeamPlayerRepository.create({
                player: {
                  connect: {
                    id: player.id,
                  },
                },
                team: {
                  connect: {
                    id: team.id,
                  },
                },
              });

              return teamPlayer;
            }),
          );

          return teamPlayers;
        }),
      );

      const createdFootyEvent = await FootyEventRepository.findById(
        footyEvent.id,
      );

      const {
        footy: createdFooty,
        teams: createdTeams,
        ...createdFootyEventData
      } = createdFootyEvent;

      const formattedTeams = createdTeams.map((team) => {
        const { teamPlayer: teamPlayers, ...teamData } = team;
        const footyEventPlayers = teamPlayers.map((teamPlayer) => {
          const { goals, assists, player } = teamPlayer;

          return {
            ...player,
            goals: goals ?? 0,
            assists: assists ?? 0,
          };
        });

        return {
          ...teamData,
          players: footyEventPlayers,
        };
      });

      res.locals = {
        status: 200,
        message: 'Jogo criado com sucesso.',
        data: {
          ...createdFootyEventData,
          footy: createdFooty,
          teams: formattedTeams,
        },
      };

      return next();
    } catch (error) {
      console.log(error);

      return next(error);
    }
  }

  async readAllByFooty(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const footyEvents = await FootyEventRepository.findAll(id);

      res.locals = {
        status: 200,
        data: footyEvents,
      };

      return next();
    } catch (error) {
      return next(error);
    }
  }

  async read(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const footyEvent = await FootyEventRepository.findById(id);

      if (!footyEvent) {
        return next({
          status: 400,
          error: 'Evento não encontrado.',
        });
      }

      res.locals = {
        status: 200,
        data: footyEvent,
      };

      return next();
    } catch (error) {
      return next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const { start_hour, end_hour, footy_id } = req.body;

      const updatedEvent = await FootyEventRepository.update(id, {
        end_hour,
        start_hour,
        footy: {
          connect: {
            id: footy_id,
          },
        },
      });

      res.locals = {
        status: 200,
        data: updatedEvent,
        message: 'Evento atualizado com sucesso.',
      };

      return next();
    } catch (error) {
      return next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      await FootyEventRepository.delete(id);

      res.locals = {
        status: 200,
        message: 'Evento deletado com sucesso.',
      };

      return next();
    } catch (error) {
      return next(error);
    }
  }
}

export default new FootyEventController();
