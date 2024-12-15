import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

interface JwtPayloadWithUserId extends jwt.JwtPayload {
  userId: string;
  username: string;
}

const JWT_SECRET = process.env.JWT_SECRET || '';

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get('Authorization');

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return NextResponse.json({ message: 'Authorization token not provided' }, { status: 401 });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayloadWithUserId;

    return NextResponse.json(
      {
        message: 'User is authorized',
        user: { userId: decoded.userId, username: decoded.username },
      },
      { status: 200 },
    );
  } catch (err) {
    return NextResponse.json({ message: 'Invalid or expired token' }, { status: 401 });
  }
}
