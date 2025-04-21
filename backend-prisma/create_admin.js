import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
dotenv.config();

const prisma = new PrismaClient();

async function main() {
  const username = 'admin';
  const password = 'admin123'; // À changer après première connexion
  const hashed = await bcrypt.hash(password, 10);
  const user = await prisma.user.findUnique({ where: { username } });
  if (user) {
    console.log("L'utilisateur admin existe déjà.");
  } else {
    await prisma.user.create({ data: { username, password: hashed } });
    console.log('Utilisateur admin créé : identifiant = admin, mot de passe = admin123');
  }
  await prisma.$disconnect();
}

main().catch(e => { console.error(e); prisma.$disconnect(); });
