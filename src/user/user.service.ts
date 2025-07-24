import { PrismaService } from '@/database/prisma.service';
import { UserDTO } from './dto/user.dto';

export class UserService {
  constructor(private prismaService: PrismaService) {}

  async createUser(body: UserDTO) {
    try {
      const result = await this.prismaService.client.user.create({
        data: body,
      });

      return result;
    } catch (error) {
      return false;
    }
  }

  async getAllUsers() {
    return await this.prismaService.client.user.findMany();

  }
}
