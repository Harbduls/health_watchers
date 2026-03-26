import { Schema, model, models, Types } from 'mongoose';

export interface Patient {
  systemId:    string;
  firstName:   string;
  lastName:    string;
  searchName:  string;
  dateOfBirth: Date;
  sex:         'M' | 'F' | 'Other';
  contactNumber?: string;
  address?:    string;
  clinicId:    string;
  isActive:    boolean;
}

const patientSchema = new Schema<Patient>({
  systemId:     { type: String, required: true, unique: true },
  firstName:    { type: String, required: true, trim: true },
  lastName:     { type: String, required: true, trim: true },
  searchName:   { type: String, required: true, lowercase: true, index: true },
  dateOfBirth:  { type: Date,   required: true },
  sex:          { type: String, enum: ['M', 'F', 'Other'], required: true },
  contactNumber:{ type: String },
  address:      { type: String },
  clinicId:     { type: String, required: true, index: true },
  isActive:     { type: Boolean, default: true },
}, { timestamps: true, versionKey: false });

export const PatientModel = models.Patient || model<Patient>('Patient', patientSchema);
