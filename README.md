A personal website built with [Next.js](https://nextjs.org/), [React](https://reactjs.org/), [Tailwind CSS](https://tailwindcss.com/), and [TypeScript](https://www.typescriptlang.org/). This project serves as both a showcase and a playground for modern web development practices with Next.js, providing a responsive UI with several interactive sections and custom designs influenced by retro aesthetics.

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

The website is structured as a multi-section application that includes the following pages/components:
- **Home** – A landing page with dynamic content.
- **About** – Information about the developer, including a personal bio with a retro-styled image section. See [`src/components/About/about.tsx`](src/components/About/about.tsx).
- **Contact** – A section with contact details and a WhatsApp button for direct messaging. Refer to [`src/components/Contact/contact.tsx`](src/components/Contact/contact.tsx).
- **Blog** – A placeholder to showcase articles about web development, formal proofs, and tech trends.
- **Portfolio** – A section to list projects and work samples.

Additionally, the application includes a music player, a solar system animation, and a retro-themed navigation bar that uses both desktop and mobile menu versions. Check the implementation at [`src/components/Nav/index.tsx`](src/components/Nav/index.tsx) and related subcomponents.

## Features

- **Server-Side Rendering & Static Optimization**: Built with Next.js to ensure fast performance and SEO friendly pages.
- **Responsive Design**: Adaptable layouts using Tailwind’s responsive utilities, clearly demonstrated in components like [`src/components/SolarSystem.module.css`](src/components/SolarSystem.module.css).
- **Retro UI Elements**: Custom-styled buttons and panels imitate the classic Windows 95 look, seen in components like [`src/components/Contact/contact.tsx`](src/components/Contact/contact.tsx) and [`src/components/About/about.tsx`](src/components/About/about.tsx).
- **Dynamic Content**: Real-time updates for elements such as the current time in the footer ([`src/components/Footer/footer.tsx`](src/components/Footer/footer.tsx)).
- **Modularized Codebase**: Organized React components and utility functions (for example, [`src/lib/utils.ts`](src/lib/utils.ts)) ensure maintainability and scalability.

## Technologies

- **Next.js**: Provides the framework for server-side rendering and static site generation.
- **React**: Provides a component-based architecture.
- **Tailwind CSS**: Implements utility-first CSS styling.
- **TypeScript**: Enhances code quality with static type-checking.
- **lucide-react**: Supplies icons for navigation and UI elements.
- **clsx & tailwind-merge**: Simplify class name management in component styling ([`src/lib/utils.ts`](src/lib/utils.ts)).

## Project Structure

```
.
├── README.md
├── package.json
├── tsconfig.json
├── next.config.ts
├── postcss.config.mjs
├── tailwind.config.ts
├── public/
│   ├── music.mp3
│   ├── image.png
│   └── other assets...
└── src/
    ├── app/
    │   ├── page.tsx
    │   ├── layout.tsx
    │   └── globals.css
    ├── components/
    │   ├── About/
    │   │   └── about.tsx
    │   ├── Contact/
    │   │   └── contact.tsx
    │   ├── Footer/
    │   │   └── footer.tsx
    │   ├── Nav/
    │   │   ├── DesktopMenu.tsx
    │   │   ├── MobileMenu.tsx
    │   │   ├── NavItem.tsx
    │   │   └── ToggleButtons.tsx
    │   ├── SEO.tsx
    │   ├── musicPlayer.tsx
    │   └── solarSystem.tsx
    └── lib/
        └── utils.ts

```

## Getting Started

1. **Clone the repository:**

   ```bash
   git clone <repository-url>
   cd chat-frontend
   ```

2. **Install dependencies:**

   ```bash
   npm install
   # or using yarn:
   yarn install
   ```

3. **Run the development server:**

   ```bash
   npm run dev
   # or:
   yarn dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

## Development

- **Editing Pages & Components**: Modify the pages located in `page.tsx` or individual components (see `src/components/Footer/footer.tsx`) for a live-update experience.
- **Styling with Tailwind CSS**: Update styles or the configuration via `tailwind.config.ts` and `globals.css`.
- **TypeScript**: Ensure code quality by leveraging TypeScript. Use the provided type definitions to maintain clarity and robustness.
- **ESLint**: Follow the defined linting rules that extend `next/core-web-vitals`.

## Deployment

1. **Build the project:**

   ```bash
   npm run build
   # or:
   yarn build
   ```

2. **Start the production server:**

   ```bash
   npm run start
   # or:
   yarn start
   ```

You can also deploy this Next.js application on platforms like [Vercel](https://vercel.com/) by connecting the GitHub repository and following their deployment guidelines.

## Contributing

Contributions are welcome! Please fork the repository and create pull requests for improvements or bug fixes. Follow the standard guidelines and ensure your new code adheres to the project's style and architecture.

## License

Distributed under the MIT License. See LICENSE for more information.

---

This project is maintained with care and quality. Enjoy exploring and enhancing this Next.js-based personal website!
