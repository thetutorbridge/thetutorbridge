import { NextRequest, NextResponse } from 'next/server';
import { checkUsageStats, getUserByEmail } from '@/lib/freemium';

export async function POST(request: NextRequest) {
  try {
    const { sessionId, userEmail } = await request.json();

    let userId: string | undefined;
    
    // If user email is provided, get user ID
    if (userEmail) {
      const user = await getUserByEmail(userEmail);
      userId = user?.id;
    }

    // Check usage stats
    const stats = await checkUsageStats(userId, sessionId);

    console.log('📊 Usage check:', {
      sessionId: sessionId?.substring(0, 20) + '...',
      userEmail,
      stats
    });

    return NextResponse.json({
      success: true,
      ...stats
    });

  } catch (error) {
    console.error('❌ Usage check failed:', error);
    
    return NextResponse.json(
      { error: 'Failed to check usage' },
      { status: 500 }
    );
  }
}
