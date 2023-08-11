import { Router } from 'express';

import UserRouter from './UserRoutes';
import AuthRouter from './AuthRoutes';

const router = Router();

router.use('/user', UserRouter);
router.use('/sessions', AuthRouter);
router.route('/').get((req, res) => {
  res.send('Hello World!');
});

export default router;
