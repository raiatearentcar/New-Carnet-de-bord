import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema({
  vehicle: { type: mongoose.Schema.Types.ObjectId, ref: 'Vehicle', required: true },
  type: { type: String, required: true },
  date: { type: Date, required: true },
  details: { type: String }
});

export default mongoose.model('Service', serviceSchema);
