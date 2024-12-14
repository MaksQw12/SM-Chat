import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

interface JwtPayloadWithUserId extends jwt.JwtPayload {
  userId: string;
  username: string;
}

const JWT_SECRET = process.env.JWT_SECRET || '';
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || '';

export async function POST(req: NextRequest) {
  const { refreshToken } = await req.json();

  if (!refreshToken) {
    return NextResponse.json({ message: 'No refresh token provided' }, { status: 401 });
  }

  try {
    const decoded = jwt.verify(refreshToken, JWT_REFRESH_SECRET) as JwtPayloadWithUserId;

    const accessToken = jwt.sign(
      { userId: decoded.userId, username: decoded.username },
      JWT_SECRET,
      { expiresIn: '12h' },
    );

    return NextResponse.json({ accessToken }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: 'Invalid refresh token' }, { status: 401 });
  }
}
