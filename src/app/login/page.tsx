'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import YouTube, { YouTubeEvent, YouTubePlayer } from 'react-youtube';
import { Nav } from '@/components/Nav/Nav';

interface PlayerState {
  isReady: boolean;
  isPlaying: boolean;
  isInitialized: boolean;
  hasError: boolean;
  isMuted: boolean;
}

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

const YOUTUBE_VIDEO_ID = 'dQw4w9WgXcQ';
const LOADING_STAGES = [
  "Authenticating credentials",
  "Establishing secure connection",
  "Verifying identity",
  "Loading user profile",
  "Welcome back"
] as const;

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
    playlist: YOUTUBE_VIDEO_ID,
    mute: 1,
  } as PlayerVars,
};

export default function VideoPage() {
  const playerRef = useRef<YouTubePlayer | null>(null);
  const unmutingRef = useRef(false);
  const [playerState, setPlayerState] = useState<PlayerState>({
    isReady: false,
    isPlaying: false,
    isInitialized: false,
    hasError: false,
    isMuted: true
  });
  const [mounted, setMounted] = useState(false);
  const [loadingStage, setLoadingStage] = useState(0);
  const [showVideo, setShowVideo] = useState(false);

  const updatePlayerState = useCallback((updates: Partial<PlayerState>) => {
    setPlayerState(prev => ({ ...prev, ...updates }));
  }, []);

  const unmuteVideo = useCallback(() => {
    if (!playerRef.current || unmutingRef.current) return;

    try {
      unmutingRef.current = true;
      const player = playerRef.current;

      player.setVolume(100);
      player.unMute();

      updatePlayerState({ isMuted: false });
      unmutingRef.current = false;
    } catch (error) {
      console.error('Error unmuting video:', error);
      unmutingRef.current = false;
    }
  }, [updatePlayerState]);

  const initializePlayer = useCallback(() => {
    if (!playerRef.current || playerState.isInitialized) return;

    try {
      const player = playerRef.current;
      updatePlayerState({ isInitialized: true });

      player.mute();
      player.playVideo();

      const interval = setInterval(() => {
        if (player.getPlayerState() === YouTube.PlayerState.PLAYING) {
          unmuteVideo();
          clearInterval(interval);
        }
      }, 50);

      setTimeout(() => clearInterval(interval), 2000);

      return () => clearInterval(interval);
    } catch (error) {
      console.error('Error in player initialization:', error);
      updatePlayerState({ hasError: true });
    }
  }, [playerState.isInitialized, unmuteVideo, updatePlayerState]);

  useEffect(() => {
    setMounted(true);

    const interval = setInterval(() => {
      setLoadingStage(prev => {
        if (prev >= LOADING_STAGES.length - 1) {
          clearInterval(interval);
          setTimeout(() => setShowVideo(true), 1000);
          return prev;
        }
        return prev + 1;
      });
    }, 800);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (showVideo && playerRef.current && !playerState.isInitialized) {
      initializePlayer();
    }
  }, [showVideo, playerState.isInitialized, initializePlayer]);

  const handleStateChange = useCallback((event: YouTubeEvent) => {
    const player = event.target;
    const currentState = player.getPlayerState();

    if (currentState === YouTube.PlayerState.PLAYING) {
      updatePlayerState({ isPlaying: true });

      if (player.isMuted()) {
        unmuteVideo();
      }
    } else if (currentState === YouTube.PlayerState.ENDED ||
              currentState === YouTube.PlayerState.PAUSED) {
      try {
        player.playVideo();
      } catch (err) {
        console.error('Error resuming video:', err);
      }
    }
  }, [updatePlayerState, unmuteVideo]);

  const handleVideoReady = useCallback((event: YouTubeEvent) => {
    const player = event.target;
    playerRef.current = player;
    updatePlayerState({ isReady: true });

    try {
      player.mute();
      player.playVideo();
    } catch (error) {
      console.error('Error in video ready handler:', error);
    }
  }, [updatePlayerState]);

  if (!mounted) return null;

  return (
    <div className="relative min-h-screen flex flex-col" style={{ background: 'var(--syntaxBg)' }}>
      <Nav/>

      {!playerState.hasError && showVideo ? (
        <div className="absolute inset-0 overflow-hidden">
          <div className="relative w-full h-full scale-150">
            <div className="absolute inset-0 z-10" />
            <YouTube
              videoId={YOUTUBE_VIDEO_ID}
              opts={{
                ...baseVideoOptions,
                playerVars: {
                  ...baseVideoOptions.playerVars,
                  origin: typeof window !== 'undefined' ? window.location.origin : undefined,
                },
              }}
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full"
              onReady={handleVideoReady}
              onError={() => updatePlayerState({ hasError: true })}
              onStateChange={handleStateChange}
            />
          </div>
        </div>
      ) : (
        <LoadingAnimation
          stage={loadingStage}
          stages={LOADING_STAGES}
        />
      )}
    </div>
  );
}

function LoadingAnimation({
  stage,
  stages
}: {
  stage: number;
  stages: readonly string[];
}) {
  return (
    <main className="relative z-10 flex-1 flex items-center justify-center p-4">
      <div className="relative">
        {/* Glow effect */}
        <div className="absolute inset-0 blur-3xl rounded-full opacity-20" style={{ background: 'var(--hue2)' }} />

        <div className="relative backdrop-blur-xl rounded-2xl shadow-2xl max-w-md w-full p-8 sm:p-12" style={{
          background: 'var(--syntaxCursor)',
          border: `1px solid ${getComputedStyle(document.documentElement).getPropertyValue('--mono4').trim() || '#4b5263'}40`
        }}>
          {/* Header */}
          <div className="mb-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 shadow-lg" style={{
              background: `linear-gradient(135deg, ${getComputedStyle(document.documentElement).getPropertyValue('--hue2').trim()}, ${getComputedStyle(document.documentElement).getPropertyValue('--hue1').trim()})`,
              boxShadow: `0 10px 40px ${getComputedStyle(document.documentElement).getPropertyValue('--hue2').trim()}50`
            }}>
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="white">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h1 className="text-2xl font-semibold mb-2" style={{ color: 'var(--mono1)' }}>Secure Login</h1>
            <p className="text-sm" style={{ color: 'var(--mono3)' }}>Processing authentication</p>
          </div>

          {/* Loading stages */}
          <div className="space-y-4">
            {stages.map((stageText, index) => (
              <div
                key={index}
                className={`transition-all duration-500 ${
                  index <= stage ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
                }`}
              >
                <div className="flex items-center gap-3">
                  {index < stage ? (
                    <div className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center shadow-lg" style={{
                      background: `linear-gradient(135deg, ${getComputedStyle(document.documentElement).getPropertyValue('--hue4').trim()}, ${getComputedStyle(document.documentElement).getPropertyValue('--hue1').trim()})`,
                      boxShadow: `0 4px 12px ${getComputedStyle(document.documentElement).getPropertyValue('--hue4').trim()}30`
                    }}>
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="white">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  ) : index === stage ? (
                    <div className="flex-shrink-0 w-5 h-5 rounded-full border-2 border-t-transparent animate-spin" style={{ borderColor: `var(--hue2) transparent var(--hue2) var(--hue2)` }} />
                  ) : (
                    <div className="flex-shrink-0 w-5 h-5 rounded-full border-2" style={{ borderColor: 'var(--mono4)' }} />
                  )}

                  <span className={`text-sm font-medium transition-colors`} style={{
                    color: index < stage ? 'var(--mono3)' : index === stage ? 'var(--hue2)' : 'var(--mono4)'
                  }}>
                    {stageText}
                  </span>
                </div>

                {index === stage && (
                  <div className="mt-3 ml-8 h-1 w-full rounded-full overflow-hidden" style={{ background: 'var(--syntaxCursor)' }}>
                    <div className="h-full rounded-full animate-[loading_1.5s_ease-in-out_infinite] shadow-lg" style={{
                      background: `linear-gradient(90deg, ${getComputedStyle(document.documentElement).getPropertyValue('--hue2').trim()}, ${getComputedStyle(document.documentElement).getPropertyValue('--hue1').trim()})`,
                      boxShadow: `0 0 12px ${getComputedStyle(document.documentElement).getPropertyValue('--hue2').trim()}50`
                    }} />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="mt-8 pt-6 text-center" style={{ borderTop: `1px solid ${getComputedStyle(document.documentElement).getPropertyValue('--mono4').trim() || '#4b5263'}40` }}>
            <p className="text-xs" style={{ color: 'var(--mono3)' }}>
              {stage === stages.length - 1 ? 'Redirecting...' : 'Please wait'}
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes loading {
          0%, 100% {
            transform: translateX(-100%);
          }
          50% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </main>
  );
}
