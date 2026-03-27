import { Schema, model, models } from 'mongoose';

const patientCounterSchema = new Schema({
  _id:   { type: String, required: true },
  value: { type: Number, required: true, default: 1000 },
});

export const PatientCounterModel =
  models.PatientCounter || model('PatientCounter', patientCounterSchema);
