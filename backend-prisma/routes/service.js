import express from 'express';
const router = express.Router();

// Add service
router.post('/', async (req, res) => {
  const prisma = req.prisma;
  try {
    const { vehicle, type, date, details } = req.body;
    const service = await prisma.service.create({
      data: {
        vehicleId: parseInt(vehicle),
        type,
        date: new Date(date),
        details
      }
    });
    res.status(201).json(service);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all services for a vehicle
router.get('/vehicle/:vehicleId', async (req, res) => {
  const prisma = req.prisma;
  try {
    const services = await prisma.service.findMany({
      where: { vehicleId: parseInt(req.params.vehicleId) },
      orderBy: { date: 'desc' }
    });
    res.json(services);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a service
router.delete('/:id', async (req, res) => {
  const prisma = req.prisma;
  try {
    await prisma.service.delete({ where: { id: parseInt(req.params.id) } });
    res.json({ message: 'Service supprimé' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
