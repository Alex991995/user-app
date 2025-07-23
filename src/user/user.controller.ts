import { PrismaService } from '@/database/prisma.service';
import { Router, Request } from 'express';
import { UserDTO } from './dto/user.dto';

export class UserController {
  router: Router;

  constructor(private prismaService: PrismaService) {
    this.router = Router();
  }

  routes() {
    this.router.post(
      '/register',
      async (req: Request<object, object, UserDTO>, res) => {
        const body = req.body;
        console.log(body);
        try {
          const result = await this.prismaService.client.user.create({
            data: body,
          });
          console.log(result);
          res.send(body);
        } catch (error) {
          console.log(error);
          // res.send(error)
        }
      },
    );

    this.router.get('', async (req, res) => {
      const result = await this.prismaService.client.user.findMany();
      res.send(result)
    });

    return this.router;
  }
}
