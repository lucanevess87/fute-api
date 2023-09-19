import { Router } from 'express';
import { StatisticsController } from '../controllers';

const StatisticsRouter = Router();

StatisticsRouter.route('/footy').get(StatisticsController.footyStatistics);

StatisticsRouter.route('/footy-event').get(
  StatisticsController.footyEventStatistics,
);

export default StatisticsRouter;
