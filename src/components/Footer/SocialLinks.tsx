'use client';

import React from 'react';
import Image from 'next/image';

export interface SocialLink {
  name: string;
  icon: string;
  url: string;
}

export const socialLinksData: SocialLink[] = [
  { name: 'Instagram', icon: '/instagram.png', url: 'https://www.instagram.com/Sergio_Bonatto/' },
  { name: 'GitHub', icon: '/github.png', url: 'https://github.com/SergioBonatto' },
  { name: 'X', icon: '/twitter.png', url: 'https://x.com/fiBonatto' },
  { name: 'LinkedIn', icon: '/linkedin.png', url: 'https://www.linkedin.com/in/sergiobonatto' }
];

const SocialLinks: React.FC<{ extraClasses?: string }> = ({ extraClasses }) => (
  <>
    {socialLinksData.map((social) => (
      <a
        key={social.name}
        href={social.url}
        target="_blank"
        rel="noopener noreferrer"
        className={
          "flex items-center bg-[#c0c0c0] border-2 border-white " +
          "border-l-[#808080] border-t-[#808080] border-r-white border-b-white " +
          "p-1 cursor-pointer hover:bg-[#a0a0a0] active:border-[#808080] " +
          "active:border-l-white active:border-t-white " +
          (extraClasses ?? '')
        }
      >
        <Image
          src={social.icon}
          alt={social.name}
          className="w-5 h-5 object-contain"
          width={20}
          height={20}
        />
      </a>
    ))}
  </>
);

export default SocialLinks;
