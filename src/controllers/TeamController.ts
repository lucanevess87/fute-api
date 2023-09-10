import { Request, Response } from 'express';
import teamRepository from '@repositories/teamRepository';

class TeamController {
    async create(req: Request, res: Response) {
        try {
            const teamData = req.body;
            const team = await teamRepository.create(teamData);
            return res.status(201).json(team);
        } catch (error) {
            return res.status(400).json({ error: 'Dados inválidos' });
        }
    }

    async read(req: Request, res: Response) {
        const { teamId } = req.params;

        try {
            const team = await teamRepository.findById(teamId);
            if (!team) {
                return res.status(404).json({ error: 'Time não encontrado.' });
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

            return res.status(200).json(response);
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao buscar time.' });
        }
    }

    async readAll(req: Request, res: Response) {
        const { eventId } = req.params;

        try {
            const team = await teamRepository.findAll(eventId);
            if (!team) {
                return res.status(404).json({ error: 'Time não encontrado.' });
            }
            return res.status(200).json(team);
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao buscar time.' });
        }
    }

    async update(req: Request, res: Response) {
        const { teamId } = req.params;
        const teamData = req.body;

        try {
            const updatedTeam = await teamRepository.update(teamId, teamData);
            return res.status(200).json(updatedTeam);
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao atualizar time.' });
        }
    }

    async delete(req: Request, res: Response) {
        const { teamId } = req.params;

        try {
            const deletedTeam = await teamRepository.delete(teamId);
            return res.status(200).json(deletedTeam);
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao excluir time.' });
        }
    }
}

export default new TeamController();