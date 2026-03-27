import { Schema, model, models } from 'mongoose';

const patientSchema = new Schema(
  {
    systemId:      { type: String, required: true, unique: true },
    firstName:     { type: String, required: true, trim: true },
    lastName:      { type: String, required: true, trim: true },
    dateOfBirth:   { type: Date, required: true },
    sex:           { type: String, enum: ['M', 'F', 'O'], required: true },
    contactNumber: { type: String },
    address:       { type: String },
    clinicId:      { type: String, required: true, index: true },
    isActive:      { type: Boolean, default: true, index: true },
    searchName:    { type: String, index: true },
  },
  { timestamps: true }
);

export const PatientModel = models.Patient || model('Patient', patientSchema);
