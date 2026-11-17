const mongoose = require('mongoose');

const bloodRequestSchema = new mongoose.Schema({
  patientName: { type: String, required: true, trim: true },
  bloodGroup: {
    type: String,
    required: true,
    enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
  },
  unitsNeeded: { type: Number, required: true, min: 1, max: 10 },
  hospital: { type: String, required: true, trim: true },
  city: { type: String, required: true, trim: true },
  urgency: {
    type: String,
    enum: ['Critical', 'Urgent', 'Standard'],
    default: 'Urgent',
  },
  contactPhone: { type: String, required: true, trim: true },
  notes: { type: String, default: '', trim: true },
  status: {
    type: String,
    enum: ['Open', 'Fulfilled'],
    default: 'Open',
  },
  createdAt: { type: Date, default: Date.now },
});

bloodRequestSchema.set('toJSON', {
  transform: (_doc, ret) => {
    ret.id = ret._id.toString();
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

module.exports = mongoose.model('BloodRequest', bloodRequestSchema);
