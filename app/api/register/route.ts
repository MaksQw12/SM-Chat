import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import dbConnect from '@/shared/lib/dbConnect';
import User from '@/models/User';

export async function POST(req: NextRequest) {
  const { username, password } = await req.json();

  if (!username || !password) {
    return NextResponse.json({ message: 'Name and password are required' }, { status: 400 });
  }

  try {
    await dbConnect();

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return NextResponse.json({ message: 'User already exists' }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = new User({
      username,
      password: hashedPassword,
      isOnline: false,
      avatar: 'profile-user.png',
    });

    await newUser.save();
    return NextResponse.json({ message: 'User created successfully ' }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ message: 'Internal Server Error', err }, { status: 500 });
  }
}
