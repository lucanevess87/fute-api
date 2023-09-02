import { Router } from 'express';
import auth from '../middlewares/auth';
import { FootyController } from '../controllers';

const footyRouter = Router();

footyRouter.route('/')
  .post(
    FootyController.create,
  );

footyRouter.route('/')
  .get(
    FootyController.readAll,
  );

footyRouter.route('/:id')
  .get(
    FootyController.read,
  );

footyRouter.route('/:id')
  .patch(
    [auth],
    FootyController.update,
  );

footyRouter.route('/:id')
  .delete(
    [auth],
    FootyController.delete,
  );

export default footyRouter;
