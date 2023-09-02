import { Router } from 'express';
import auth from '../middlewares/auth';
import { PlayerController } from '../controllers';

const playerRouter = Router();

playerRouter.route('/')
  .post(
    PlayerController.create,
  );

playerRouter.route('/')
  .get(
    PlayerController.readAll,
  );

playerRouter.route('/:id')
 .get(
    PlayerController.read,
 )

playerRouter.route('/:id')
  .patch(
    [auth],
    PlayerController.update,
  );

playerRouter.route('/:id')
  .delete(
    [auth], 
    PlayerController.delete,
  );

export default playerRouter;
