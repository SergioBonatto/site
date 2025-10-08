'use client';

import { useEffect, useRef } from 'react';

export default function PrismLoader() {
  const highlightedRef = useRef(false);

  useEffect(() => {
    const loadAndHighlight = async () => {
      // Skip if already highlighted
      if (highlightedRef.current) return;

      try {
        // First, load Prism core
        const { default: Prism } = await import('prismjs');

        // Make Prism available globally before loading components
        (window as unknown as Record<string, unknown>).Prism = Prism;
        (Prism as unknown as Record<string, unknown>).manual = true;

        // Load language components sequentially to avoid extend errors
        await import('prismjs/components/prism-javascript');
        await import('prismjs/components/prism-typescript');
        await import('prismjs/components/prism-jsx');
        await import('prismjs/components/prism-tsx');
        await import('prismjs/components/prism-css');
        await import('prismjs/components/prism-json');
        await import('prismjs/components/prism-bash');
        await import('prismjs/components/prism-markdown');

        // Load Solidity last as it might have dependencies
        try {
          await import('prismjs/components/prism-solidity');
        } catch (e) {
          console.warn('Solidity syntax not available:', e);
        }

        // Wait a bit for DOM to be ready
        await new Promise(resolve => setTimeout(resolve, 100));

        // First, find code blocks that might not have been processed by rehype-prism-plus
        const unprocessedCodeBlocks = document.querySelectorAll('pre code:not([class*="language-"])');

        unprocessedCodeBlocks.forEach((codeElement) => {
          const preElement = codeElement.closest('pre');
          if (preElement && preElement.textContent) {
            // Try to detect language from content
            const content = preElement.textContent;

            // Simple language detection
            if (content.includes('function') && (content.includes('msg.') || content.includes('payable') || content.includes('revert'))) {
              codeElement.classList.add('language-solidity');
              preElement.classList.add('language-solidity');
            } else if (content.includes('function') && content.includes('console.log')) {
              codeElement.classList.add('language-javascript');
              preElement.classList.add('language-javascript');
            } else if (content.includes('import') && content.includes('from')) {
              codeElement.classList.add('language-typescript');
              preElement.classList.add('language-typescript');
            }
          }
        });

        // Now find and highlight all code blocks (including newly classified ones)
        const codeBlocks = document.querySelectorAll('pre[class*="language-"] code, code[class*="language-"]');

        console.log(`Found ${codeBlocks.length} code blocks to highlight`);

        codeBlocks.forEach((codeElement, index) => {
          const preElement = codeElement.closest('pre');

          // Get language from either pre or code element
          let langClass = '';
          if (preElement) {
            const preClasses = Array.from(preElement.classList);
            langClass = preClasses.find(cls => cls.startsWith('language-')) || '';
          }

          if (!langClass) {
            const codeClasses = Array.from(codeElement.classList);
            langClass = codeClasses.find(cls => cls.startsWith('language-')) || '';
          }

          if (langClass) {
            const language = langClass.replace('language-', '');

            // Ensure code element has the language class
            if (!codeElement.classList.contains(langClass)) {
              codeElement.classList.add(langClass);
            }

            // Ensure pre element has the language class
            if (preElement && !preElement.classList.contains(langClass)) {
              preElement.classList.add(langClass);
            }

            // Highlight if language is supported
            if (Prism.languages[language]) {
              try {
                Prism.highlightElement(codeElement);
                console.log(`Highlighted block ${index} (${language})`);
              } catch (error) {
                console.warn(`Error highlighting ${language} block:`, error);
              }
            } else {
              console.warn(`Language ${language} not supported`);
              // Log available languages for debugging
              console.log('Available languages:', Object.keys(Prism.languages));
            }
          }
        });

        highlightedRef.current = true;
        console.log('Prism highlighting completed');

      } catch (error) {
        console.error('Failed to load Prism:', error);
      }
    };

    // Run immediately after component mounts
    loadAndHighlight();

    // Also run when DOM changes (for dynamic content)
    const observer = new MutationObserver(() => {
      if (!highlightedRef.current) {
        loadAndHighlight();
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });

    return () => observer.disconnect();
  }, []);

  return null;
}
