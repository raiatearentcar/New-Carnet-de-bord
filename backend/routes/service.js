import express from 'express';
import Service from '../models/Service.js';
import Vehicle from '../models/Vehicle.js';

const router = express.Router();

// Add service
router.post('/', async (req, res) => {
  try {
    const { vehicle, type, date, details } = req.body;
    const vehicleExists = await Vehicle.findById(vehicle);
    if (!vehicleExists) return res.status(404).json({ error: 'Vehicle not found' });
    const service = new Service({ vehicle, type, date, details });
    await service.save();
    res.status(201).json(service);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all services for a vehicle
router.get('/vehicle/:vehicleId', async (req, res) => {
  try {
    const services = await Service.find({ vehicle: req.params.vehicleId }).sort({ date: -1 });
    res.json(services);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a service
router.delete('/:id', async (req, res) => {
  try {
    const service = await Service.findByIdAndDelete(req.params.id);
    if (!service) return res.status(404).json({ error: 'Service not found' });
    res.json({ message: 'Service deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
