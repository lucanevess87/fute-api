import { Router } from 'express';
import { StatisticsController } from '../controllers';

const StatisticsRouter = Router();

StatisticsRouter.route('/footy/:footyId').get(StatisticsController.footyStatistics);

StatisticsRouter.route('/footy-event/:footyEventId').get(
  StatisticsController.footyEventStatistics,
);

export default StatisticsRouter;
