import { NextRequest, NextResponse } from 'next/server';
import { DatabaseService } from '@/lib/database';

// GET - List subscribers count (protected)
export async function GET(request: NextRequest) {
  try {
    // Check authentication for sensitive operations
    const authHeader = request.headers.get('authorization');
    const expectedAuth = process.env.NOTIFY_SECRET || 'dev-secret';

    if (authHeader !== `Bearer ${expectedAuth}`) {
      // Return only count for unauthenticated requests
      const count = await DatabaseService.getSubscriberCount();
      return NextResponse.json({
        count: count,
        message: `${count} person(s) subscribed to the newsletter`
      }, {
        headers: {
          'X-Content-Type-Options': 'nosniff',
          'X-Frame-Options': 'DENY',
          'X-XSS-Protection': '1; mode=block'
        }
      });
    }

    // Return full data only for authenticated requests
    const subscribers = await DatabaseService.getSubscribers();
    return NextResponse.json({
      subscribers: subscribers.map(sub => ({
        email: sub.email,
        subscribedAt: sub.subscribed_at,
        verified: sub.verified
      })),
      count: subscribers.length
    }, {
      headers: {
        'X-Content-Type-Options': 'nosniff',
        'X-Frame-Options': 'DENY',
        'X-XSS-Protection': '1; mode=block'
      }
    });
  } catch (error) {
    console.error('Error fetching subscribers:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Note: DELETE operations would need to be implemented in DatabaseService
// For now, keeping the file focused on the main functionality
