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
    const { targetUserId, messageText } = await req.json();

    if (!targetUserId || !messageText) {
      return NextResponse.json(
        { message: 'Target user ID and message text are required' },
        { status: 400 },
      );
    }

    const currentUserId = decoded.userId;

    const chat = await Chat.findOne({
      usersId: { $in: [currentUserId, targetUserId] },
    });

    if (!chat) {
      return NextResponse.json({ message: 'Chat does not exist' }, { status: 404 });
    }

    chat.messages.push({
      senderId: currentUserId,
      text: messageText,
      createdAt: new Date(),
    });

    await chat.save();

    return NextResponse.json({ success: true, chat }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: 'Invalid or expired token' }, { status: 401 });
  }
}
