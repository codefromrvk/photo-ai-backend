import dotenv from 'dotenv';

import logger from '../utils/logger';

dotenv.config();

export default class BasicService {
  static testFunc = async () => {
    return new Promise<void>(async (resolve, reject) => {
      try {
        logger.info(`testFunc() executed successfully`);
        resolve();
      } catch (error: any) {
        logger.error(`testFunc() failed with error: ${error}`);
        reject(error);
      }
    });
  };
}
