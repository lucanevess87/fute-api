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