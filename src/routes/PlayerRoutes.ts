import { Router } from 'express';
import { FootyController, PlayerController } from '../controllers';
import auth from '../middlewares/auth';

const playerRouter = Router();

playerRouter.route('/')
  .post(
    PlayerController.create,
  );

playerRouter.route('/all/:id')
  .get(
    FootyController.read,
    PlayerController.readAllByFooty,
  );

playerRouter.route('/:id')
 .get(
    PlayerController.read,
 )
 .patch(
  [auth],
  PlayerController.read,
  PlayerController.update,
)
.delete(
  [auth],
  PlayerController.read,
  PlayerController.delete,
);

export default playerRouter;
