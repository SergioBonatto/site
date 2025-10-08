'use client';

import React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { useThemeContext } from './ThemeProvider';

interface AboutProps extends React.HTMLAttributes<HTMLElement> {
  className?: string;
  imageSrc?: string;
  imageAlt?: string;
}

const About: React.FC<AboutProps> = ({
  className,
  imageSrc = "/eu.jpeg",
  imageAlt = "Foto minha com um livro vermelho",
  ...props
}) => {
  const { colors } = useThemeContext();

  return (
    <section
      id="about"
      className={cn(
        "w-full max-w-6xl mx-auto my-12 p-4 md:p-8",
        className
      )}
      style={{
        backgroundColor: colors.syntaxBg,
        color: colors.mono1,
      }}
      {...props}
    >
      <div className="flex flex-col md:flex-row gap-8 md:gap-12">
        {/* Painel Esquerdo - Imagem */}
        <div className="w-full md:w-1/3">
          <div className="relative w-full h-[400px] md:h-[600px] rounded-lg overflow-hidden shadow-lg">
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover"
            />
          </div>
        </div>

        {/* Painel Direito - Conteúdo */}
        <div className="w-full md:w-2/3 flex flex-col justify-center">
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6"
            style={{ color: colors.hue2 }}
          >
            About
          </h2>

          <div className="space-y-4 text-base md:text-lg leading-relaxed">
            {[
                "Code is just the surface. I forge systems with the precision of logic, the depth of theology, and the rigor of philosophy. Self-taught polymath, full-stack developer, Calvinist, philosopher, Cypherpunk, and Agorist. These aren't just titles. Every choice in this site's architecture proves it.",

                "This foundation shapes everything I build. Smart contracts with mathematical guarantees, interpreters that respect formal semantics, decentralized systems that embody sovereignty. My payment processor Agoriz exists because centralized solutions compromise freedom. When existing search engines buried signal in noise, I built clarity from first principles.",

                "Philosophy and reformed theology aren't academic exercises, they're the bedrock of coherent thinking. Van Til's presuppositionalism, Kant's categories, Aristotelian logic. These frameworks eliminate the fog that plagues both worldviews and codebases. Clear thinking produces clear systems.",

                "From Austrian praxeology to reformed soteriology, from presuppositional epistemology to formal proofs in computation theory, each discipline informs the others. I understand that free markets and sovereign grace operate under principles that transcend human conventions. This synthesis isn't eclecticism; it's intellectual architecture.",

                "Everything I create serves a deeper purpose: building for a future where my children inherit freedom, not chains. I craft custom Vim tooling because corporate defaults assume dependence. I write to crystallize thought, build to own my tools, learn to reject borrowed assumptions that weaken foundations.",

                "This site reveals my approach: logic-driven code, principled architecture, systems that answer to no master. Signal over noise. Truth over trends. Tools built to endure. Explore carefully, there are easter eggs that reward attention. Want to see more? Check my blog, GitHub, and X. Challenge the defaults and build something that matters."
              ].map((text, index) => (
              <p key={index}>
                {text}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
