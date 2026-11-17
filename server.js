const dns = require('dns');
dns.setServers(['8.8.8.8', '1.1.1.1']);

require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const Donor = require('./models/Donor');
const BloodRequest = require('./models/BloodRequest');
const donorRoutes = require('./routes/donorRoutes');
const requestRoutes = require('./routes/requestRoutes');

const app = express();
app.use(cors());
app.use(express.json());

async function seedInitialData() {
  if ((await Donor.countDocuments()) === 0) {
    await Donor.insertMany([
      {
        fullName: 'Ayesha Siddiqui',
        bloodGroup: 'O-',
        city: 'Islamabad',
        phone: '+92 300 5128490',
        lastDonationDate: '2026-06-14',
        available: true,
        donationsCount: 6,
      },
      {
        fullName: 'Bilal Mahmood',
        bloodGroup: 'A+',
        city: 'Rawalpindi',
        phone: '+92 321 9841203',
        lastDonationDate: '2026-09-02',
        available: true,
        donationsCount: 3,
      },
      {
        fullName: 'Zainab Tariq',
        bloodGroup: 'B+',
        city: 'Lahore',
        phone: '+92 333 4410982',
        lastDonationDate: '2026-10-18',
        available: false,
        donationsCount: 4,
      },
      {
        fullName: 'Hamza Qureshi',
        bloodGroup: 'AB-',
        city: 'Islamabad',
        phone: '+92 312 7730194',
        lastDonationDate: '2026-05-20',
        available: true,
        donationsCount: 8,
      },
    ]);
  }

  if ((await BloodRequest.countDocuments()) === 0) {
    await BloodRequest.insertMany([
      {
        patientName: 'Tariq Mehmood',
        bloodGroup: 'O-',
        unitsNeeded: 2,
        hospital: 'Shifa International Hospital',
        city: 'Islamabad',
        urgency: 'Critical',
        contactPhone: '+92 300 8821940',
        notes: 'Scheduled emergency cardiac surgery tomorrow at 8:00 AM.',
        status: 'Open',
      },
      {
        patientName: 'Sanaullah Khan',
        bloodGroup: 'B+',
        unitsNeeded: 1,
        hospital: 'Combined Military Hospital (CMH)',
        city: 'Rawalpindi',
        urgency: 'Urgent',
        contactPhone: '+92 331 5509123',
        notes: 'Thalassemia transfusion support needed by evening.',
        status: 'Open',
      },
      {
        patientName: 'Minaal Farooq',
        bloodGroup: 'A+',
        unitsNeeded: 3,
        hospital: 'PIMS Hospital',
        city: 'Islamabad',
        urgency: 'Standard',
        contactPhone: '+92 345 1190482',
        notes: 'Post-operative recovery ward, Room 204.',
        status: 'Fulfilled',
      },
    ]);
  }
}

mongoose
  .connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log('Connected to MongoDB Atlas');
    await seedInitialData();
  })
  .catch((err) => console.error('MongoDB connection error:', err));

app.use('/api/donors', donorRoutes);
app.use('/api/requests', requestRoutes);

app.get('/', (_req, res) => {
  res.send('HemoLink API is running');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});