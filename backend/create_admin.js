import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import User from './models/User.js';
dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/garage';

async function createAdmin() {
  await mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
  const username = 'admin';
  const password = 'admin123'; // À changer après première connexion
  const hashed = await bcrypt.hash(password, 10);
  const exists = await User.findOne({ username });
  if (exists) {
    console.log('L\'utilisateur admin existe déjà.');
  } else {
    await User.create({ username, password: hashed });
    console.log('Utilisateur admin créé : identifiant = admin, mot de passe = admin123');
  }
  await mongoose.disconnect();
}

createAdmin();
