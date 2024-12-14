import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dbConnect from '@/shared/lib/dbConnect';
import User from '@/models/User';

const JWT_SECRET = process.env.JWT_SECRET || '';

export async function POST(req: NextRequest) {
  const { username, password } = await req.json();

  if (!username || !password) {
    return NextResponse.json({ message: 'Name and password are required' }, { status: 400 });
  }

  try {
    await dbConnect();

    const user = await User.findOne({ username });

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json({ message: 'Invalid password' }, { status: 401 });
    }

    const token = jwt.sign({ userId: user._id, username: user.username }, JWT_SECRET, {
      expiresIn: '7d',
    });

    return NextResponse.json({ message: 'Login successful', token }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: 'Internal Server Error', err }, { status: 500 });
  }
}
