import express from 'express';
const router = express.Router();

// Add vehicle
router.post('/', async (req, res) => {
  const prisma = req.prisma;
  try {
    const { marque, modele, immatriculation, annee } = req.body;
    const vehicle = await prisma.vehicle.create({
      data: { marque, modele, immatriculation, annee: parseInt(annee) }
    });
    res.status(201).json(vehicle);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all vehicles
router.get('/', async (req, res) => {
  const prisma = req.prisma;
  try {
    const vehicles = await prisma.vehicle.findMany();
    res.json(vehicles);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update vehicle
router.put('/:id', async (req, res) => {
  const prisma = req.prisma;
  try {
    const { marque, modele, immatriculation, annee } = req.body;
    const vehicle = await prisma.vehicle.update({
      where: { id: parseInt(req.params.id) },
      data: { marque, modele, immatriculation, annee: parseInt(annee) }
    });
    res.json(vehicle);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete vehicle
router.delete('/:id', async (req, res) => {
  const prisma = req.prisma;
  try {
    await prisma.vehicle.delete({ where: { id: parseInt(req.params.id) } });
    res.json({ message: 'Véhicule supprimé' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
