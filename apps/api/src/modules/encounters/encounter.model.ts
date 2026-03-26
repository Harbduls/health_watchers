import { Schema, model, models, Types } from 'mongoose';

export interface Encounter {
  patientId:      Types.ObjectId;
  clinicId:       Types.ObjectId;
  chiefComplaint: string;
  notes?:         string;
  createdAt?:     Date;
}

const encounterSchema = new Schema<Encounter>({
  patientId:      { type: Schema.Types.ObjectId, ref: 'Patient', required: true, index: true },
  clinicId:       { type: Schema.Types.ObjectId, ref: 'Clinic',  required: true, index: true },
  chiefComplaint: { type: String, required: true },
  notes:          { type: String },
}, { timestamps: true, versionKey: false });

export const EncounterModel = models.Encounter || model<Encounter>('Encounter', encounterSchema);
