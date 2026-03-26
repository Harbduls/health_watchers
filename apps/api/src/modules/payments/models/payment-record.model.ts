import { Schema, model, models } from 'mongoose';

export interface PaymentRecord {
  intentId:    string;
  amount:      string;
  destination: string;
  memo?:       string;
  status:      'pending' | 'confirmed' | 'failed';
  clinicId:    string;
}

const paymentSchema = new Schema<PaymentRecord>({
  intentId:    { type: String, required: true, unique: true },
  amount:      { type: String, required: true },
  destination: { type: String, required: true },
  memo:        { type: String },
  status:      { type: String, enum: ['pending', 'confirmed', 'failed'], default: 'pending' },
  clinicId:    { type: String, required: true, index: true },
}, { timestamps: true, versionKey: false });

export const PaymentRecordModel = models.PaymentRecord || model<PaymentRecord>('PaymentRecord', paymentSchema);
