'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import Navbar from '@/components/Nav';
import YouTube, { YouTubeEvent, YouTubePlayer } from 'react-youtube';

interface PlayerVars {
  autoplay: number;
  controls: number;
  showinfo: number;
  modestbranding: number;
  loop: number;
  rel: number;
  fs: number;
  disablekb: number;
  playsinline: number;
  enablejsapi: number;
  iv_load_policy: number;
  playlist: string;
  origin?: string;
}

const baseVideoOptions = {
    height: '100%',
    width: '100%',
    playerVars: {
      autoplay: 1,
      controls: 0,
      showinfo: 0,
      modestbranding: 1,
      loop: 1,
      rel: 0,
      fs: 0,
      disablekb: 1,
      playsinline: 1,
      enablejsapi: 1,
      iv_load_policy: 3,
      playlist: 'dQw4w9WgXcQ',
      mute: 1, // Initially muted to allow autoplay
    } as PlayerVars,
};

export default function VideoPage() {
    const playerRef = useRef<YouTubePlayer | null>(null);
    const isInitializedRef = useRef(false);
    const [mounted, setMounted] = useState(false);
    const [videoError, setVideoError] = useState(false);
    const [videoOptions, setVideoOptions] = useState(baseVideoOptions);
    const [hackingStage, setHackingStage] = useState(0);
    const [showVideo, setShowVideo] = useState(false);

    const hackingStages = [
      "INITIALIZING BREACH PROTOCOL...",
      "ACCESSING MAINFRAME...",
      "BYPASSING SECURITY...",
      "DECRYPTING DATABASE...",
      "ACCESS GRANTED!"
    ];

    useEffect(() => {
        setMounted(true);
        setVideoOptions({
          ...baseVideoOptions,
          playerVars: {
            ...baseVideoOptions.playerVars,
            origin: window.location.origin,
          },
        });

        const interval = setInterval(() => {
          setHackingStage((prev) => {
            if (prev >= hackingStages.length - 1) {
              clearInterval(interval);
              setTimeout(() => setShowVideo(true), 1000); // Small delay before showing video
              return prev;
            }
            return prev + 1;
          });
        }, 800);

        return () => clearInterval(interval);
      }, [hackingStages.length]);

      const initializePlayer = useCallback(() => {
        if (!playerRef.current || isInitializedRef.current) return;

        try {
          const player = playerRef.current;
          isInitializedRef.current = true;

          // Start video
          player.playVideo();

          // Wait before checking if player can accept commands
          setTimeout(() => {
            if (player && typeof player.unMute === 'function') {
              player.unMute();
              player.setVolume(100);
            } else {
              console.warn('Player not ready to accept commands yet.');
            }
          }, 1000);

        } catch (error) {
          console.error('Error initializing player:', error);
          setVideoError(true);
        }
      }, []);

      // Effect to initialize player after animation ends, with extra delay
      useEffect(() => {
        if (showVideo && playerRef.current) {
          const timeout = setTimeout(() => {
            initializePlayer();
          }, 500);

          return () => clearTimeout(timeout);
        }
      }, [showVideo, initializePlayer]);

      const handleVideoReady = (event: YouTubeEvent) => {
        const player = event.target;
        playerRef.current = player;

        // Start muted
        player.mute();
        player.playVideo();

        // Try to unmute after 500ms
        setTimeout(() => {
          if (player.isMuted()) {
            player.unMute();
            player.setVolume(100);
          }
        }, 100);
      };

    const handleStateChange = useCallback((event: YouTubeEvent) => {
      // If video stops for any reason, try to play again
      if (event.data === YouTube.PlayerState.ENDED ||
          event.data === YouTube.PlayerState.PAUSED) {
        event.target.playVideo();
      }
    }, []);

    if (!mounted) return null;

    return (
        <div className="relative min-h-screen flex flex-col bg-black">
            <Navbar />
            {!videoError && showVideo ? (
                <div className="absolute inset-0 overflow-hidden">
                    <div className="relative w-full h-full scale-150">
                        <div className="absolute inset-0 z-10" style={{ pointerEvents: 'all' }}></div>
                        <YouTube
                            videoId="dQw4w9WgXcQ"
                            opts={videoOptions}
                            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full"
                            onReady={handleVideoReady}
                            onError={() => setVideoError(true)}
                            onStateChange={handleStateChange}
                        />
                    </div>
                </div>
            ) : (
                <main className="relative z-10 flex-1 flex items-center justify-center">
                    <div className="backdrop-blur-sm bg-black/30 p-8 rounded-lg max-w-md w-full">
                        <div className="space-y-6 font-mono">
                            {hackingStages.map((stage, index) => (
                                <div
                                    key={index}
                                    className={`transition-opacity duration-500 ${
                                        index <= hackingStage ? 'opacity-100' : 'opacity-0'
                                    }`}
                                >
                                    <p className={`text-sm ${
                                        index === hackingStage ? 'text-green-400 animate-pulse' : 'text-green-600'
                                    }`}>
                                        {stage}
                                        {index === hackingStage && (
                                            <span className="inline-block animate-[blink_1s_step-end_infinite]">_</span>
                                        )}
                                    </p>
                                    {index === hackingStage && (
                                        <div className="h-1 w-full bg-gray-800 mt-2 rounded-full overflow-hidden">
                                            <div className="h-full bg-green-500 animate-[loading_2s_ease-in-out_infinite]" />
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </main>
            )}
        </div>
    );
}
