"use client";

import React from 'react';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import { cn } from '@/lib/utils';
import { StaticImageData } from 'next/image';

export interface BlogPostData {
  image: string | StaticImageData;
  title: string;
  content: string;
}

interface BlogPostProps {
  post: BlogPostData;
}

const BlogPost: React.FC<BlogPostProps> = ({ post }) => {
  return (
    <article
      className={cn(
        "max-w-4xl mx-auto my-5 p-4",
        "border-2 retro-border",
        "bg-white shadow-lg"
      )}
    >
      <h1 className="text-3xl font-bold text-[#000080] mb-4">{post.title}</h1>
      <div className="relative w-full h-64 mb-4">
        <Image src={post.image} alt={post.title} fill className="object-cover" />
      </div>
      <div className="prose">
        <ReactMarkdown>{post.content}</ReactMarkdown>
      </div>
    </article>
  );
};

export default BlogPost;
