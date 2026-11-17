const express = require('express');
const Donor = require('../models/Donor');

const router = express.Router();
const nameRegex = /^[A-Za-z\s]+$/;

// GET /api/donors
router.get('/', async (req, res) => {
  try {
    const { query = '', bloodGroup = 'ALL', onlyAvailable = 'false' } = req.query;
    const filter = {};

    if (query.trim()) {
      const regex = new RegExp(query.trim(), 'i');
      filter.$or = [{ fullName: regex }, { city: regex }];
    }
    if (bloodGroup !== 'ALL') {
      filter.bloodGroup = bloodGroup;
    }
    if (onlyAvailable === 'true') {
      filter.available = true;
    }

    const donors = await Donor.find(filter).sort({ createdAt: -1 });
    res.json(donors);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/donors
router.post('/', async (req, res) => {
  try {
    const { fullName, bloodGroup, city, phone, lastDonationDate, donationsCount } = req.body;
    const rawDigits = String(phone || '').replace(/\D/g, '');

    if (!nameRegex.test(String(fullName || '').trim())) {
      return res.status(400).json({ message: 'Validation Error: Full name cannot contain numbers or symbols.' });
    }
    if (rawDigits.length !== 11) {
      return res.status(400).json({ message: 'Validation Error: Phone number must consist of exactly 11 digits.' });
    }

    const newDonor = await Donor.create({
      fullName,
      bloodGroup,
      city,
      phone,
      lastDonationDate: lastDonationDate || '',
      donationsCount: Number(donationsCount) || 0,
      available: true,
    });

    res.status(201).json(newDonor);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PATCH /api/donors/:id/availability
router.patch('/:id/availability', async (req, res) => {
  try {
    const donor = await Donor.findById(req.params.id);
    if (!donor) return res.status(404).json({ message: 'Donor not found' });

    donor.available = !donor.available;
    await donor.save();
    res.json(donor);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE /api/donors/:id
router.delete('/:id', async (req, res) => {
  try {
    await Donor.findByIdAndDelete(req.params.id);
    res.json({ deleted: true, id: req.params.id });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
