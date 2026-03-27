import { Schema, model, models } from 'mongoose';

const paymentRecordSchema = new Schema(
  {
    intentId:    { type: String, required: true, unique: true },
    amount:      { type: String, required: true },
    destination: { type: String, required: true },
    memo:        { type: String },
    status:      { type: String, enum: ['pending', 'confirmed', 'failed'], default: 'pending' },
    txHash:      { type: String },
    clinicId:    { type: String, required: true, index: true },
    patientId:   { type: String, index: true },
  },
  { timestamps: true }
);

export const PaymentRecordModel =
  models.PaymentRecord || model('PaymentRecord', paymentRecordSchema);
