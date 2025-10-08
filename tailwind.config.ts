import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        mono1: 'var(--mono-1)',
        mono2: 'var(--mono-2)',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
} satisfies Config;
