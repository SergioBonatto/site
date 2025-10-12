import { cn } from '@/lib/utils';
import { useEffect } from 'react';

interface MarkdownContentProps {
  content: string;
  className?: string;
}

export default function MarkdownContent({ content, className }: MarkdownContentProps) {
  // Dynamically inject Prism stylesheet only when markdown content is rendered
  useEffect(() => {
    if (typeof document === 'undefined') return;

    // Prevent duplicate insertion
    if (document.getElementById('prism-stylesheet')) return;

    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = '/prism.css';
    link.id = 'prism-stylesheet';
    link.crossOrigin = '';
    document.head.appendChild(link);

    return () => {
      // Keep stylesheet for navigation to avoid FOUC on subsequent pages
      // If you prefer removing, uncomment the next line
      // document.head.removeChild(link);
    };
  }, []);
  return (
    <div className={cn(
      "prose max-w-none",
      "prose-headings:font-['MS_Sans_Serif'] prose-headings:text-[#000080]",
      "prose-p:font-['MS_Sans_Serif'] prose-p:text-gray-800 prose-p:leading-relaxed",
      "prose-strong:font-bold prose-strong:text-gray-900",
      // Only style inline code that is NOT inside language-specific blocks
      "prose-code:not([class*='language-']):bg-[#c0c0c0] prose-code:not([class*='language-']):text-black prose-code:not([class*='language-']):px-1 prose-code:not([class*='language-']):py-0.5",
      "prose-code:not([class*='language-']):border prose-code:not([class*='language-']):border-gray-600 prose-code:not([class*='language-']):font-['Courier_New']",
      "prose-blockquote:border-l-4 prose-blockquote:border-[#000080]",
      "prose-blockquote:bg-[#f0f0f0] prose-blockquote:pl-4 prose-blockquote:py-2",
      "prose-ul:list-disc prose-ol:list-decimal",
      "prose-li:font-['MS_Sans_Serif'] prose-li:text-gray-800",
      // Reset ALL prose code styles for Prism code blocks
      "[&_pre[class*='language-']]:!m-6 [&_pre[class*='language-']]:!p-0",
      "[&_pre[class*='language-']]:!bg-transparent [&_pre[class*='language-']]:!border-0",
      "[&_pre[class*='language-']]:!rounded-none",
      "[&_code[class*='language-']]:!bg-transparent [&_code[class*='language-']]:!text-inherit",
      "[&_code[class*='language-']]:!p-0 [&_code[class*='language-']]:!border-0",
      "[&_code[class*='language-']]:!font-mono",
      className
    )}>
      <div
        className="leading-relaxed text-base md:text-lg"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );
}
