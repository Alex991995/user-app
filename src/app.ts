import express, { type Express } from 'express';
import 'dotenv/config';
import { PrismaService } from './database/prisma.service';
import { UserController } from './user/user.controller';
import body from 'body-parser';
import { ExceptionFilter } from './errors/exception.filter';

// Health check endpoint

export class App {
  app: Express;

  constructor(
    private prismaService: PrismaService,
    private userController: UserController,
    private exceptionFilter: ExceptionFilter,
  ) {
    this.app = express();
  }

  useMiddleware() {
    this.app.use(body.json());
  }

  useExceptionFilters() {
    this.app.use(this.exceptionFilter.catch.bind(this.exceptionFilter));
  }

  useRoutes() {
    this.app.use('/user', this.userController.routes());
  }

  async init() {
    this.useMiddleware();
    this.useRoutes();
    this.useExceptionFilters();

    await this.prismaService.connect();
    this.app.listen(3000);
    console.log(
      `Server is running on http://localhost:${process.env.PORT || 3000}`,
    );
  }
}
