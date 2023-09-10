import { Router } from 'express';
import auth from '../middlewares/auth';
import { FootyController, FootyEventController } from '../controllers';

const eventRouter = Router();

eventRouter.route('/')
    .post(
        [auth],
        FootyEventController.create,
    );

eventRouter.route('/:id')
    .get(
        FootyController.read,
        FootyEventController.readAllByFooty,
    )
    .get(
        FootyEventController.read,
    )
    .patch(
        [auth],
        FootyEventController.read,
        FootyEventController.update,
    )
    .delete(
        [auth],
        FootyEventController.read,
        FootyEventController.delete,
    );

export default eventRouter;