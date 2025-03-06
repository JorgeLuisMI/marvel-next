import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET() {
  const cookieStore = await cookies();
  const favoritesCookie = cookieStore.get('favorites');

  if (!favoritesCookie) {
    return NextResponse.json({ favorites: [] });
  }

  try {
    const favorites = JSON.parse(favoritesCookie.value);
    return NextResponse.json({ favorites });
  } catch (error) {
    console.error('Error reading favorites from cookies:', error);
    return NextResponse.json({ favorites: [] });
  }
}

export async function POST(request: Request) {
  try {
    const { favorites } = await request.json();

    if (!Array.isArray(favorites)) {
      return NextResponse.json(
        { error: 'Invalid favorites data' },
        { status: 400 }
      );
    }

    const cookieStore = await cookies();
    cookieStore.set('favorites', JSON.stringify(favorites), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 30, // 30 días
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating favorites:', error);
    return NextResponse.json(
      { error: 'Error updating favorites' },
      { status: 500 }
    );
  }
}
