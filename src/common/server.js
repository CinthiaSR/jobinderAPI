import Express from 'express'
import * as path from 'path';
import * as bodyParser from 'body-parser';
import * as http from 'http';
import * as os from 'os';
import logger from '../api/middlewares/logger';
import errorHandler from '../api/middlewares/error.handler';
import corsMiddleware from '../api/middlewares/cors'

const app = new Express();

export default class ExpressServer {
  constructor() {
    const root = path.normalize(`${__dirname}/../..`)
    
    app.use((req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
      res.header('Access-Control-Max-Age', 6000);
      res.header('Cache-Control', 'must-revalidate');
      res.header('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization, withCredentials, timeout, accept-language, ngsw-bypass');
      res.header('Access-Control-Allow-Credentials', true);
      if (req.method === 'OPTIONS') {
        res.sendStatus(200);
      } else {
        next();
      }
    });
    app.use(corsMiddleware());
    app.use(bodyParser.json({ limit: process.env.REQUEST_LIMIT || '100kb' }))
    app.use(
      bodyParser.urlencoded({
        extended: true,
        limit: process.env.REQUEST_LIMIT || '100kb',
      })
    )
  }

  router(routes) {
    routes(app)
    app.use(errorHandler)
    return this
  }

  database(initDatabase) {
    initDatabase()
    return this
  }

  listen(port = process.env.PORT) {
    const welcome = (p) => () => 
      logger.info(
        `Up and Running in ${
          process.env.NODE_ENV || 'development'
        }@${os.hostname()} on port: ${p}`
      )
    
    http.createServer(app).listen(port, welcome(port));

    return app;
  }
}
