import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

interface Subscriber {
  email: string;
  subscribedAt: string;
  verified: boolean;
}

const subscribersFile = path.join(process.cwd(), 'data', 'subscribers.json');

function getSubscribers(): Subscriber[] {
  if (!fs.existsSync(subscribersFile)) {
    return [];
  }

  const data = fs.readFileSync(subscribersFile, 'utf8');
  return JSON.parse(data);
}

function saveSubscribers(subscribers: Subscriber[]) {
  const dataDir = path.dirname(subscribersFile);
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  fs.writeFileSync(subscribersFile, JSON.stringify(subscribers, null, 2));
}

// GET - List subscribers count (protected)
export async function GET(request: NextRequest) {
  try {
    // Check authentication for sensitive operations
    const authHeader = request.headers.get('authorization');
    const expectedAuth = process.env.NOTIFY_SECRET || 'dev-secret';

    if (authHeader !== `Bearer ${expectedAuth}`) {
      // Return only count for unauthenticated requests
      const subscribers = getSubscribers();
      return NextResponse.json({
        count: subscribers.length,
        message: `${subscribers.length} person(s) subscribed to the newsletter`
      }, {
        headers: {
          'X-Content-Type-Options': 'nosniff',
          'X-Frame-Options': 'DENY',
          'X-XSS-Protection': '1; mode=block'
        }
      });
    }

    // Return full data only for authenticated requests
    const subscribers = getSubscribers();
    return NextResponse.json({
      subscribers: subscribers.map(sub => ({
        email: sub.email,
        subscribedAt: sub.subscribedAt,
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

// DELETE - Remove specific subscriber or clear all
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');
    const clearAll = searchParams.get('clear') === 'all';

    // Check authentication
    const authHeader = request.headers.get('authorization');
    const expectedAuth = process.env.NOTIFY_SECRET || 'dev-secret';

    if (authHeader !== `Bearer ${expectedAuth}`) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const subscribers = getSubscribers();

    if (clearAll) {
      // Clear all subscribers
      saveSubscribers([]);
      return NextResponse.json({
        message: 'All subscribers have been removed',
        removedCount: subscribers.length
      }, {
        headers: {
          'X-Content-Type-Options': 'nosniff',
          'X-Frame-Options': 'DENY',
          'X-XSS-Protection': '1; mode=block'
        }
      });
    }

    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        { error: 'Valid email is required' },
        { status: 400 }
      );
    }

    // Sanitize email input
    const sanitizedEmail = email.trim().toLowerCase();

    // Remove specific subscriber
    const initialCount = subscribers.length;
    const filteredSubscribers = subscribers.filter(sub => sub.email !== sanitizedEmail);

    if (filteredSubscribers.length === initialCount) {
      return NextResponse.json(
        { error: 'Email not found' },
        { status: 404 }
      );
    }

    saveSubscribers(filteredSubscribers);

    return NextResponse.json({
      message: `Subscriber ${sanitizedEmail} removed successfully`,
      removedEmail: sanitizedEmail
    }, {
      headers: {
        'X-Content-Type-Options': 'nosniff',
        'X-Frame-Options': 'DENY',
        'X-XSS-Protection': '1; mode=block'
      }
    });

  } catch (error) {
    console.error('Error removing subscriber:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
