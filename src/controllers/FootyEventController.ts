import { NextFunction, Request, Response } from 'express';
import { DrawTeamsParams, GroupedEvent, GroupedTeam, Team } from 'src/types/FootyEventTypes';
import { FootyEventRepository, FootyRepository } from '../repositories';

class FootyEventController {
    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const eventData = req.body;

            const footyId = await FootyRepository.findById(eventData.footyId);

            if(!footyId) {
                return next({
                    error: 400,
                    message: "Footy não encontrada"
                })
            }

            const drawTeams = ({players, teamCount, playersPerTeam} : DrawTeamsParams): Team[] => {
                const sortedPlayers = [...players].sort((a, b) => b.stars - a.stars);
              
                const teams: Team[] = Array.from({ length: teamCount }, () => ({
                  players: [],
                }));
              
                const iterations = Array.from({ length: playersPerTeam });
              
                iterations.forEach(() => {
                  teams.forEach(() => {
                    if (sortedPlayers.length === 0) return;
              
                    const lowestStarTeam = teams.reduce((lowest, currentTeam) => {
                      const sumStars = currentTeam.players.reduce((sum, p) => sum + p.stars, 0);
                      return sumStars < lowest.sum ? { team: currentTeam, sum: sumStars } : lowest;
                    }, { team: teams[0], sum: Infinity }).team;
              
                    lowestStarTeam.players.push(sortedPlayers[0]);
                    sortedPlayers.shift();
                  });
                });

                return teams;
            };

            const sortedTeams = drawTeams({
                players: eventData.players,
                playersPerTeam: eventData.playersPerTeam,
                teamCount: eventData.teamCount
            })

            console.log(sortedTeams)

            const event = await FootyEventRepository.create(eventData);

            res.locals = {
                status: 200,
                message: "Footy evento criado com sucesso",
                data: event,
            }
            return next();
        } catch (error) {
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
            }

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
                return next({status: 400, error: 'Evento específico de pelada não encontrado.' });
            }

            const groupedEvent: GroupedEvent = {
                ...event,
                teams: event.playerFootyEvent.reduce<GroupedTeam[]>((acc, pfe) => {
                  const teamId = pfe.team.id;
                  const existingTeam = acc.find(team => team.id === teamId);
              
                  if (existingTeam) {
                    existingTeam.players.push({
                      player: pfe.player,
                      assists: pfe.assists ?? 0,
                      goals: pfe.goals ?? 0,
                    });
                  } else {
                    acc.push({
                      id: teamId,
                      name: pfe.team.name,
                      victories: 0,
                      players: [
                        {
                          player: pfe.player,
                          assists: pfe.assists ?? 0,
                          goals: pfe.goals ?? 0,
                        },
                      ],
                    });
                  }
              
                  return acc;
                }, []),
              };

            res.locals = {
                status: 200,
                data: groupedEvent,
            }

            return next()
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
                message: "Evento autalizado"
            }

            return next();
        } catch (error) {
            return next(error);
        }
    }

    async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            await FootyEventRepository.delete(id);
            return next()
        } catch (error) {
            return next(error);
        }
    }
}

export default new FootyEventController();
