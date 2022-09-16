import { Logger } from "tslog";
import config from "./config";

export class LoggerUtil {
    private static instance: LoggerUtil;
    private logger: Logger = new Logger({name: "Crim", minLevel: config.NODE_ENV === 'production' ? "info" : "debug"});

    public static getInstance(): LoggerUtil {
        if (!LoggerUtil.instance) {
            LoggerUtil.instance = new LoggerUtil();
        }
        return LoggerUtil.instance;
    }

    public createChildLogger(): Logger {
        return this.logger.getChildLogger();
    } 
}