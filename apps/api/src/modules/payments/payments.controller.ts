import { Router, Request, Response } from 'express';
import { authenticate } from '@api/middlewares/auth.middleware';
import { PaymentRecordModel } from './models/payment-record.model';

const router = Router();

router.get('/', authenticate, async (req: Request, res: Response) => {
  try {
    const { clinicId, role } = req.user!;
    const filter = role === 'SUPER_ADMIN' ? {} : { clinicId };
    const payments = await PaymentRecordModel.find(filter).sort({ createdAt: -1 }).lean();
    return res.json({ status: 'success', data: payments });
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
});

export const paymentRoutes = router;
