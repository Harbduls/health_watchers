import { Router, Request, Response } from 'express';
import { PaymentRecordModel } from './models/payment-record.model';
import { toPaymentResponse } from './payments.transformer';
import { config } from '@health-watchers/config';

const router = Router();

// GET /payments
router.get('/', async (_req: Request, res: Response) => {
  try {
    const docs = await PaymentRecordModel.find().sort({ createdAt: -1 });
    return res.json({ status: 'success', data: docs.map(toPaymentResponse) });
  } catch (err: any) {
    return res.status(500).json({ error: 'InternalError', message: err.message });
  }
});

// GET /payments/:id
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const doc = await PaymentRecordModel.findById(req.params.id);
    if (!doc) return res.status(404).json({ error: 'NotFound', message: 'Payment not found' });
    return res.json({ status: 'success', data: toPaymentResponse(doc) });
  } catch (err: any) {
    return res.status(500).json({ error: 'InternalError', message: err.message });
  }
});

// POST /payments/intent
router.post('/intent', async (req: Request, res: Response) => {
  try {
    const {
      intentId, amount, destination, memo, clinicId, patientId,
      assetCode = 'XLM',
      issuer,
    } = req.body;

    const normalizedAsset = String(assetCode).toUpperCase().trim();

    // XLM is always supported natively; other assets must be in the allow-list
    if (normalizedAsset !== 'XLM' && !config.supportedAssets.includes(normalizedAsset)) {
      return res.status(400).json({
        error: 'UnsupportedAsset',
        message: `Asset '${normalizedAsset}' is not supported. Supported assets: ${config.supportedAssets.join(', ')}`,
      });
    }

    // Non-native assets require an issuer account
    if (normalizedAsset !== 'XLM' && !issuer) {
      return res.status(400).json({
        error: 'BadRequest',
        message: `An issuer address is required for non-native asset '${normalizedAsset}'`,
      });
    }

    const doc = await PaymentRecordModel.create({
      intentId,
      amount,
      destination,
      memo,
      clinicId: clinicId || 'default',
      patientId,
      status: 'pending',
      assetCode: normalizedAsset,
      assetIssuer: normalizedAsset === 'XLM' ? null : issuer,
    });

    return res.status(201).json({ status: 'success', data: toPaymentResponse(doc) });
  } catch (err: any) {
    return res.status(400).json({ error: 'BadRequest', message: err.message });
  }
});

export const paymentRoutes = router;
