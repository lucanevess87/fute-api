import { Request, Response } from 'express';
import { footyeventRepository } from '../repositories';

class TeamController {
    async create(req: Request, res: Response) {
        try {
            const eventData = req.body;
            const event = await footyeventRepository.create(eventData);
            return res.status(201).json(event);
        } catch (error) {
            return res.status(400).json({ error: 'Dados inválidos' });
        }
    }

    async readAll(req: Request, res: Response) {
        try {
            const events = await footyeventRepository.findAll();
            return res.status(200).json(events);
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao buscar eventos específicos de pelada.' });
        }
    }

    async read(req: Request, res: Response) {
        const { eventId } = req.params;

        try {
            const event = await footyeventRepository.findById(eventId);
            if (!event) {
                return res.status(404).json({ error: 'Evento específico de pelada não encontrado.' });
            }
            return res.status(200).json(event);
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao buscar o evento específico de pelada.' });
        }
    }

    async update(req: Request, res: Response) {
        const { eventId } = req.params;
        const eventData = req.body;

        try {
            const updatedEvent = await footyeventRepository.update(eventId, eventData);
            return res.status(200).json(updatedEvent);
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao atualizar o evento específico de pelada.' });
        }
    }

    async delete(req: Request, res: Response) {
        const { eventId } = req.params;

        try {
            const deletedEvent = await footyeventRepository.delete(eventId);
            return res.status(200).json(deletedEvent);
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao excluir o evento específico de pelada.' });
        }
    }
}

export default new TeamController();