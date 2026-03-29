import { Schema, model, models } from 'mongoose';

export type AuditAction = 'EXPORT_PATIENT_DATA' | 'EXPORT_CLINIC_DATA';

export interface AuditLog {
  action:     AuditAction;
  userId:     string;
  resourceId: string;
  format:     string;
  clinicId:   string;
  timestamp:  Date;
  ip?:        string;
}

const auditLogSchema = new Schema<AuditLog>({
  action:     { type: String, required: true, index: true },
  userId:     { type: String, required: true, index: true },
  resourceId: { type: String, required: true },
  format:     { type: String, required: true },
  clinicId:   { type: String, required: true, index: true },
  timestamp:  { type: Date,   required: true, default: () => new Date(), immutable: true },
  ip:         { type: String },
}, {
  versionKey: false,
  // Immutability: prevent updates and deletes at the schema level
  strict: true,
});

// Block any update/replace operations to enforce immutability
auditLogSchema.pre(['updateOne', 'updateMany', 'findOneAndUpdate', 'replaceOne'] as any, function () {
  throw new Error('AuditLog records are immutable and cannot be modified');
});

export const AuditLogModel = models.AuditLog || model<AuditLog>('AuditLog', auditLogSchema);
