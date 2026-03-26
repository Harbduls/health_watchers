import jwt from 'jsonwebtoken';
import { AppRole } from '@api/types/express';

interface TokenPayload {
  userId: string;
  role: AppRole;
  clinicId: string;
}

const accessSecret  = () => process.env.JWT_ACCESS_TOKEN_SECRET  || 'dev-access-secret';
const refreshSecret = () => process.env.JWT_REFRESH_TOKEN_SECRET || 'dev-refresh-secret';
const tempSecret    = () => process.env.JWT_ACCESS_TOKEN_SECRET  || 'dev-temp-secret';

export const signAccessToken  = (p: TokenPayload) => jwt.sign(p, accessSecret(),  { expiresIn: '15m' });
export const signRefreshToken = (p: TokenPayload) => jwt.sign(p, refreshSecret(), { expiresIn: '7d'  });
export const signTempToken    = (userId: string)  => jwt.sign({ userId }, tempSecret(), { expiresIn: '5m' });

export const verifyRefreshToken = (token: string): TokenPayload | null => {
  try { return jwt.verify(token, refreshSecret()) as TokenPayload; } catch { return null; }
};

export const verifyAccessToken = (token: string): TokenPayload | null => {
  try { return jwt.verify(token, accessSecret()) as TokenPayload; } catch { return null; }
};

export const verifyTempToken = (token: string): string | null => {
  try {
    const decoded = jwt.verify(token, tempSecret()) as { userId: string };
    return decoded.userId;
  } catch { return null; }
};
