import { Request, Response, NextFunction } from 'express';
import { ZodSchema } from 'zod';

interface ValidateOptions {
  body?: ZodSchema;
  query?: ZodSchema;
  params?: ZodSchema;
}

export function validateRequest(schemas: ValidateOptions) {
  return (req: Request, res: Response, next: NextFunction) => {
    for (const [key, schema] of Object.entries(schemas) as [keyof ValidateOptions, ZodSchema][]) {
      const result = schema.safeParse(req[key]);
      if (!result.success) {
        return res.status(400).json({
          error: 'ValidationError',
          message: result.error.errors.map((e) => e.message).join(', '),
        });
      }
      (req as any)[key] = result.data;
    }
    return next();
  };
}
