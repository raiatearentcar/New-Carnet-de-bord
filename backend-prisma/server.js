import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
import authRoutes from './routes/auth.js';
import vehicleRoutes from './routes/vehicle.js';
import serviceRoutes from './routes/service.js';
import { authMiddleware } from './middleware/auth.js';

dotenv.config();
const prisma = new PrismaClient();
const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', (req, res, next) => { req.prisma = prisma; next(); }, authRoutes);
app.use('/api/vehicles', authMiddleware, (req, res, next) => { req.prisma = prisma; next(); }, vehicleRoutes);
app.use('/api/services', authMiddleware, (req, res, next) => { req.prisma = prisma; next(); }, serviceRoutes);

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log('Server running on port', PORT));
