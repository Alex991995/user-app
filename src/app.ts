import express, { type Express } from 'express';
import 'dotenv/config';
import { PrismaService } from './database/prisma.service';
import { UserController } from './user/user.controller';
import body from 'body-parser';

// Health check endpoint

export class App {
  app: Express;

  constructor(private prismaService: PrismaService, private userController: UserController) {
    this.app = express();
  }

  useMiddleware(){
     this.app.use(body.json());
  }

  useRoutes() {
    this.app.use('/user', this.userController.routes() );
  }

  async init() {
    this.useMiddleware()
    this.useRoutes()

    await this.prismaService.connect();
    this.app.listen(3000);
    console.log(`Server is running on http://localhost:${process.env.PORT || 3000}`);
  }
}
