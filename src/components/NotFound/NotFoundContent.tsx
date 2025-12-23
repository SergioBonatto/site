"use client";

import { Nav } from '@/components/Nav/Nav';

export default function NotFoundContent() {
  return (
    <div className="min-h-screen flex flex-col">
      <Nav />
      <main className="relative flex-1 flex items-center justify-center text-white text-center overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover -z-10"
          style={{ backgroundColor: 'grey', filter: 'brightness(0.7)' }}
        >
          <source
            src="/buzz-no-signs-of-intelligent-life.mp4"
            type="video/mp4"
          />
        </video>
        <div className="mt-auto pb-8">
          <h2 className="text-2xl font-bold">
            Seems like no sign of intelligent life anywhere. 🤨
          </h2>
        </div>
      </main>
    </div>
  );
}
