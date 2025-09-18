import { NextRequest, NextResponse } from 'next/server';
import { registerUser, getUserByEmail } from '@/lib/freemium';

export async function POST(request: NextRequest) {
  try {
    const { name, email, country, academic_level } = await request.json();

    // Validate required fields
    if (!name || !email) {
      return NextResponse.json(
        { error: 'Name and email are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address' },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return NextResponse.json(
        { error: 'This email is already registered' },
        { status: 409 }
      );
    }

    // Register the new user
    const userData = {
      name: name.trim(),
      email: email.toLowerCase().trim(),
      country: country || null,
      academic_level: academic_level || null
    };

    const newUser = await registerUser(userData);

    console.log('✅ New user registered:', newUser.email);

    return NextResponse.json({
      success: true,
      user: newUser,
      message: 'Registration successful! You now have 1 additional free study guide.'
    });

  } catch (error) {
    console.error('❌ User registration failed:', error);
    
    if (error instanceof Error && error.message.includes('duplicate key')) {
      return NextResponse.json(
        { error: 'This email is already registered' },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { error: 'Registration failed. Please try again.' },
      { status: 500 }
    );
  }
}
