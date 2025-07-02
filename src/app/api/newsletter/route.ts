import { NextRequest, NextResponse } from 'next/server';
import { sendEmail, generateWelcomeEmail } from '@/lib/email';
import { isValidEmail, sanitizeEmail, SECURITY_HEADERS } from '@/lib/security';
import { DatabaseService } from '@/lib/database';

export async function POST(request: NextRequest) {
  try {
    console.log('📧 Newsletter signup request received');

    const body = await request.json();
    console.log('📝 Request body parsed:', { hasEmail: !!body?.email, emailType: typeof body?.email });

    if (!body || typeof body.email !== 'string') {
      console.error('❌ Invalid request body:', body);
      return NextResponse.json(
        { error: 'Invalid request body' },
        { status: 400 }
      );
    }

    const email = sanitizeEmail(body.email);
    console.log('🧹 Email sanitized:', email);

    if (!isValidEmail(email)) {
      console.error('❌ Invalid email format:', email);
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Verificar se já está inscrito usando o banco de dados
    console.log('� Checking if email already exists...');
    const alreadyExists = await DatabaseService.checkSubscriberExists(email);

    if (alreadyExists) {
      console.log('⚠️ Email already subscribed:', email);
      return NextResponse.json(
        { error: 'This email is already subscribed to the newsletter' },
        { status: 409 }
      );
    }

    // Adicionar novo subscriber no banco de dados
    console.log('💾 Adding subscriber to database...');
    const result = await DatabaseService.addSubscriber(email);

    if (!result.success) {
      console.error('❌ Failed to add subscriber:', result.error);
      return NextResponse.json(
        { error: result.error || 'Failed to subscribe' },
        { status: 500 }
      );
    }

    console.log('✅ New subscriber added:', result.subscriber);

    // Enviar email de boas-vindas
    try {
      console.log('📧 Attempting to send welcome email...');
      const emailSent = await sendEmail({
        to: email,
        subject: '📧 Welcome to Sergio Bonatto\'s Newsletter!',
        html: generateWelcomeEmail(email)
      });

      if (!emailSent) {
        console.error('❌ Failed to send welcome email to:', email);
        // Não falhar a inscrição se o email não puder ser enviado
      } else {
        console.log('✅ Welcome email sent successfully to:', email);
      }
    } catch (emailError) {
      console.error('❌ Error sending welcome email:', emailError);
      // Não falhar a inscrição se o email não puder ser enviado
    }

    console.log('✅ Newsletter signup completed successfully');
    return NextResponse.json(
      { message: 'Successfully subscribed! Check your email for confirmation.' },
      {
        status: 201,
        headers: SECURITY_HEADERS
      }
    );
  } catch (error) {
    console.error('❌ Error processing subscription:', error);

    // Log mais detalhado do erro
    if (error instanceof Error) {
      console.error('❌ Error name:', error.name);
      console.error('❌ Error message:', error.message);
      console.error('❌ Error stack:', error.stack);
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    console.log('📊 Fetching subscriber count...');
    const count = await DatabaseService.getSubscriberCount();

    return NextResponse.json({
      count: count,
      message: `${count} person(s) subscribed to the newsletter`
    }, {
      headers: SECURITY_HEADERS
    });
  } catch (error) {
    console.error('❌ Error fetching subscribers:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
