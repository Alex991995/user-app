import { User } from '@/generated/prisma/client.js';

declare global {
  namespace Express {
    interface Request {
      user: User;
    }
  }
}

export interface IToken {
  email: string;
  iat: number;
  exp: number;
}
