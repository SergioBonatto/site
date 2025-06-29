import { NextRequest } from 'next/server';
import { ImageResponse } from 'next/og';
import React from 'react';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get('title') || 'Sergio Bonatto - Full Stack Developer';
  const description = searchParams.get('description') || 'Full Stack Developer specializing in modern web technologies';

  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #0d9488 0%, #065f46 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'Inter, sans-serif',
          color: 'white',
          padding: '60px',
        }}
      >
        <div
          style={{
            fontSize: 72,
            fontWeight: 'bold',
            textAlign: 'center',
            marginBottom: 32,
            lineHeight: 1.2,
          }}
        >
          {title}
        </div>
        <div
          style={{
            fontSize: 32,
            textAlign: 'center',
            opacity: 0.9,
            maxWidth: 800,
            lineHeight: 1.4,
          }}
        >
          {description}
        </div>
        <div
          style={{
            position: 'absolute',
            bottom: 40,
            right: 60,
            fontSize: 24,
            opacity: 0.8,
          }}
        >
          bonatto.vercel.app
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
