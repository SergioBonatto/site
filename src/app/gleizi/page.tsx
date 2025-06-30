'use client';

import { useEffect, useState, useRef } from 'react';
import Navbar from '@/components/Nav';
import Footer from '@/components/Footer/footer';
import { WIN95_COLORS, WIN95_CLASSES, WIN95_INLINE_STYLES } from '@/styles/win95';

export default function GleiziPage() {
  const [currentLine, setCurrentLine] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  const [isComplete, setIsComplete] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [audioReady, setAudioReady] = useState(false);
  const [musicStarted, setMusicStarted] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const poemLines = [
    "Entre as linhas do código e do tempo,",
    "cresceu algo que nem o tempo quebra.",
    "Não foi dito, mas já é certo.",
    "Não foi selado, mas já é destino.",
    "",
    "Nos olhos dela, o mundo recompila.",
    "No riso, um commit sem erro.",
    "Na presença, um fluxo contínuo—",
    "não de bytes, mas de vida.",
    "",
    "Trabalhamos lado a lado,",
    "mas o que criamos é mais que projeto.",
    "É um laço que nem precisa de pull request,",
    "porque já está fundido em mim.",
    "",
    "Ela ainda não sabe,",
    "mas já estamos escrevendo juntos",
    "um script que começa assim:",
    '"Era uma vez nós dois—"',
    "",
    "e não tem fim."
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentLine(prev => {
        if (prev < poemLines.length - 1) {
          return prev + 1;
        } else {
          setIsComplete(true);
          return prev;
        }
      });
    }, 1500);

    return () => clearInterval(timer);
  }, [poemLines.length]);

  useEffect(() => {
    const cursorTimer = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);

    return () => clearInterval(cursorTimer);
  }, []);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (!isComplete) return;

      if (event.code === 'Space') {
        // Pausar/retomar o áudio
        if (audioRef.current) {
          if (isPlaying) {
            audioRef.current.pause();
            setIsPlaying(false);
            setIsPaused(true);
          } else if (isPaused) {
            setIsLoading(true);
            const playPromise = audioRef.current.play();

            if (playPromise !== undefined) {
              playPromise
                .then(() => {
                  setIsPlaying(true);
                  setIsLoading(false);
                  setIsPaused(false);
                })
                .catch((error) => {
                  console.log('Erro ao retomar áudio:', error);
                  setIsLoading(false);
                });
            }
          }
        }
      } else {
        // Qualquer outra tecla toca o áudio do início
        if (audioRef.current && !isPlaying) {
          setIsLoading(true);

          const playPromise = audioRef.current.play();

          if (playPromise !== undefined) {
            playPromise
              .then(() => {
                setIsPlaying(true);
                setIsLoading(false);
                setMusicStarted(true);
                setIsPaused(false);
              })
              .catch((error) => {
                console.log('Erro ao tocar áudio:', error);
                setIsLoading(false);
              });
          }
        }
      }
    };

    if (isComplete) {
      window.addEventListener('keydown', handleKeyPress);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [isComplete, isPlaying, isPaused]);

  // Preload do áudio quando o poema terminar
  useEffect(() => {
    if (isComplete && audioRef.current && !audioReady) {
      audioRef.current.load();
    }
  }, [isComplete, audioReady]);

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{
        backgroundColor: musicStarted ? 'transparent' : WIN95_COLORS.background,
        backgroundImage: musicStarted ? 'url(/cat.jpg)' : 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <Navbar />
      <main className="flex-1 flex items-center justify-center px-4 pt-24 pb-8">
        <div className="max-w-4xl w-full mt-8">
          {/* Win95 Window */}
          <div
            className="bg-gray-300"
            style={{
              borderTop: '2px solid #ffffff',
              borderLeft: '2px solid #ffffff',
              borderRight: '2px solid #808080',
              borderBottom: '2px solid #808080',
              boxShadow: '2px 2px 4px rgba(0,0,0,0.3)',
              backgroundColor: isPlaying ? 'rgba(192, 192, 192, 0.1)' : '#c0c0c0',
              opacity: isPlaying ? 0.9 : 1
            }}
          >
            <div
              className="px-3 py-1 flex items-center justify-between"
              style={{
                background: isPlaying
                  ? 'linear-gradient(to right, rgba(0,64,160,0.1), rgba(64,128,208,0.1))'
                  : 'linear-gradient(to right, #0040a0, #4080d0)',
                borderBottom: isPlaying ? '1px solid rgba(0,8,128,0.1)' : '1px solid #000080'
              }}
            >
              <div className="flex items-center space-x-2">
                <div
                  className="w-4 h-4 flex items-center justify-center text-xs"
                  style={{
                    backgroundColor: isPlaying ? 'rgba(192,192,192,0.1)' : '#c0c0c0',
                    borderTop: isPlaying ? '1px solid rgba(255,255,255,0.1)' : '1px solid #ffffff',
                    borderLeft: isPlaying ? '1px solid rgba(255,255,255,0.1)' : '1px solid #ffffff',
                    borderRight: isPlaying ? '1px solid rgba(128,128,128,0.1)' : '1px solid #808080',
                    borderBottom: isPlaying ? '1px solid rgba(128,128,128,0.1)' : '1px solid #808080'
                  }}
                >
                  <span style={{ color: '#000', fontSize: '8px' }}>📄</span>
                </div>
                <span className="text-white text-sm font-bold" style={{ opacity: isPlaying ? 0.3 : 1 }}>main.rs - MS-DOS Prompt</span>
              </div>
              <div className="flex space-x-1">
                <button
                  className="w-5 h-4 flex items-center justify-center text-xs font-bold hover:bg-gray-200 active:border-inset"
                  style={{
                    backgroundColor: isPlaying ? 'rgba(192,192,192,0.1)' : '#c0c0c0',
                    borderTop: isPlaying ? '1px solid rgba(255,255,255,0.1)' : '1px solid #ffffff',
                    borderLeft: isPlaying ? '1px solid rgba(255,255,255,0.1)' : '1px solid #ffffff',
                    borderRight: isPlaying ? '1px solid rgba(128,128,128,0.1)' : '1px solid #808080',
                    borderBottom: isPlaying ? '1px solid rgba(128,128,128,0.1)' : '1px solid #808080',
                    color: isPlaying ? 'rgba(0,0,0,0.3)' : '#000',
                    fontSize: '10px',
                    lineHeight: '1',
                    fontFamily: 'monospace'
                  }}
                >
                  −
                </button>
                <button
                  className="w-5 h-4 flex items-center justify-center text-xs font-bold hover:bg-gray-200 active:border-inset"
                  style={{
                    backgroundColor: isPlaying ? 'rgba(192,192,192,0.1)' : '#c0c0c0',
                    borderTop: isPlaying ? '1px solid rgba(255,255,255,0.1)' : '1px solid #ffffff',
                    borderLeft: isPlaying ? '1px solid rgba(255,255,255,0.1)' : '1px solid #ffffff',
                    borderRight: isPlaying ? '1px solid rgba(128,128,128,0.1)' : '1px solid #808080',
                    borderBottom: isPlaying ? '1px solid rgba(128,128,128,0.1)' : '1px solid #808080',
                    color: isPlaying ? 'rgba(0,0,0,0.3)' : '#000',
                    fontSize: '10px',
                    lineHeight: '1',
                    fontFamily: 'monospace'
                  }}
                >
                  ◻
                </button>
                <button
                  className="w-5 h-4 flex items-center justify-center text-xs font-bold hover:bg-gray-200 active:border-inset"
                  style={{
                    backgroundColor: isPlaying ? 'rgba(192,192,192,0.1)' : '#c0c0c0',
                    borderTop: isPlaying ? '1px solid rgba(255,255,255,0.1)' : '1px solid #ffffff',
                    borderLeft: isPlaying ? '1px solid rgba(255,255,255,0.1)' : '1px solid #ffffff',
                    borderRight: isPlaying ? '1px solid rgba(128,128,128,0.1)' : '1px solid #808080',
                    borderBottom: isPlaying ? '1px solid rgba(128,128,128,0.1)' : '1px solid #808080',
                    color: isPlaying ? 'rgba(0,0,0,0.3)' : '#000',
                    fontSize: '10px',
                    lineHeight: '1',
                    fontFamily: 'monospace'
                  }}
                >
                  ✕
                </button>
              </div>
            </div>

            <div
              className={WIN95_CLASSES.terminal}
              style={{
                ...WIN95_INLINE_STYLES.windowSunken,
                backgroundColor: isPlaying ? 'rgba(0,0,0,0.05)' : undefined,
                opacity: isPlaying ? 0.8 : 1
              }}
            >
              <div className="mb-2">
                <span className={WIN95_CLASSES.terminalPrompt}>C:\Projects\poetry&gt;</span> <span className={WIN95_CLASSES.terminalCommand}>cargo run</span>
              </div>
              <div className={`mb-3 ${WIN95_CLASSES.terminalOutput}`}>
                <span>   Compiling poetry v0.1.0</span>
              </div>
              <div className={`mb-3 ${WIN95_CLASSES.terminalOutput}`}>
                <span>    Finished dev [unoptimized + debuginfo] target(s)</span>
              </div>
              <div className={`mb-5 ${WIN95_CLASSES.terminalOutput}`}>
                <span>     Running `target/debug/gleizi`</span>
              </div>

              <div className="space-y-1">
                {poemLines.slice(0, currentLine + 1).map((line, index) => (
                  <div key={index} className="leading-relaxed">
                    {line === "" ? (
                      <div className="h-3" />
                    ) : (
                      <div className="flex items-start">
                        <span className={WIN95_CLASSES.terminalText}>
                          {line}
                          {index === currentLine && !isComplete && (
                            <span className={`ml-1 ${showCursor ? 'opacity-100' : 'opacity-0'}`}>_</span>
                          )}
                        </span>
                      </div>
                    )}
                  </div>
                ))}

                {isComplete && (
                  <div className="mt-6 space-y-2">
                    <div className={WIN95_CLASSES.terminalOutput}>Process exited with code 0.</div>
                    <div className={WIN95_CLASSES.terminalCommand}>
                      Press any key to continue . . .
                      {isLoading && <span className="ml-2 text-blue-400 animate-pulse">(Carregando...)</span>}
                      {isPlaying && <span className="ml-2 text-yellow-400">(♪ Tocando - Pressione ESPAÇO para pausar)</span>}
                      {isPaused && <span className="ml-2 text-orange-400">(⏸ Pausado - Pressione ESPAÇO para continuar)</span>}
                    </div>
                  </div>
                )}
              </div>

              {isComplete && (
                <div className="mt-8 text-sm text-gray-500 text-center italic">
                  (Talvez agora você entenda por que o binário final leva seu nome.)
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Audio element - hidden */}
        <audio
          ref={audioRef}
          preload="auto"
          onCanPlayThrough={() => setAudioReady(true)}
          onEnded={() => {
            setIsPlaying(false);
            setIsPaused(false);
          }}
          onError={(e) => {
            console.log('Erro no áudio:', e);
            setIsLoading(false);
          }}
        >
          <source src="/gleizi-audio.webm" type="audio/webm" />
          <source src="/gleizi-audio.mp3" type="audio/mpeg" />
          Seu navegador não suporta o elemento audio.
        </audio>
      </main>
      <Footer />
    </div>
  );
}
