import { Router } from 'express';
import TeamController from '@controllers/TeamController';
import auth from '../middlewares/auth';

const teamRoutes = Router();

teamRoutes.route('/').post(TeamController.create);

teamRoutes.route('/all/:id').get(TeamController.readAllByFootyEvent);

teamRoutes
  .route('/:id')
  .get(TeamController.read)
  .patch([auth], TeamController.read, TeamController.update)
  .delete([auth], TeamController.read, TeamController.delete);

export default teamRoutes;
