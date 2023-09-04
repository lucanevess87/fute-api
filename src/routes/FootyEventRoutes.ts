import { Router } from 'express';
import auth from '../middlewares/auth';
import { FootyEventController } from '../controllers';

const eventRouter = Router();

eventRouter.route('/')
    .post(
        [auth],
        FootyEventController.create,
    );

eventRouter.route('/')
    .get(
        FootyEventController.readAll,
    );

eventRouter.route('/:eventId')
    .get(
        FootyEventController.read,
    );

eventRouter.route('/:eventId')
    .patch(
        [auth],
        FootyEventController.update,
    );

eventRouter.route('/:eventId')
    .delete(
        [auth],
        FootyEventController.delete,
    );

export default eventRouter;