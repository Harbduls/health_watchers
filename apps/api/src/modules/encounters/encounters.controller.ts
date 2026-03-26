import { Router, Request, Response } from 'express';
import { authenticate } from '@api/middlewares/auth.middleware';
import { EncounterModel } from './encounter.model';

const router = Router();

router.get('/', authenticate, async (_req: Request, res: Response) => {
  try {
    const encounters = await EncounterModel.find().sort({ createdAt: -1 }).lean();
    return res.json({ status: 'success', data: encounters });
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
});

export const encounterRoutes = router;
