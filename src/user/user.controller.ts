import { PrismaService } from '@/database/prisma.service';
import { Router, Request, Response, NextFunction } from 'express';
import { UserDTO } from './dto/user.dto';
import { UserService } from './user.service';
import { HttpError } from '@/errors/http-error';
import { validate } from '@/middlewares/validate.middleware';
import { CreateUserScheme } from './account-scheme/account-scheme';

export class UserController {
  router: Router;

  constructor(private userService: UserService) {
    this.router = Router();
  }

  routes() {
    this.router.post(
      '/register', validate(CreateUserScheme),
      async (req: Request<object, object, UserDTO>, res:Response, next:NextFunction) => {
        const body = req.body;

        const result = await this.userService.createUser(body);
        if (result) {
          res.send(result);
          return;
        } else {
          next(new HttpError(422, 'User already exists'));
        }
      },
    );

    this.router.get('', async (req, res) => {
      const result = await this.userService.getAllUsers();
      res.send(result);
    });

    return this.router;
  }
}
