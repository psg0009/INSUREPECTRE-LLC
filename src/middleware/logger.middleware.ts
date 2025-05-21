import morgan from 'morgan';
import Logger, { stream } from '../config/logger';

// Override the stream method
const morganMiddleware = morgan(
  // Define message format string (this is the default format)
  ':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"',
  // Options: in this case, I overwrote the stream and added skip logic
  {
    // Skip all the Morgan http log if the application is not running in development mode
    skip: () => process.env.NODE_ENV !== 'development',
    // Stream all http logs to Winston
    stream,
  }
);

export { Logger, morganMiddleware }; 