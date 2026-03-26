import './instrument'; // Sentry must be first
import express from 'express';
import mongoose from 'mongoose';
import { config } from '@health-watchers/config';
import { authRoutes } from './modules/auth/auth.controller';
import { patientRoutes } from './modules/patients/patients.controller';
import { encounterRoutes } from './modules/encounters/encounters.controller';
import { paymentRoutes } from './modules/payments/payments.controller';
import aiRoutes from './modules/ai/ai.routes';
import exportRoutes from './modules/export/export.routes';
import { setupSwagger } from './docs/swagger';
import dashboardRoutes from './modules/dashboard/dashboard.routes';

const app = express();
app.use(express.json());

// ── Health check ──────────────────────────────────────────────────────────
app.get('/health', (_req, res) =>
  res.json({ status: 'ok', service: 'health-watchers-api' }),
);

// ── API routes ────────────────────────────────────────────────────────────
app.use('/api/v1/auth',       authRoutes);
app.use('/api/v1/patients',   patientRoutes);
app.use('/api/v1/encounters', encounterRoutes);
app.use('/api/v1/payments',   paymentRoutes);
app.use('/api/v1/ai',         aiRoutes);
app.use('/api/v1/dashboard',  dashboardRoutes);

// ── Export routes (HIPAA Right of Access) ────────────────────────────────
// Mounted at /api/v1 so paths resolve to:
//   GET /api/v1/patients/:id/export
//   GET /api/v1/clinics/:id/export
app.use('/api/v1', exportRoutes);

setupSwagger(app);

// ── Database + server startup ─────────────────────────────────────────────
async function start() {
  if (!config.mongoUri) {
    console.error('MONGO_URI is not set');
    process.exit(1);
  }

  await mongoose.connect(config.mongoUri);
  console.log('[db] Connected to MongoDB');

  app.listen(config.apiPort, () => {
    console.log(`[api] Health Watchers API running on port ${config.apiPort}`);
  });
}

start().catch((err) => {
  console.error('[api] Startup failed:', err);
  process.exit(1);
});

export default app;
