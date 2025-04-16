import mongoose from 'mongoose';

const vehicleSchema = new mongoose.Schema({
  marque: { type: String, required: true },
  modele: { type: String, required: true },
  immatriculation: { type: String, required: true, unique: true },
  annee: { type: Number, required: true }
});

export default mongoose.model('Vehicle', vehicleSchema);
