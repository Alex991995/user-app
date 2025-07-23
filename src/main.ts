
import { App } from './app';
import { PrismaService } from './database/prisma.service';
import { UserController } from './user/user.controller';

async function bootstrap() {
  const prismaService = new PrismaService()
  const userController = new UserController(prismaService)

  const app = new App(prismaService, userController)
  
  await app.init();
}


bootstrap();