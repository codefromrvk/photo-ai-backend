import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import StatusCodes from 'http-status-codes';

export async function validateJWT(req: Request, res: Response, next: NextFunction) {
  try {
    // TODO: Add token validation here
    next();
  } catch (error) {
    console.error(error);
    res.status(StatusCodes.UNAUTHORIZED).send({
      success: false,
      message: StatusCodes.getStatusText(StatusCodes.UNAUTHORIZED),
    });
  }
}
