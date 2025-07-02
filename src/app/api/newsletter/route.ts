import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { sendEmail, generateWelcomeEmail } from '@/lib/email';
import { isValidEmail, sanitizeEmail, SECURITY_HEADERS } from '@/lib/security';

interface Subscriber {
  email: string;
  subscribedAt: string;
  verified: boolean;
}

const subscribersFile = path.join(process.cwd(), 'data', 'subscribers.json');

function ensureDataDirectory() {
  const dataDir = path.dirname(subscribersFile);
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  if (!fs.existsSync(subscribersFile)) {
    fs.writeFileSync(subscribersFile, JSON.stringify([]));
  }
}

function getSubscribers(): Subscriber[] {
  ensureDataDirectory();
  const data = fs.readFileSync(subscribersFile, 'utf8');
  return JSON.parse(data);
}

function saveSubscribers(subscribers: Subscriber[]) {
  ensureDataDirectory();
  fs.writeFileSync(subscribersFile, JSON.stringify(subscribers, null, 2));
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    if (!body || typeof body.email !== 'string') {
      return NextResponse.json(
        { error: 'Invalid request body' },
        { status: 400 }
      );
    }

    const email = sanitizeEmail(body.email);

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    const subscribers = getSubscribers();

    // Verificar se já está inscrito
    const existingSubscriber = subscribers.find(sub => sub.email === email);
    if (existingSubscriber) {
      return NextResponse.json(
        { error: 'This email is already subscribed to the newsletter' },
        { status: 409 }
      );
    }

    // Adicionar novo subscriber
    const newSubscriber: Subscriber = {
      email,
      subscribedAt: new Date().toISOString(),
      verified: true
    };

    subscribers.push(newSubscriber);
    saveSubscribers(subscribers);

    try {
      const emailSent = await sendEmail({
        to: email,
        subject: '📧 Welcome to Sergio Bonatto\'s Newsletter!',
        html: generateWelcomeEmail(email)
      });

      if (!emailSent) {
        console.error('Failed to send welcome email to:', email);
      }
    } catch (emailError) {
      console.error('Error sending welcome email:', emailError);
      // Don't fail the subscription if the email can't be sent
    }

    return NextResponse.json(
      { message: 'Successfully subscribed! Check your email for confirmation.' },
      { 
        status: 201,
        headers: SECURITY_HEADERS
      }
    );
  } catch (error) {
    console.error('Error processing subscription:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const subscribers = getSubscribers();
    return NextResponse.json({
      count: subscribers.length,
      message: `${subscribers.length} person(s) subscribed to the newsletter`
    }, {
      headers: SECURITY_HEADERS
    });
  } catch (error) {
    console.error('Error fetching subscribers:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
