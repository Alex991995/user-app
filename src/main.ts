
import { App } from './app';
import { PrismaService } from './database/prisma.service';
import { ExceptionFilter } from './errors/exception.filter';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';

async function bootstrap() {
  const prismaService = new PrismaService()
  const userService= new UserService(prismaService)
  const userController = new UserController(userService)
   const exceptionFilter = new ExceptionFilter();

  const app = new App(prismaService, userController, exceptionFilter)
  
  await app.init();
}


bootstrap();