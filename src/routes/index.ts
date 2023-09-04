import { Router } from 'express';
import FootyRouter from './FootyRoutes';
import AuthRouter from './AuthRoutes';
import FootyEventRoutes from './FootyEventRoutes';
import PlayerRoutes from './PlayerRoutes';
import TeamRoutes from './TeamRoutes';

const router = Router();

router.use('/footy', FootyRouter);
router.use('/sessions', AuthRouter);
router.use('/footy-event', FootyEventRoutes);
router.use('/team', TeamRoutes);
router.use('/player', PlayerRoutes);
router.route('/').get((req, res) => {
  res.send('Hello World!');
});

export default router;
