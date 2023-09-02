import { Router } from 'express';
import auth from '../middlewares/auth';
import { FootyController } from '../controllers';

const footyRouter = Router();

footyRouter.route('/')
  .post(
    FootyController.create,
  );

footyRouter.route('/:userId')
  .get(
    FootyController.read,
  );

footyRouter.route('/:userId')
  .patch(
    [auth],
    FootyController.update,
  );

footyRouter.route('/:userId')
  .delete(
    [auth],
    FootyController.delete,
  );

export default footyRouter;
