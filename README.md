# Personal Portfolio Website

A modern portfolio website built with Next.js 14, React, Tailwind CSS, and TypeScript. Features a unique Windows 95-inspired design, interactive solar system animation, and Matrix-style visual effects. The project demonstrates modern web development practices while maintaining a nostalgic aesthetic.

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Technologies](#technologies)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Development](#development)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## Project Overview

The website includes several key sections:
- **Home** - Landing page with an interactive solar system animation and Matrix background
- **About** - Developer bio with Windows 95-styled UI components
- **Contact** - Contact information with retro-styled form elements and WhatsApp integration
- **Blog** - Technical writing showcase (placeholder)
- **Login** - Easter egg page with retro "hacking" animation

Key features include ambient background music, retro UI elements, and responsive design across all device sizes.

## Features

- **Windows 95 Design System**: Custom-styled components imitating classic Windows 95 UI elements
- **Interactive Animations**:
  - Solar system with clickable planets ([`src/components/solarSystem`](src/components/solarSystem))
  - Matrix-style background effect ([`src/components/MatrixBackground`](src/components/MatrixBackground))
- **Responsive Layout**: Adaptive design with mobile-first approach
- **Audio Integration**: Background music player with play/pause controls
- **SEO Optimization**: Meta tags and OpenGraph support ([`src/components/SEO.tsx`](src/components/SEO.tsx))
- **Easter Eggs**: Hidden features and animations for curious users

## Technologies

Core:
- **Next.js 14**: Server components and app router
- **React 19**: Component architecture
- **TypeScript**: Type safety
- **Tailwind CSS**: Utility-first styling
- **P5.js**: Creative coding for animations
- **clsx & tailwind-merge**: Dynamic class management

## Project Structure

```
src/
├── app/                    # Next.js app router pages
├── components/
│   ├── About/             # About section components
│   ├── Contact/           # Contact form components
│   ├── Footer/            # Footer with social links
│   ├── MatrixBackground/  # Matrix animation
│   ├── Nav/               # Navigation components
│   └── solarSystem/       # Interactive solar system
├── lib/                   # Utility functions
└── types/                 # TypeScript definitions
```

## Getting Started

1. **Clone and install:**
```bash
git clone https://github.com/SergioBonatto/site.git
cd site
npm install
```

2. **Environment setup:**
Create `.env.local`:
```
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

3. **Development server:**
```bash
npm run dev
```

## Development

- Use Next.js app router and server components where possible
- Follow Windows 95 design patterns for UI components
- Implement responsive designs using Tailwind breakpoints
- Maintain TypeScript types for all components
- Follow ESLint and Prettier configurations

## Deployment

1. **Build:**
```bash
npm run build
```

2. **Deploy to Vercel:**
```bash
vercel deploy
```

For other platforms, ensure environment variables are properly configured.

## Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## License

MIT License - see LICENSE file for details

---

Built with 💻 by [Sergio Bonatto](https://github.com/SergioBonatto). Inspired by Windows 95 and classic web aesthetics.
