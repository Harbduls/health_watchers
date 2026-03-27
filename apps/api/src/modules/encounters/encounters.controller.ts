import { Router, Request, Response } from 'express';
import { EncounterModel } from './encounter.model';
import { toEncounterResponse } from './encounters.transformer';

const router = Router();

// GET /encounters
router.get('/', async (_req: Request, res: Response) => {
  try {
    const docs = await EncounterModel.find().sort({ createdAt: -1 });
    return res.json({ status: 'success', data: docs.map(toEncounterResponse) });
  } catch (err: any) {
    return res.status(500).json({ error: 'InternalError', message: err.message });
  }
});

// GET /encounters/patient/:patientId
router.get('/patient/:patientId', async (req: Request, res: Response) => {
  try {
    const docs = await EncounterModel.find({ patientId: req.params.patientId }).sort({ createdAt: -1 });
    return res.json({ status: 'success', data: docs.map(toEncounterResponse) });
  } catch (err: any) {
    return res.status(500).json({ error: 'InternalError', message: err.message });
  }
});

// GET /encounters/:id
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const doc = await EncounterModel.findById(req.params.id);
    if (!doc) return res.status(404).json({ error: 'NotFound', message: 'Encounter not found' });
    return res.json({ status: 'success', data: toEncounterResponse(doc) });
  } catch (err: any) {
    return res.status(500).json({ error: 'InternalError', message: err.message });
  }
});

// POST /encounters
router.post('/', async (req: Request, res: Response) => {
  try {
    const { patientId, clinicId, chiefComplaint, notes } = req.body;
    const doc = await EncounterModel.create({ patientId, clinicId, chiefComplaint, notes });
    return res.status(201).json({ status: 'success', data: toEncounterResponse(doc) });
  } catch (err: any) {
    return res.status(400).json({ error: 'BadRequest', message: err.message });
  }
});

export const encounterRoutes = router;
