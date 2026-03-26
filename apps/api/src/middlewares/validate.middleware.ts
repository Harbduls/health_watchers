import { Request, Response, NextFunction } from 'express';
import { ZodSchema } from 'zod';

interface ValidateOptions {
  body?:   ZodSchema;
  query?:  ZodSchema;
  params?: ZodSchema;
}

export function validateRequest(schemas: ValidateOptions) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (schemas.body) {
      const result = schemas.body.safeParse(req.body);
      if (!result.success)
        return res.status(400).json({ error: 'ValidationError', message: result.error.errors });
      req.body = result.data;
    }
    if (schemas.query) {
      const result = schemas.query.safeParse(req.query);
      if (!result.success)
        return res.status(400).json({ error: 'ValidationError', message: result.error.errors });
    }
    if (schemas.params) {
      const result = schemas.params.safeParse(req.params);
      if (!result.success)
        return res.status(400).json({ error: 'ValidationError', message: result.error.errors });
    }
    return next();
  };
}
