import type { Response, Request, NextFunction } from 'express';
import * as z from 'zod/v4';

export function validate(schema: z.ZodSchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);

      next();
    } catch (err) {
      if (err instanceof z.ZodError) {
        next(err);
      }
    }
  };
}
