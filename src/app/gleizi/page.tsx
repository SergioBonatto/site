'use client';

import { useEffect, useState } from 'react';
import Navbar from '@/components/Nav';
import Footer from '@/components/Footer/footer';
import { WIN95_COLORS, WIN95_CLASSES, WIN95_INLINE_STYLES } from '@/styles/win95';

export default function GleiziPage() {
  const [currentLine, setCurrentLine] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  const [isComplete, setIsComplete] = useState(false);

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

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: WIN95_COLORS.background }}>
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
              boxShadow: '2px 2px 4px rgba(0,0,0,0.3)'
            }}
          >
            <div
              className="px-3 py-1 flex items-center justify-between"
              style={{
                background: 'linear-gradient(to right, #0040a0, #4080d0)',
                borderBottom: '1px solid #000080'
              }}
            >
              <div className="flex items-center space-x-2">
                <div
                  className="w-4 h-4 flex items-center justify-center text-xs"
                  style={{
                    backgroundColor: '#c0c0c0',
                    borderTop: '1px solid #ffffff',
                    borderLeft: '1px solid #ffffff',
                    borderRight: '1px solid #808080',
                    borderBottom: '1px solid #808080'
                  }}
                >
                  <span style={{ color: '#000', fontSize: '8px' }}>📄</span>
                </div>
                <span className="text-white text-sm font-bold">main.rs - MS-DOS Prompt</span>
              </div>
              <div className="flex space-x-1">
                <button
                  className="w-5 h-4 flex items-center justify-center text-xs font-bold hover:bg-gray-200 active:border-inset"
                  style={{
                    backgroundColor: '#c0c0c0',
                    borderTop: '1px solid #ffffff',
                    borderLeft: '1px solid #ffffff',
                    borderRight: '1px solid #808080',
                    borderBottom: '1px solid #808080',
                    color: '#000',
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
                    backgroundColor: '#c0c0c0',
                    borderTop: '1px solid #ffffff',
                    borderLeft: '1px solid #ffffff',
                    borderRight: '1px solid #808080',
                    borderBottom: '1px solid #808080',
                    color: '#000',
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
                    backgroundColor: '#c0c0c0',
                    borderTop: '1px solid #ffffff',
                    borderLeft: '1px solid #ffffff',
                    borderRight: '1px solid #808080',
                    borderBottom: '1px solid #808080',
                    color: '#000',
                    fontSize: '10px',
                    lineHeight: '1',
                    fontFamily: 'monospace'
                  }}
                >
                  ✕
                </button>
              </div>
            </div>

            <div className={WIN95_CLASSES.terminal} style={WIN95_INLINE_STYLES.windowSunken}>
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
                    <div className={WIN95_CLASSES.terminalCommand}>Press any key to continue . . .</div>
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
      </main>
      <Footer />
    </div>
  );
}
