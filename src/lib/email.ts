interface EmailOptions {
  to: string;
  subject: string;
  html: string;
}

export async function sendEmail({ to, subject, html }: EmailOptions): Promise<boolean> {
  // If in development, just log
  if (process.env.NODE_ENV === 'development' && !process.env.RESEND_API_KEY) {
    console.log('📧 [DEV MODE] Email sent to:', to);
    console.log('📝 [DEV MODE] Subject:', subject);
    console.log('📄 [DEV MODE] To enable real sending, configure RESEND_API_KEY');
    return true;
  }

  // Production: use Resend for real sending
  try {
    const { Resend } = await import('resend');
    const resend = new Resend(process.env.RESEND_API_KEY);

    const { data, error } = await resend.emails.send({
      from: 'Sergio Bonatto <onboarding@resend.dev>', // Free Resend domain for testing
      to: [to],
      subject,
      html,
    });

    if (error) {
      console.error('❌ Resend Error:', error);
      return false;
    }

    console.log('✅ Email sent via Resend:', data?.id);
    return true;
  } catch (error) {
    console.error('❌ Error sending email:', error);

    // Fallback: If Resend fails, just log (to not break the application)
    console.log('📧 [FALLBACK] Email to:', to);
    console.log('📝 [FALLBACK] Subject:', subject);
    return false;
  }
}

export function generateWelcomeEmail(email: string): string {
  const baseUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : process.env.NODE_ENV === 'production'
      ? 'https://bonatto.vercel.app'
      : 'http://localhost:3000';

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Welcome to Newsletter!</title>
      <style>
        body {
          font-family: 'MS Sans Serif', sans-serif;
          background-color: #c0c0c0;
          margin: 0;
          padding: 20px;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          background-color: white;
          border: 2px solid;
          border-color: white #808080 #808080 white;
          padding: 20px;
        }
        .header {
          background-color: #000080;
          color: white;
          padding: 10px 15px;
          margin: -20px -20px 20px -20px;
          font-weight: bold;
        }
        .content {
          line-height: 1.6;
          color: #000;
        }
        .button {
          display: inline-block;
          background-color: #c0c0c0;
          border: 2px solid;
          border-color: white #808080 #808080 white;
          padding: 8px 16px;
          text-decoration: none;
          color: #000;
          font-weight: bold;
          margin: 10px 0;
        }
        .footer {
          margin-top: 30px;
          padding-top: 20px;
          border-top: 1px solid #ccc;
          font-size: 12px;
          color: #666;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          📧 Newsletter - Sergio Bonatto
        </div>

        <div class="content">
          <h2>Welcome to the newsletter!</h2>

          <p>Hello! 👋</p>

          <p>Thank you for subscribing to the <strong>Sergio Bonatto</strong> blog newsletter!</p>

          <p>You will receive email notifications whenever a new post is published. Topics include:</p>

          <ul>
            <li>🔧 Development and programming</li>
            <li>📐 Formal proofs and mathematics</li>
            <li>💻 Technology in general</li>
            <li>🤔 Reflections and other interesting topics</li>
          </ul>

          <p>In the meantime, how about checking out the already published posts?</p>

          <a href="${baseUrl}/blog" class="button">📖 View Blog</a>

          <p>You can also follow via RSS feed:</p>
          <a href="${baseUrl}/feed.xml" class="button">🔗 RSS Feed</a>

          <p>See you soon! 🚀</p>
        </div>

        <div class="footer">
          <p>This email was sent to <strong>${email}</strong> because you subscribed to the newsletter.</p>
          <p>Blog: <a href="${baseUrl}">${baseUrl}</a></p>
        </div>
      </div>
    </body>
    </html>
  `;
}

export function generateNewPostEmail(email: string, post: { title: string; description: string; slug: string; date: string }): string {
  const baseUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : process.env.NODE_ENV === 'production'
      ? 'https://bonatto.vercel.app'
      : 'http://localhost:3000';

  const postUrl = `${baseUrl}/blog/${post.slug}`;

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>New Post: ${post.title}</title>
      <style>
        body {
          font-family: 'MS Sans Serif', sans-serif;
          background-color: #c0c0c0;
          margin: 0;
          padding: 20px;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          background-color: white;
          border: 2px solid;
          border-color: white #808080 #808080 white;
          padding: 20px;
        }
        .header {
          background-color: #000080;
          color: white;
          padding: 10px 15px;
          margin: -20px -20px 20px -20px;
          font-weight: bold;
        }
        .content {
          line-height: 1.6;
          color: #000;
        }
        .post-preview {
          background-color: #ececec;
          border: 2px solid;
          border-color: #808080 white white #808080;
          padding: 15px;
          margin: 20px 0;
        }
        .button {
          display: inline-block;
          background-color: #c0c0c0;
          border: 2px solid;
          border-color: white #808080 #808080 white;
          padding: 8px 16px;
          text-decoration: none;
          color: #000;
          font-weight: bold;
          margin: 10px 0;
        }
        .footer {
          margin-top: 30px;
          padding-top: 20px;
          border-top: 1px solid #ccc;
          font-size: 12px;
          color: #666;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          📝 New Post Published!
        </div>

        <div class="content">
          <h2>New blog post!</h2>

          <p>Hello! 👋</p>

          <p>A new post has been published on the <strong>Sergio Bonatto</strong> blog:</p>

          <div class="post-preview">
            <h3 style="color: #000080; margin-top: 0;">${post.title}</h3>
            <p style="color: #666; font-size: 14px; margin: 5px 0;">📅 ${new Date(post.date).toLocaleDateString('en-US')}</p>
            <p style="margin-bottom: 0;">${post.description}</p>
          </div>

          <a href="${postUrl}" class="button">📖 Read Full Post</a>

          <p>Hope you enjoy the read! 🚀</p>
        </div>

        <div class="footer">
          <p>You are receiving this email because you subscribed to the newsletter.</p>
          <p>Email: <strong>${email}</strong></p>
          <p>Blog: <a href="${baseUrl}">${baseUrl}</a></p>
        </div>
      </div>
    </body>
    </html>
  `;
}
