export interface Experience {
  id: string;
  company: string;
  highlights: string[];
}

export interface SkillCategory {
  id: string;
  items: string[];
}

export const experiences: Experience[] = [
  {
    id: 'agoriz',
    company: 'Agoriz',
    highlights: ['Solidity', 'Smart Contracts', 'EVM', 'Multi-chain', 'Gas Optimization', 'Security (MEV, Reentrancy)', 'Modular Architecture']
  },
  {
    id: 'hoc',
    company: 'Higher Order Company',
    highlights: ['React', 'TypeScript', 'Backend APIs', 'Security', 'Performance Optimization', 'Open-source', 'Automated Testing']
  },
  {
    id: 'uwu',
    company: 'UwU Games',
    highlights: ['Godot', 'Unity', 'Game Design', 'AI & Physics', 'Shaders & VFX', 'Multi-platform Optimization']
  },
  {
    id: 'kindelia',
    company: 'Kindelia',
    highlights: ['Haskell', 'Agda', 'Kind', 'Formal Verification', 'Blockchain', 'Lambda Calculus']
  }
];

export const skillCategories: SkillCategory[] = [
  {
    id: 'functional',
    items: ['Haskell', 'Agda', 'Idris', 'Kind', 'Formal Verification']
  },
  {
    id: 'blockchain',
    items: ['Solidity', 'Rust (Anchor)', 'Smart Contracts', 'EVM', 'Multi-chain', 'DeFi', 'Hardhat']
  },
  {
    id: 'web',
    items: ['React', 'Next.js', 'TypeScript', 'JavaScript', 'React Native', 'Expo', 'Tailwind CSS']
  },
  {
    id: 'game',
    items: ['Godot', 'Unity', 'Game Design', 'Shaders', 'Optimization']
  },
  {
    id: 'tools',
    items: ['Vim', 'Git & CI/CD', 'Automated Testing', 'Performance Optimization', 'Modular Architecture', 'KISS & SRP']
  },
  {
    id: 'domains',
    items: ['DeFi & Blockchain', 'Functional Programming', 'Security & Privacy', 'Decentralized Systems', 'Web Development', 'Game Development']
  }
];