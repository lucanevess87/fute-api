import { Router } from 'express';
import FootyRouter from './FootyRoutes';
import AuthRouter from './AuthRoutes';
import FootyEventRoutes from './FootyEventRoutes';
import PlayerRoutes from './PlayerRoutes';
import TeamPlayerRoutes from './TeamPlayerRoutes';
import TeamRoutes from './TeamRoutes';
import StatisticsRoutes from './StatisticsRoutes';

const router = Router();

router.use('/footy', FootyRouter);
router.use('/auth', AuthRouter);
router.use('/footy-event', FootyEventRoutes);
router.use('/team', TeamRoutes);
router.use('/player', PlayerRoutes);
router.use('/team-player', TeamPlayerRoutes);
router.use('/statistics', StatisticsRoutes);
router.route('/').get((req, res) => {
  res.send('Hello World!');
});

export default router;
