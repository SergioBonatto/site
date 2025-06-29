'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface AboutProps extends React.HTMLAttributes<HTMLElement> {
  className?: string;
  imageSrc?: string;
  imageAlt?: string;
}

const WIN95_BORDERS = {
  raised: "border-t-white border-l-white border-r-gray-800 border-b-gray-800",
  sunken: "border-t-gray-800 border-l-gray-800 border-r-white border-b-white",
} as const;

// const Win95Link: React.FC<React.ComponentProps<typeof Link>> = ({
//   className,
//   children,
//   ...props
// }) => (
//   <Link
//     className={cn(
//       "text-blue-800 hover:text-blue-600 visited:text-purple-800",
//       "underline-offset-2 hover:underline",
//       className
//     )}
//     {...props}
//   >
//     {children}
//   </Link>
// );

const About: React.FC<AboutProps> = ({
  className,
  imageSrc = "/image.png",
  imageAlt = "Photo of me with a red book",
  ...props
}) => {
  return (
    <section
      id="about"
      className={cn(
        "w-full max-w-6xl mx-auto bg-[#c0c0c0]",
        "border-2 my-5 md:w-4/5",
        WIN95_BORDERS.raised,
        "p-3 md:p-4 lg:p-5",
        className
      )}
      {...props}
    >
      <div className="flex flex-col md:flex-row gap-4 md:gap-6">
        {/* Left Panel - Image */}
        <div className="w-full md:w-1/3">
          <div
            className={cn(
              "bg-[#c0c0c0] h-full p-1 md:p-1",
              "border-1",
              WIN95_BORDERS.raised
            )}
          >
            <div
              className={cn(
                "relative w-full",
                "h-[600px]",
                "border-2",
                WIN95_BORDERS.sunken,
                "bg-white p-1"
              )}
            >
              <Image
                src={imageSrc}
                alt={imageAlt}
                width={800}
                height={600}
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover w-full h-full"
              />
            </div>
          </div>
        </div>

        {/* Right Panel - Content */}
        <div className="w-full md:w-2/3">
          <div
            className={cn(
              "bg-white h-full p-4 md:p-6",
              "border-2",
              WIN95_BORDERS.sunken
            )}
          >
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold font-[&apos;MS Sans Serif&apos;] text-[#000080] mb-4 md:mb-6 select-none">
              About me
            </h2>

            <div className="space-y-3 md:space-y-4 font-['MS Sans Serif'] text-gray-800 md:text-lg">
              {[
                "I don’t just write code. I forge systems with the precision of logic, the depth of theology, the rigor of philosophy, and an unrelenting refusal to compromise on truth. I’m a self-taught polymath, a full-stack developer, a Calvinist, a philosopher, a Cypherpunk, and an Agorist, building tools for a world that values freedom over conformity.",

                "My work spans formal verification, functional programming, and decentralized infrastructure. I’ve architected smart contracts with ironclad guarantees, crafted interpreters from scratch, built developer tooling for those who demand control, and launched Agoriz, a decentralized payment processor designed to make transactions as unstoppable as ideas should be. I created a local-first finance app because financial autonomy deserves better than bloated platforms or fragile spreadsheets. When no search engine could deliver truth without noise, I built my own to cut through the chaos with unrelenting clarity.",

                "Every line of code reflects my principles: clarity that slices through complexity, independence that rejects dependence, and resilience that thrives under pressure. My creations are not just functional. They’re declarations of sovereignty, built for those who refuse to be managed by middlemen or manipulated by design.",

                "I’m not just a software engineer. I’m a philosopher and reformed theologian who wrestles with metaphysics, epistemology, and sovereignty. I’ve studied Van Til, Kant, and Aristotle, written on the nature of knowledge, and debated freedom versus determinism with a clarity that leaves no room for ambiguity. A foggy worldview breeds foggy systems. I reject both.",

                "I’m a father who builds not just for today but for a future where my children inherit freedom, not chains. I’m a non-practicing vegan and a cosmopolite who thrives on ideas, not trends. I craft my own Vim tooling because I trust my process over corporate defaults. I write to think clearly, build to own what I use, and learn because I refuse to live by borrowed assumptions.",

                "My projects, like Agoriz, exist because they had to, not for profit, but for principle. They are weapons of clarity in a world of obfuscation, tools for those who see through the haze of centralized control and demand something better.",

                "This site is a window into my world: code that respects logic, writing that honors thought, and systems that answer to no master. If you came for trends or safe consensus, I have nothing for you. If you seek signal, truth, and tools built to endure, dive in. Explore. Challenge the defaults. Build something that matters."
              ].map((text, index) => (
                <div
                  key={index}
                  className={cn(
                    "border-2",
                    WIN95_BORDERS.sunken,
                    "bg-[#ececec] p-2 md:p-3"
                  )}
                >
                  {/* <p className="leading-relaxed text-base md:text-lg">
                    {index === 3 ? (
                      <>
                        On my{' '}
                        <Win95Link href="/blog">
                          blog
                        </Win95Link>
                        , you&apos;ll find articles about web development, formal proofs,
                        and tech trends, as well as insights into things that inspire me
                        or make life easier.
                      </>
                    ) : (
                      text
                    )}
                  </p> */}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
