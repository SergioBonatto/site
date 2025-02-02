'use client';

import { FC, HTMLAttributes } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface AboutProps extends HTMLAttributes<HTMLElement> {
  className?: string;
}

const About: FC<AboutProps> = ({ className, ...props }) => {
  const isScrolled = false;

  return (
    <section
      id="about"
      className={cn(
        "flex items-center w-4/5 mx-auto border border-gray-300",
        "bg-gray-200 z-50 retro-border p-10",
        isScrolled && "shadow-lg",
        className
      )}
      {...props}
    >
      <div className="w-1/3 bg-gray-200">
        <div className="relative w-5/5 aspect-square mx-auto">
            <Image
                src="/image.png"
                alt="Photo of me wearing a hoodie and black beanie, in doomer style"
                fill
                priority
                className="object-contain"
            />
        </div>
      </div>

      <div className="w-2/3 p-4 bg-gray-200 space-y-4">
        <h2 className="text-4xl font-bold">About me</h2>

        <div className="space-y-4 text-gray-800">
          <p className="leading-relaxed">
            I&apos;m a software developer transitioning into full-stack web development,
            combining a passion for clean, scalable frontend experiences with robust
            backend systems. My focus is on building user-centric applications with
            modern frameworks and maintaining strong coding standards.
          </p>

          <p className="leading-relaxed">
            With a background in formal verification and functional programming,
            I bring a methodical approach to problem-solving and code quality.
            I have experience crafting efficient algorithms, exploring formal proofs,
            and leveraging decentralized technologies to create innovative solutions.
          </p>

          <p className="leading-relaxed">
            Beyond coding, I&apos;m a proud father to Matteo, a reformed theologian,
            and an autodidact. I thrive on meaningful conversations, enjoy writing
            about Kind and formal proofs, and embrace the open-source philosophy.
            I&apos;m a nerd at heart, a non-practicing vegan, and a coffee enthusiast
            with a passion for continuous learning.
          </p>

          <p className="leading-relaxed">
            On my{' '}
            <Link
              href="/blog"
              className="text-blue-800 hover:underline transition-colors duration-200"
            >
              blog
            </Link>
            , you&apos;ll find articles about web development, formal proofs,
            and tech trends, as well as insights into things that inspire me
            or make life easier.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
