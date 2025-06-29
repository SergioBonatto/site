import Script from 'next/script';

export function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Sergio Bonatto",
    "url": "https://bonatto.vercel.app",
    "image": "https://bonatto.vercel.app/og-image.png",
    "sameAs": [
      "https://github.com/SergioBonatto",
      "https://linkedin.com/in/sergio-bonatto",
      "https://twitter.com/fibonatto"
    ],
    "jobTitle": "Full Stack Developer",
    "worksFor": {
      "@type": "Organization",
      "name": "Freelancer"
    },
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Brasília",
      "addressCountry": "BR"
    },
    "knowsAbout": [
      "JavaScript",
      "TypeScript",
      "React",
      "Next.js",
      "Python",
      "Haskell",
      "Lambda Calculus",
      "Formal Proofs",
      "Software Architecture",
      "Web Development",
      "Functional Programming"
    ],
    "description": "Full Stack Developer in Brasília specializing in formal proofs, lambda calculus, Haskell, JavaScript, Python, and computational logic. Expert in software architecture, functional programming, web development, and algorithm optimization."
  };

  return (
    <Script
      id="structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData)
      }}
    />
  );
}
