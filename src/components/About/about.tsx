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

const WIN95_COLORS = {
  background: '#c0c0c0',
  white: '#ffffff',
  gray: '#808080',
  darkGray: '#404040',
  navy: '#000080',
  button: '#dfdfdf',
  buttonHover: '#efefef',
  buttonActive: '#c0c0c0',
  input: '#ececec',
} as const;

const WIN95_BORDERS = {
  raised: "border-t-white border-l-white border-r-gray-800 border-b-gray-800",
  sunken: "border-t-gray-800 border-l-gray-800 border-r-white border-b-white",
} as const;

const Win95Link: React.FC<React.ComponentProps<typeof Link>> = ({ className, children, ...props }) => (
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
  imageAlt = "Photo of me wearing a hoodie and black beanie, in doomer style",
  ...props
}) => {
  return (
    <section
      id="about"
      className={cn(
        "w-4/5 mx-auto bg-[#c0c0c0]",
        "border-2",
        WIN95_BORDERS.raised,
        "p-3",
        className
      )}
      {...props}
    >
      <div className="flex gap-6">
        {/* Left Panel - Image */}
        <div className="w-1/3">
          <div className={cn(
            "bg-[#c0c0c0] h-full p-4",
            "border-2",
            WIN95_BORDERS.raised
          )}>
            <div className={cn(
              "relative w-full aspect-square",
              "border-2",
              WIN95_BORDERS.sunken,
              "bg-white p-1"
            )}>
              <Image
                src={imageSrc}
                alt={imageAlt}
                fill
                priority
                className="object-contain"
              />
            </div>
          </div>
        </div>

        {/* Right Panel - Content */}
        <div className="w-2/3">
          <div className={cn(
            "bg-white h-full p-6",
            "border-2",
            WIN95_BORDERS.sunken
          )}>
            <h2 className="text-4xl font-bold font-['MS Sans Serif'] text-[#000080] mb-6 select-none">
              About me
            </h2>

            <div className="space-y-4 font-['MS Sans Serif'] text-gray-800">
              <div className={cn(
                "border-2",
                WIN95_BORDERS.sunken,
                "bg-[#ececec] p-3"
              )}>
                <p className="leading-relaxed">
                  I&apos;m a software developer transitioning into full-stack web development,
                  combining a passion for clean, scalable frontend experiences with robust
                  backend systems. My focus is on building user-centric applications with
                  modern frameworks and maintaining strong coding standards.
                </p>
              </div>

              <div className={cn(
                "border-2",
                WIN95_BORDERS.sunken,
                "bg-[#ececec] p-3"
              )}>
                <p className="leading-relaxed">
                  With a background in formal verification and functional programming,
                  I bring a methodical approach to problem-solving and code quality.
                  I have experience crafting efficient algorithms, exploring formal proofs,
                  and leveraging decentralized technologies to create innovative solutions.
                </p>
              </div>

              <div className={cn(
                "border-2",
                WIN95_BORDERS.sunken,
                "bg-[#ececec] p-3"
              )}>
                <p className="leading-relaxed">
                  Beyond coding, I&apos;m a proud father to Matteo, a reformed theologian,
                  and an autodidact. I thrive on meaningful conversations, enjoy writing
                  about Kind and formal proofs, and embrace the open-source philosophy.
                  I&apos;m a nerd at heart, a non-practicing vegan, and a coffee enthusiast
                  with a passion for continuous learning.
                </p>
              </div>

              <div className={cn(
                "border-2",
                WIN95_BORDERS.sunken,
                "bg-[#ececec] p-3"
              )}>
                <p className="leading-relaxed">
                  On my{' '}
                  <Win95Link href="/blog">
                    blog
                  </Win95Link>
                  , you&apos;ll find articles about web development, formal proofs,
                  and tech trends, as well as insights into things that inspire me
                  or make life easier.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
