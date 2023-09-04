import { Router } from 'express';
import TeamController from '@controllers/TeamController';
import auth from '../middlewares/auth';

const teamRoutes = Router();

teamRoutes.route('/')
  .post(
    TeamController.create,
  );

teamRoutes.route('/')
  .get(
    TeamController.readAll,
  );

teamRoutes.route('/:id')
  .get(
    TeamController.read,
  );

teamRoutes.route('/:id')
  .patch(
    [auth],
    TeamController.update,
  );

teamRoutes.route('/:id')
  .delete(
    [auth],
    TeamController.delete,
  );

export default teamRoutes;