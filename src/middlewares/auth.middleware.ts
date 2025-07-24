import { Request, Response, NextFunction } from 'express';



// import { jwtConstants } from '@/common/constants';
import { HttpError } from '@/errors/http-error';
// import { IResultPayload } from '@/types';

export class AuthMiddleware {
  constructor(private logger: LoggerService) {}

  async execute(req: Request, res: Response, next: NextFunction) {
    const [, , route, subRoute] = req.originalUrl.trim().split('/');

    const cookies = req.headers.cookie?.replace(/\s/g, '').split(';');

    const access_token = cookies?.find(item => item.startsWith('access_token'));
    const token = access_token?.split('=')[1];

     if (
      route === 'auth' ||
      (route === 'cookbook' && subRoute === 'most-popular') ||
      (route === 'recipe' && subRoute === 'trend')
    ) {
      return next();
    }

    if (!token) {
      return next();
    }

    try {
      const { email } = await this.decodeJWT(token);

      req.userEmail = email;
      return next();
    } catch (err) {
      console.log('err', err);
      return next(new HttpError(401, 'Invalid Token'));
    }
  }

  async decodeJWT(token: string): Promise<IResultPayload> {
    const secret = new TextEncoder().encode(jwtConstants.secret);
    const { payload } = await jose.jwtVerify(token, secret);
    return payload as IResultPayload;
  }
}
