import { Request, Response } from 'express';
import StatusCodes from 'http-status-codes';
import dotenv from 'dotenv';
import BasicService from '../services/BasicService';

dotenv.config();

export default class BasicController {
  static testFunction = async (req: Request, res: Response) => {
    try {
      const messageSvc = await BasicService.testFunc();

      res.status(StatusCodes.OK).json({
        success: true,
        message: messageSvc,
      });
    } catch (e: any) {
      console.error(e);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
        success: false,
        message: e,
      });
    }
  };
}
