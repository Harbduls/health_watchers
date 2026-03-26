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
  timestamp:  { type: Date,   required: true, default: () => new Date() },
  ip:         { type: String },
}, { versionKey: false });

export const AuditLogModel = models.AuditLog || model<AuditLog>('AuditLog', auditLogSchema);
