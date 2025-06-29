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
  }, []);

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
          <div className={WIN95_CLASSES.window} style={WIN95_INLINE_STYLES.windowRaised}>
            <div className={WIN95_CLASSES.titleBar}>
              <div className="flex items-center space-x-2">
                <div className={WIN95_CLASSES.titleBarIcon}>
                  <span className="text-black">📄</span>
                </div>
                <span className={WIN95_CLASSES.titleBarText}>main.rs - MS-DOS Prompt</span>
              </div>
              <div className="flex space-x-1">
                <button className={WIN95_CLASSES.windowButton} style={WIN95_INLINE_STYLES.windowRaised}>
                  <span className="text-black">_</span>
                </button>
                <button className={WIN95_CLASSES.windowButton} style={WIN95_INLINE_STYLES.windowRaised}>
                  <span className="text-black">□</span>
                </button>
                <button className={WIN95_CLASSES.windowButton} style={WIN95_INLINE_STYLES.windowRaised}>
                  <span className="text-black">×</span>
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
