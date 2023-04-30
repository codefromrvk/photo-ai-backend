import { Application, NextFunction, Request, Response } from 'express';
import { router } from './router/routes';
import morgan from 'morgan';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import logger from './utils/logger';

const express = require('express');
const cors = require('cors');

const app: Application = express();
dotenv.config();

const PORT = process.env.PORT;

app.use(cors());
app.use((req: Request, res: Response, next: NextFunction) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use(express.json());

// using the logger and its configured transports, to save the logs created by Morgan
const logStream = {
  write: (text: string) => {
    logger.info(text);
  },
};

// app.use(morgan("dev"));
app.use(morgan('combined', { stream: logStream }));

app.get('/', (req: Request, res: Response) => {
  res.json({ status: 'OK' });
});

// app.use('/docs', swaggerUi.serve, swaggerUi.setup(apiDocumentation));

app.use(router);

app.listen(PORT, () => {
  console.log('Express server listening on port ' + PORT);
});
