'use client';

import { useEffect, useState } from 'react';
import Navbar from '@/components/Nav';
import Footer from '@/components/Footer/footer';

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
    }, 2000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const cursorTimer = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);

    return () => clearInterval(cursorTimer);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-900 via-slate-900 to-orange-900">
      <Navbar />
      <main className="flex-1 flex items-center justify-center px-4">
        <div className="max-w-4xl w-full">
          {/* Terminal Header */}
          <div className="bg-gray-800 rounded-t-lg border border-gray-600">
            <div className="flex items-center px-4 py-2 bg-gray-700 rounded-t-lg">
              <div className="flex space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <div className="flex-1 text-center text-gray-300 text-sm font-mono">
                main.rs - cargo run
              </div>
            </div>
          </div>          {/* Terminal Content */}
          <div className="bg-black rounded-b-lg border-x border-b border-gray-600 p-6 font-mono text-green-400 min-h-[500px]">
            <div className="mb-4 text-orange-400">
              <span className="text-blue-400">fn</span> <span className="text-yellow-400">main</span><span className="text-white">()</span> <span className="text-white">{`{`}</span>
            </div>

            <div className="ml-4 space-y-2">
              <div className="text-gray-500">// Compiling poetry v0.1.0...</div>
              <div className="text-gray-500">// Finished dev [unoptimized + debuginfo] target(s)</div>
              <div className="mb-6 text-gray-500">// Running `target/debug/poetry`</div>

              {poemLines.slice(0, currentLine + 1).map((line, index) => (
                <div key={index} className="leading-relaxed">
                  {line === "" ? (
                    <div className="h-4"></div>
                  ) : (
                    <div className="flex items-start">
                      <span className="text-gray-500 mr-3 select-none">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <span className="text-gray-300">
                        <span className="text-blue-400">println!</span><span className="text-white">(</span><span className="text-green-300">"{line}"</span><span className="text-white">)</span><span className="text-gray-500">;</span>
                        {index === currentLine && !isComplete && (
                          <span className={`ml-1 ${showCursor ? 'opacity-100' : 'opacity-0'}`}>
                            |
                          </span>
                        )}
                      </span>
                    </div>
                  )}
                </div>
              ))}

              {isComplete && (
                <div className="mt-6 space-y-2">
                  <div className="text-gray-500">// Program completed successfully</div>
                  <div className="text-green-300">// Exit code: 0</div>
                  <div className="text-orange-400">// Memory usage: Safe ✓</div>
                  <div className="mt-4 text-center">
                    <div className="inline-block px-4 py-2 bg-orange-700 text-orange-200 rounded border border-orange-600">
                      <span className="text-sm">cargo run --release 🦀</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="mt-4 text-white">
              <span className="text-white">{`}`}</span>
            </div>

            {isComplete && (
              <div className="mt-6 text-center">
                <div className="inline-block text-orange-400">
                  <div className="text-sm">Process finished with exit code 0</div>
                </div>
              </div>
            )}
          </div>
        </div>      </main>
      <Footer />
    </div>
  );
}
