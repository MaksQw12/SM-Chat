import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import dbConnect from '@/shared/lib/dbConnect';
import User from '@/models/User';

const JWT_SECRET = process.env.JWT_SECRET || '';

export async function GET(req: NextRequest) {
  try {
    const token = req.headers.get('authorization')?.split(' ')[1];

    if (!token) {
      return NextResponse.json({ message: 'No token provided' }, { status: 401 });
    }

    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string; username: string };

    await dbConnect();

    const currentUserId = decoded.userId;

    const users = await User.find({ _id: { $ne: currentUserId } }).select(
      'username isOnline avatar',
    );

    return NextResponse.json({ users }, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { message: 'Unauthorized or Internal Server Error', err },
      { status: 401 },
    );
  }
}
