import { NextFunction, Request, Response } from 'express';
import teamRepository from '@repositories/teamRepository';
import { FootyEventRepository } from '@repositories/index';

class TeamController {
    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const teamData = req.body;
            const footyEvent = await FootyEventRepository.findById(teamData.footyEventId);

            if(!footyEvent) {
                return next({status: 404, message: 'Footy event id not found'})
            }

            const team = await teamRepository.create(teamData);

            res.locals = {
                status: 201,
                message: "Time criado com sucesso",
                data: team
            }

            return next();
        } catch (error) {
            return next({status: 400, error: 'Dados inválidos' });
        }
    }

    async read(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const team = await teamRepository.findById(id);

            if (!team) {
                return next({ status: 404, error: 'Time não encontrado.' });
            }

            const response = {
                id: team.id,
                name: team.name,
                victories: team.victories,
                footy_event_id: team.playerFootyEvent[0].footyEvent.id,
                players: team.playerFootyEvent.map((playerFootyEvent) => ({
                    id: playerFootyEvent.player.id,
                    name: playerFootyEvent.player.name,
                    footy_id: playerFootyEvent.player.footy_id,
                    starts: playerFootyEvent.player.starts,
                    type: playerFootyEvent.player.type,
                    created_at: playerFootyEvent.player.created_at,
                    updated_at: playerFootyEvent.player.updated_at,
                })),
            };

            res.locals = {
                status: 200,
                message: "",
                data: response,
            }

            return next();
        } catch (error) {
            return next({status: 500, error: 'Erro ao buscar time.' });
        }
    }

    async readAll(req: Request, res: Response, next: NextFunction) {
        try {
            const { eventId } = req.params;
            const team = await teamRepository.findAll(eventId);

            if (!team) {
                return next({status: 404, error: 'Time não encontrado.' });
            }

            res.locals = {
                status: 200,
                message: "",
                data: team
            }

            return next();
        } catch (error) {
            return next({status: 500, error: 'Erro ao buscar time.' });
        }
    }

    async update(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const teamData = req.body;
            const updatedTeam = await teamRepository.update(id, teamData);

            res.locals = {
                status: 200,
                message: "Time atualizado com sucesso",
                data: updatedTeam
            }

            return next(updatedTeam);
        } catch (error) {
            return next({status: 500, error: 'Erro ao atualizar time.' });
        }
    }

    async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            await teamRepository.delete(id);

            res.locals = {
                status: 200,
                message: "Time deletado com sucesso",
            }

            return next();
        } catch (error) {
            return next({status: 500, error: 'Erro ao excluir time.' });
        }
    }
}

export default new TeamController();