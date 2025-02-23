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
        'win95-window': '#c0c0c0',
        'win95-border': '#858585',
      },
      animation: {
        'orbit': 'orbit linear infinite',
        'moon-orbit': 'moonOrbit linear infinite 2.5s',
      },
      boxShadow: {
        'win95': 'inset -1px -1px #0a0a0a, inset 1px 1px #fff, inset -2px -2px #808080, inset 2px 2px #c0c0c0',
      },
      backgroundColor: {
        'win95-titlebar': '#000080',
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
  plugins: [require('@tailwindcss/typography')],
} satisfies Config;
