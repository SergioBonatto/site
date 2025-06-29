'use client';

import React from 'react';
import Image from 'next/image';
// import Link from 'next/link';
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
  imageSrc = "/eu.jpeg",
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
                "Code is just the surface. I forge systems with the precision of logic, the depth of theology, and the rigor of philosophy. Self-taught polymath, full-stack developer, Calvinist, philosopher, Cypherpunk, and Agorist. These aren't just titles. Every choice in this site's architecture proves it.",

                "This foundation shapes everything I build. Smart contracts with mathematical guarantees, interpreters that respect formal semantics, decentralized systems that embody sovereignty. My payment processor Agoriz exists because centralized solutions compromise freedom. When existing search engines buried signal in noise, I built clarity from first principles.",

                "Philosophy and reformed theology aren't academic exercises, they're the bedrock of coherent thinking. Van Til's presuppositionalism, Kant's categories, Aristotelian logic. These frameworks eliminate the fog that plagues both worldviews and codebases. Clear thinking produces clear systems.",

                "Everything I create serves a deeper purpose: building for a future where my children inherit freedom, not chains. I craft custom Vim tooling because corporate defaults assume dependence. I write to crystallize thought, build to own my tools, learn to reject borrowed assumptions that weaken foundations.",

                "This site reveals my approach: logic-driven code, principled architecture, systems that answer to no master. Signal over noise. Truth over trends. Tools built to endure. Explore carefully, there are easter eggs that reward attention. Want to see more? Check my blog, GitHub, and X. Challenge the defaults and build something that matters."
              ].map((text, index) => (
                <div
                  key={index}
                  className={cn(
                    "border-2",
                    WIN95_BORDERS.sunken,
                    "bg-[#ececec] p-2 md:p-3"
                  )}
                >
                  <p className="leading-relaxed text-base md:text-lg">
                    {text}
                  </p>
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
