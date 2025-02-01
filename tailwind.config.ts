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
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      animation: {
        'orbit': 'orbit linear infinite',
        'moon-orbit': 'moonOrbit linear infinite 2.5s',
      },
      keyframes: {
        orbit: {
          'from': { transform: 'rotate(0deg) translate(-50%, -50%)' },
          'to': { transform: 'rotate(360deg) translate(-50%, -50%)' }
        },
        moonOrbit: {
          'from': { transform: 'rotate(0deg) translate(20px)' },
          'to': { transform: 'rotate(360deg) translate(20px)' }
        }
      }
    },
  },
  plugins: [],
} satisfies Config;
