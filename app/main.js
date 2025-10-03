// library
import 'dotenv/config'
import express from 'express'

//Handlers
import prisma from './models/handler.model.js';
import HandlerRoute from './routes/handler.route.js';
import HandlerMiddleware from './middlewares/handler.middleware.js';

class Server {
  constructor() {
    this.env = process.env
    this.API = express();
    this.init()
  }

  async init() {
    try {
      await prisma.$connect();

      new HandlerMiddleware(this);
      new HandlerRoute(this);

      this.API.get('/', (req, res) => {
        res.status(200).send('CyberFeed API')
      });

      this.API.listen(this.env.PORT, this.env.HOST, () =>
        console.log("this server listening on port : " + this.env.PORT)
      );

    } catch (error) {
      console.error("error message : ", error);
      process.exit(1);
    }

  }
}

new Server();