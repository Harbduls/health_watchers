import { Router, Request, Response } from 'express';
import { authenticate } from '@api/middlewares/auth.middleware';
import { PatientModel } from './models/patient.model';
import { PatientCounterModel } from './models/patient-counter.model';

const router = Router();

router.get('/', authenticate, async (req: Request, res: Response) => {
  try {
    const { clinicId, role } = req.user!;
    const filter = role === 'SUPER_ADMIN' ? {} : { clinicId };
    const patients = await PatientModel.find(filter).sort({ createdAt: -1 }).lean();
    return res.json({ status: 'success', data: patients });
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
});

router.get('/:id', authenticate, async (req: Request, res: Response) => {
  try {
    const patient = await PatientModel.findById(req.params.id).lean();
    if (!patient) return res.status(404).json({ error: 'NotFound', message: 'Patient not found' });
    return res.json({ status: 'success', data: patient });
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
});

export const patientRoutes = router;
