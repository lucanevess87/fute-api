import { NextFunction, Request, Response } from 'express';
import { Player, Team } from '@prisma/client';
import {
  FootyEventRepository,
  FootyRepository,
  TeamRepository,
  PlayerRepository,
  TeamPlayerRepository,
} from '../repositories';

// create
// read all by footy
// read by footy eventId
// delete

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
          message: 'Footy não encontrada',
        });
      }

      const footyEvent = await FootyEventRepository.create({
        footy: { connect: {id: footyId} },
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
        (acc: {existingPlayers: Player[]; playersToCreate: Player[] }, player: Player) => {
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
        sortedTeams.map(async (team: Team & {players: Player[]}) => {
          const teamPlayers = await Promise.all(
            team.players.map(async (player: Player) => {
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

      res.locals = {
        status: 200,
        message: 'Jogo criado com sucesso.',
        data: createdFootyEvent,
      };

      return next();
    } catch (error) {
      console.log(error)
      return next(error);
    }
  }

  async readAllByFooty(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const events = await FootyEventRepository.findAll(id);

      res.locals = {
        status: 200,
        data: events,
      };

      return next();
    } catch (error) {
      return next(error);
    }
  }

  async read(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;

    try {
      const event = await FootyEventRepository.findById(id);

      if (!event) {
        return next({
          status: 400,
          error: 'Evento específico de pelada não encontrado.',
        });
      }

      res.locals = {
        status: 200,
        data: event,
      };

      return next();
    } catch (error) {
      return next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const eventData = req.body;

    try {
      const updatedEvent = await FootyEventRepository.update(id, eventData);

      res.locals = {
        status: 200,
        data: updatedEvent,
        message: 'Evento autalizado',
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
      return next();
    } catch (error) {
      return next(error);
    }
  }
}

export default new FootyEventController();
