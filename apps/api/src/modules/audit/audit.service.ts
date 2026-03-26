import { Request } from 'express';
import { AuditLogModel, AuditAction } from './audit-log.model';

export async function createAuditLog(
  action: AuditAction,
  req: Request,
  resourceId: string,
  format: string,
) {
  await AuditLogModel.create({
    action,
    userId:     req.user!.userId,
    clinicId:   req.user!.clinicId,
    resourceId,
    format,
    timestamp:  new Date(),
    ip:         req.ip,
  });
}
