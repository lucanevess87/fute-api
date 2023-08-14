import { Router } from 'express';
import FootyRouter from './FootyRoutes';
import AuthRouter from './AuthRoutes';

const router = Router();

router.use('/footy', FootyRouter);
router.use('/sessions', AuthRouter);
router.route('/').get((req, res) => {
  res.send('Hello World!');
});

export default router;
