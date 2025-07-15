import { Request, Response } from 'express';

interface LogLevel {
  INFO: string;
  WARN: string;
  ERROR: string;
  DEBUG: string;
}

const LOG_LEVELS: LogLevel = {
  INFO: '\x1b[36m[INFO]\x1b[0m',
  WARN: '\x1b[33m[WARN]\x1b[0m',
  ERROR: '\x1b[31m[ERROR]\x1b[0m',
  DEBUG: '\x1b[35m[DEBUG]\x1b[0m'
};

class Logger {
  private getTimestamp(): string {
    return new Date().toISOString();
  }

  private formatMessage(level: string, message: string, data?: any): string {
    const timestamp = this.getTimestamp();
    let logMessage = `${level} ${timestamp} - ${message}`;
    
    if (data) {
      logMessage += ` ${JSON.stringify(data, null, 2)}`;
    }
    
    return logMessage;
  }

  info(message: string, data?: any): void {
    console.log(this.formatMessage(LOG_LEVELS.INFO, message, data));
  }

  warn(message: string, data?: any): void {
    console.warn(this.formatMessage(LOG_LEVELS.WARN, message, data));
  }

  error(message: string, error?: Error | any, data?: any): void {
    let errorData = data;
    
    if (error instanceof Error) {
      errorData = {
        ...data,
        errorMessage: error.message,
        stack: error.stack
      };
    } else if (error) {
      errorData = { ...data, error };
    }
    
    console.error(this.formatMessage(LOG_LEVELS.ERROR, message, errorData));
  }

  debug(message: string, data?: any): void {
    if (process.env.NODE_ENV === 'development') {
      console.log(this.formatMessage(LOG_LEVELS.DEBUG, message, data));
    }
  }

  // Express middleware for request logging
  requestLogger() {
    return (req: Request, res: Response, next: Function) => {
      const start = Date.now();
      
      // Log request
      this.info(`${req.method} ${req.originalUrl}`, {
        ip: req.ip,
        userAgent: req.get('User-Agent'),
        body: req.method !== 'GET' ? req.body : undefined
      });

      // Override res.end to log response
      const originalEnd = res.end;
      res.end = function(chunk?: any, encoding?: any) {
        const duration = Date.now() - start;
        
        logger.info(`${req.method} ${req.originalUrl} - ${res.statusCode}`, {
          duration: `${duration}ms`,
          statusCode: res.statusCode
        });
        
        return originalEnd.call(this, chunk, encoding);
      };

      next();
    };
  }

  // Error logging helper for Express error handlers
  logError(error: Error, req?: Request): void {
    this.error('Express Error', error, {
      url: req?.originalUrl,
      method: req?.method,
      ip: req?.ip,
      userAgent: req?.get('User-Agent'),
      body: req?.body
    });
  }
}

const logger = new Logger();
export default logger; 