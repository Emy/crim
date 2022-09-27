import { Logger } from 'tslog';
import config from './config';

/**
 * Singleton Class to get Logger
 */
export class LoggerUtil {
  private static instance: LoggerUtil;
  private logger: Logger = new Logger({ name: 'Crim', minLevel: config.NODE_ENV === 'production' ? 'info' : 'debug' });

  /**
   * Singleton, get or create Instance of this class
   *
   * @returns Instance of Class
   */
  public static getInstance(): LoggerUtil {
    if (!LoggerUtil.instance) {
      LoggerUtil.instance = new LoggerUtil();
    }
    return LoggerUtil.instance;
  }

  /**
   * creates a child logger
   *
   * @returns Logger
   */
  public createChildLogger(): Logger {
    return this.logger.getChildLogger();
  }
}
