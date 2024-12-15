import { NextRequest, NextResponse } from 'next/server';
import Chat from '@/models/Chat';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || '';

export async function POST(req: NextRequest) {
  const authHeader = req.headers.get('Authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return NextResponse.json({ message: 'Authorization token not provided' }, { status: 401 });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as jwt.JwtPayload & { userId: string };
    const { targetUserId } = await req.json();

    if (!targetUserId) {
      return NextResponse.json({ message: 'Target user ID is required' }, { status: 400 });
    }

    const currentUserId = decoded.userId;

    const existingChat = await Chat.findOne({
      usersId: { $all: [currentUserId, targetUserId] },
    });

    if (existingChat) {
      return NextResponse.json({ success: true, chat: existingChat }, { status: 200 });
    }

    const newChat = await Chat.create({
      usersId: [currentUserId, targetUserId],
      messages: [],
    });

    return NextResponse.json({ success: true, chat: newChat }, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: 'Invalid or expired token' }, { status: 401 });
  }
}
