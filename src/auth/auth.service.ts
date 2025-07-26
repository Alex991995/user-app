import { PrismaService } from '@/database/prisma.service.js';
import { IToken } from '@/interface/index.js';
import jwt from 'jsonwebtoken';

const secret = process.env.SECRET!;

export class AuthService {
  constructor(private prismaService: PrismaService) {}

  async loginUser(email: string) {
    const token = await this.signJWT(email);
    return token;
  }

  private signJWT(email: string) {
    return new Promise((resolve, reject) => {
      jwt.sign({ email }, secret, { expiresIn: '7d', algorithm: 'HS256' }, (err, token) => {
        if (err) {
          console.log(err);

          reject(err);
        } else {
          resolve(token);
        }
      });
    });
  }

  // async verifyToken(token: string) {
  //   return new Promise((resolve, reject) => {
  //     jwt.verify(token, secret, (err, payload) => {
  //       if (err) {
  //         reject(err);
  //       }
  //       resolve(payload as IToken);
  //     });
  //   });
  // }

  public verifyToken(token: string): Promise<IToken> {
    return new Promise<IToken>((resolve, reject) => {
      jwt.verify(token, secret, (err: jwt.VerifyErrors | null, payload: unknown) => {
        if (err) {
          reject(err);
          return; 
        }
        resolve(payload as IToken);
      });
    });
  }

  async findUser(email: string) {
    return await this.prismaService.client.user.findFirst({
      where: {
        email,
      },
    });
  }
}
