import { Document } from 'mongoose';

export interface PaymentResponse {
  id: string;
  intentId: string;
  patientId?: string;
  amount: string;
  destination: string;
  memo?: string;
  status: string;
  txHash?: string;
  createdAt: string;
  updatedAt: string;
}

export function toPaymentResponse(doc: Document & Record<string, any>): PaymentResponse {
  return {
    id:          String(doc._id),
    intentId:    doc.intentId,
    patientId:   doc.patientId ? String(doc.patientId) : undefined,
    amount:      doc.amount,
    destination: doc.destination,
    memo:        doc.memo,
    status:      doc.status,
    txHash:      doc.txHash,
    createdAt:   doc.createdAt instanceof Date ? doc.createdAt.toISOString() : doc.createdAt,
    updatedAt:   doc.updatedAt instanceof Date ? doc.updatedAt.toISOString() : doc.updatedAt,
  };
}
