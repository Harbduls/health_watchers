import { Schema, model, models } from 'mongoose';

const counterSchema = new Schema({
  _id:   { type: String, required: true },
  value: { type: Number, required: true, default: 1000 },
}, { versionKey: false });

export const PatientCounterModel = models.PatientCounter || model('PatientCounter', counterSchema);
