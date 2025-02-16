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

const Win95Link: React.FC<React.ComponentProps<typeof Link>> = ({
  className,
  children,
  ...props
}) => (
  <Link
    className={cn(
      "text-blue-800 hover:text-blue-600 visited:text-purple-800",
      "underline-offset-2 hover:underline",
      className
    )}
    {...props}
  >
    {children}
  </Link>
);

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

            <div className="space-y-3 md:space-y-4 font-['MS Sans Serif'] text-gray-800">
              {[
                "I'm a software developer transitioning into full-stack web development, combining a passion for clean, scalable frontend experiences with robust backend systems. My focus is on building user-centric applications with modern frameworks and maintaining strong coding standards.",
                "With a background in formal verification and functional programming, I bring a methodical approach to problem-solving and code quality. I have experience crafting efficient algorithms, exploring formal proofs, and leveraging decentralized technologies to create innovative solutions.",
                "Beyond coding, I'm a proud father to Matteo, a reformed theologian, and an autodidact. I thrive on meaningful conversations, enjoy writing about Kind and formal proofs, and embrace the open-source philosophy. I'm a nerd at heart, a non-practicing vegan, and a coffee enthusiast with a passion for continuous learning.",
                "On my blog, you'll find articles about web development, formal proofs, and tech trends, as well as insights into things that inspire me or make life easier."
              ].map((text, index) => (
                <div
                  key={index}
                  className={cn(
                    "border-2",
                    WIN95_BORDERS.sunken,
                    "bg-[#ececec] p-2 md:p-3"
                  )}
                >
                  <p className="leading-relaxed text-sm md:text-base">
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
