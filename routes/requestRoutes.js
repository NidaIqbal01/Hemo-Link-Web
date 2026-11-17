const express = require('express');
const BloodRequest = require('../models/BloodRequest');

const router = express.Router();
const nameRegex = /^[A-Za-z\s]+$/;

// GET /api/requests
router.get('/', async (req, res) => {
  try {
    const { bloodGroup = 'ALL', urgency = 'ALL' } = req.query;
    const filter = {};

    if (bloodGroup !== 'ALL') {
      filter.bloodGroup = bloodGroup;
    }
    if (urgency !== 'ALL') {
      filter.urgency = urgency;
    }

    const requests = await BloodRequest.find(filter).sort({ createdAt: -1 });
    res.json(requests);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/requests
router.post('/', async (req, res) => {
  try {
    const { patientName, bloodGroup, unitsNeeded, hospital, city, urgency, contactPhone, notes } = req.body;
    const rawDigits = String(contactPhone || '').replace(/\D/g, '');

    if (!nameRegex.test(String(patientName || '').trim())) {
      return res.status(400).json({ message: 'Validation Error: Patient name cannot contain numbers or symbols.' });
    }
    if (!nameRegex.test(String(hospital || '').trim())) {
      return res.status(400).json({ message: 'Validation Error: Hospital name cannot contain numbers or symbols.' });
    }
    if (rawDigits.length !== 11) {
      return res.status(400).json({ message: 'Validation Error: Contact phone must consist of exactly 11 digits.' });
    }

    const newReq = await BloodRequest.create({
      patientName,
      bloodGroup,
      unitsNeeded: Number(unitsNeeded),
      hospital,
      city,
      urgency: urgency || 'Urgent',
      contactPhone,
      notes: notes || '',
      status: 'Open',
    });

    res.status(201).json(newReq);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PATCH /api/requests/:id/status
router.patch('/:id/status', async (req, res) => {
  try {
    const bloodReq = await BloodRequest.findById(req.params.id);
    if (!bloodReq) return res.status(404).json({ message: 'Blood request not found' });

    bloodReq.status = bloodReq.status === 'Open' ? 'Fulfilled' : 'Open';
    await bloodReq.save();
    res.json(bloodReq);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE /api/requests/:id
router.delete('/:id', async (req, res) => {
  try {
    await BloodRequest.findByIdAndDelete(req.params.id);
    res.json({ deleted: true, id: req.params.id });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;