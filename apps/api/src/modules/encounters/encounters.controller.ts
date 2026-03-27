import { Router, Request, Response } from 'express';
import { EncounterModel } from './encounter.model';
import { authenticate } from '@api/middlewares/auth.middleware';
import { validateRequest } from '@api/middlewares/validate.middleware';
import { objectIdSchema } from '@api/middlewares/objectid.schema';
import { asyncHandler } from '@api/middlewares/async.handler';
import {
  createEncounterSchema,
  updateEncounterSchema,
  listEncountersQuerySchema,
  ListEncountersQuery,
} from './encounter.validation';
import { toEncounterResponse } from './encounters.transformer';

const router = Router();
router.use(authenticate);

// GET /encounters — paginated list scoped to the authenticated clinic
router.get(
  '/',
  validateRequest({ query: listEncountersQuerySchema }),
  asyncHandler(async (req: Request, res: Response) => {
    const { patientId, doctorId, status, date, page, limit } = req.query as unknown as ListEncountersQuery;

    const filter: Record<string, unknown> = { clinicId: req.user!.clinicId };

    if (patientId) filter.patientId         = patientId;
    if (doctorId)  filter.attendingDoctorId = doctorId;
    if (status)    filter.status            = status;

    if (date) {
      const start = new Date(date);
      const end   = new Date(date);
      end.setUTCDate(end.getUTCDate() + 1);
      filter.createdAt = { $gte: start, $lt: end };
    }

    const skip = (page - 1) * limit;
    const [encounters, total] = await Promise.all([
      EncounterModel.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
      EncounterModel.countDocuments(filter),
    ]);

    res.json({
      status: 'success',
      data: encounters.map(toEncounterResponse),
      meta: { total, page, limit },
    });
  }),
);

router.post(
  '/',
  validateRequest({ body: createEncounterSchema }),
  asyncHandler(async (req: Request, res: Response) => {
    const encounter = await EncounterModel.create(req.body);
    res.status(201).json({ status: 'success', data: toEncounterResponse(encounter) });
  }),
);

router.get(
  '/patient/:patientId',
  asyncHandler(async (req: Request, res: Response) => {
    const encounters = await EncounterModel
      .find({ patientId: req.params.patientId, clinicId: req.user!.clinicId })
      .sort({ createdAt: -1 })
      .lean();
    res.json({ status: 'success', data: encounters.map(toEncounterResponse) });
  }),
);

router.get(
  '/:id',
  validateRequest({ params: objectIdSchema }),
  asyncHandler(async (req: Request, res: Response) => {
    const encounter = await EncounterModel.findOne({ _id: req.params.id, clinicId: req.user!.clinicId }).lean();
    if (!encounter) return res.status(404).json({ error: 'NotFound', message: 'Encounter not found' });
    res.json({ status: 'success', data: toEncounterResponse(encounter) });
  }),
);

router.patch(
  '/:id',
  validateRequest({ params: objectIdSchema, body: updateEncounterSchema }),
  asyncHandler(async (req: Request, res: Response) => {
    const encounter = await EncounterModel.findOneAndUpdate(
      { _id: req.params.id, clinicId: req.user!.clinicId },
      req.body,
      { new: true, runValidators: true },
    ).lean();
    if (!encounter) return res.status(404).json({ error: 'NotFound', message: 'Encounter not found' });
    res.json({ status: 'success', data: toEncounterResponse(encounter) });
  }),
);

export const encounterRoutes = router;
