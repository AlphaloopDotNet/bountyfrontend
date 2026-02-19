import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password, role } = body;

    // ---- Validation ----
    if (!email || !password || !role) {
      return NextResponse.json(
        { error: 'Email, password, and role are required' },
        { status: 400 }
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        { error: 'Password must be at least 8 characters' },
        { status: 400 }
      );
    }

    const validRoles = ['BRAND_MANAGER', 'COMPANY', 'AGENCY','BRAND', 'INFLUENCER'];
    console.log('Received registration request with role:', role);
    if (!validRoles.includes(role.toUpperCase())) {
      return NextResponse.json(
        { error: 'Invalid role selected' },
        { status: 400 }
      );
    }

    // ---- Check if email already exists ----
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json(
        { error: 'An account with this email already exists' },
        { status: 409 }
      );
    }

    // ---- Hash password ----
    const hashedPassword = await bcrypt.hash(password, 12);

    // ---- Create user in DB ----
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        // phone: phone || null,
        role,
      },
    });

    // Return success — frontend will then call signIn()
    return NextResponse.json(
      {
        success: true,
        user: {
          id: user.id,
          email: user.email,
          role: user.role,
        },
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('[REGISTER ERROR]', error);
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    );
  }
}