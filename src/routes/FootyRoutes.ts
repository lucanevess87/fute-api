import { Router } from 'express';
import auth from '../middlewares/auth';
import { FootyController } from '../controllers';

const footyRouter = Router();

footyRouter.route('/').post(FootyController.create);

footyRouter.route('/').get(FootyController.readAll);

footyRouter
  .route('/:id')
  .get(FootyController.read)
  .patch([auth], FootyController.read, FootyController.update)
  .delete([auth], FootyController.read, FootyController.delete);

export default footyRouter;
