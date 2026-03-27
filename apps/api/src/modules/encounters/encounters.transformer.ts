import { Document } from 'mongoose';

export interface EncounterResponse {
  id: string;
  patientId: string;
  chiefComplaint: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export function toEncounterResponse(doc: Document & Record<string, any>): EncounterResponse {
  return {
    id:             String(doc._id),
    patientId:      String(doc.patientId),
    chiefComplaint: doc.chiefComplaint,
    notes:          doc.notes,
    createdAt:      doc.createdAt instanceof Date ? doc.createdAt.toISOString() : doc.createdAt,
    updatedAt:      doc.updatedAt instanceof Date ? doc.updatedAt.toISOString() : doc.updatedAt,
  };
}
