import { Router } from 'express';
import {
  FootyController,
  FootyEventController,
  TeamPlayerController,
} from '../controllers';
import auth from '../middlewares/auth';

const teamPlayerRouter = Router();

teamPlayerRouter.route('/').post(TeamPlayerController.create);

teamPlayerRouter
  .route('/allByFoot/:id')
  .get(FootyController.read, TeamPlayerController.readAllByFooty);

teamPlayerRouter
  .route('/allByFootyEvent/:id')
  .get(FootyEventController.read, TeamPlayerController.readAllByFootyEvent);

teamPlayerRouter
  .route('/:id')
  .get(TeamPlayerController.read)
  .patch([auth], TeamPlayerController.read, TeamPlayerController.update)
  .delete([auth], TeamPlayerController.read, TeamPlayerController.delete);

export default teamPlayerRouter;
