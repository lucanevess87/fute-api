import express, { Express } from 'express';
import swaggerUi from 'swagger-ui-express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import expressWinston from 'express-winston';
import routes from './routes';
import swaggerDocument from './docs';

const app: Express = express();

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000',
}));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

expressWinston.requestWhitelist.push('body');
expressWinston.responseWhitelist.push('body');
app.use(routes);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

export default app;
