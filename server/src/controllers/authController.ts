import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

const prisma = new PrismaClient();

// Mock Email Sender
const sendActivationEmail = (email: string, token: string) => {
  console.log(`[EMAIL MOCK] To: ${email}, Activation Link: http://localhost:5173/activate?token=${token}`);
};

export const register = async (req: Request, res: Response) => {
  const { email, password, name } = req.body;

  // Basic Validation
  if (!email || !password || password.length < 6) {
    return res.status(400).json({ message: 'Invalid input data' });
  }

  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const activationToken = crypto.randomBytes(32).toString('hex');

    const user = await prisma.user.create({
      data: { 
        email, 
        password: hashedPassword, 
        name,
        isActive: false, // Require activation
        activationToken
      }
    });

    sendActivationEmail(email, activationToken);

    res.json({ message: 'Registration successful. Please check your email to activate account.' });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(404).json({ message: 'User not found' });

    if (!user.isActive) return res.status(403).json({ message: 'Account not activated' });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET as string, { expiresIn: '1h' });
    res.json({ token, user: { id: user.id, email: user.email, name: user.name, role: user.role } });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

export const me = async (req: Request, res: Response) => {
  // @ts-ignore
  const userId = req.user.id;
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) return res.status(404).json({ message: 'User not found' });
  res.json({ id: user.id, email: user.email, name: user.name, role: user.role });
}

export const activate = async (req: Request, res: Response) => {
  const { token } = req.body;
  try {
    const user = await prisma.user.findFirst({ where: { activationToken: token } });
    if (!user) return res.status(400).json({ message: 'Invalid token' });

    await prisma.user.update({
      where: { id: user.id },
      data: { isActive: true, activationToken: null }
    });

    res.json({ message: 'Account activated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Activation failed' });
  }
};
