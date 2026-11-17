const mongoose = require('mongoose');

const donorSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true, trim: true },
    bloodGroup: {
      type: String,
      required: true,
      enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
    },
    city: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    lastDonationDate: { type: String, default: '' },
    available: { type: Boolean, default: true },
    donationsCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

donorSchema.set('toJSON', {
  transform: (_doc, ret) => {
    ret.id = ret._id.toString();
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

module.exports = mongoose.model('Donor', donorSchema);