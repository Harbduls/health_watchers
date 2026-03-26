import { Request, Response, NextFunction } from 'express';
import { verifyAccessToken } from '@api/modules/auth/token.service';
import { AppRole } from '@api/types/express';

/** Require a valid Bearer JWT. Attaches req.user on success. */
export function authenticate(req: Request, res: Response, next: NextFunction) {
  const header = req.headers.authorization;
  if (!header?.startsWith('Bearer '))
    return res.status(401).json({ error: 'Unauthorized', message: 'Missing or invalid Authorization header' });

  const token = header.slice(7);
  const payload = verifyAccessToken(token);
  if (!payload)
    return res.status(401).json({ error: 'Unauthorized', message: 'Invalid or expired token' });

  req.user = payload;
  return next();
}

/** Require one of the specified roles (must come after authenticate). */
export function requireRole(...roles: AppRole[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role))
      return res.status(403).json({ error: 'Forbidden', message: `Required role: ${roles.join(' | ')}` });
    return next();
  };
}
