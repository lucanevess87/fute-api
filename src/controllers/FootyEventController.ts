import { NextFunction, Request, Response } from 'express';
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

            // logica do sorteio

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

            res.locals = {
                status: 200,
                data: event,
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
