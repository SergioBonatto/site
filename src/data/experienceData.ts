import { LanguageCode } from '@/i18n/types';

export interface Experience {
  title: Record<LanguageCode, string>;
  company: string;
  period: Record<LanguageCode, string>;
  location: Record<LanguageCode, string>;
  description: Record<LanguageCode, string>;
  highlights: string[];
}

export interface SkillCategory {
  label: Record<LanguageCode, string>;
  items: string[];
}

export const experiences: Experience[] = [
  {
    title: {
      'pt-BR': 'Fundador & Desenvolvedor',
      'en': 'Founder & Developer'
    },
    company: 'Agoriz',
    period: {
      'pt-BR': 'Jun 2025 – Presente',
      'en': 'Jun 2025 – Present'
    },
    location: {
      'pt-BR': 'Remoto',
      'en': 'Remote'
    },
    description: {
      'pt-BR': 'Criei e lidero o Agoriz, protocolo de pagamentos descentralizado "Stripe para blockchain". Desenvolvo e otimizo smart contracts com segurança rigorosa, arquitetura multi-chain e zero-custódia. Responsável por design, testes, deploy e planejamento de funcionalidades, garantindo escalabilidade e privacidade total.',
      'en': 'Created and lead Agoriz, a decentralized payment protocol—"Stripe for blockchain". Develop and optimize smart contracts with strict security, multi-chain architecture, and zero-custody. Responsible for design, testing, deployment, and feature planning, ensuring scalability and full privacy.'
    },
    highlights: ['Solidity', 'Smart Contracts', 'EVM', 'Multi-chain', 'Gas Optimization', 'Security (MEV, Reentrancy)', 'Modular Architecture']
  },
  {
    title: {
      'pt-BR': 'Desenvolvedor de Software',
      'en': 'Software Developer'
    },
    company: 'Higher Order Company',
    period: {
      'pt-BR': 'Mar 2023 – Fev 2025',
      'en': 'Mar 2023 – Feb 2025'
    },
    location: {
      'pt-BR': 'São Paulo, Brasil (Híbrido)',
      'en': 'São Paulo, Brazil (Hybrid)'
    },
    description: {
      'pt-BR': 'Dois anos desenvolvendo soluções web escaláveis com foco em qualidade e performance. Contribuí em projetos open-source de destaque (Bend 19k⭐, Kind 3.7k⭐). Criei interfaces responsivas, APIs robustas e sistemas de autenticação seguros, sempre aplicando boas práticas e testes automatizados.',
      'en': 'Two years developing scalable web solutions focused on quality and performance. Contributed to prominent open-source projects (Bend 19k⭐, Kind 3.7k⭐). Built responsive interfaces, robust APIs, and secure authentication systems, always applying best practices and automated testing.'
    },
    highlights: ['React', 'TypeScript', 'Backend APIs', 'Security', 'Performance Optimization', 'Open-source', 'Automated Testing']
  },
  {
    title: {
      'pt-BR': 'Desenvolvedor de Jogos',
      'en': 'Game Developer'
    },
    company: 'UwU Games',
    period: {
      'pt-BR': 'Out 2023 – Set 2024',
      'en': 'Oct 2023 – Sep 2024'
    },
    location: {
      'pt-BR': 'Remoto (Meio período)',
      'en': 'Remote (Part-time)'
    },
    description: {
      'pt-BR': 'Desenvolvi mecânicas de jogo complexas, sistemas de IA, simulações físicas e experiências imersivas. Criei shaders e efeitos visuais, otimizando para múltiplas plataformas. Colaborei com artistas e designers para integração de ativos e qualidade visual.',
      'en': 'Developed complex game mechanics, AI systems, physics simulations, and immersive experiences. Created shaders and visual effects, optimizing for multiple platforms. Collaborated with artists and designers for asset integration and visual quality.'
    },
    highlights: ['Godot', 'Unity', 'Game Design', 'AI & Physics', 'Shaders & VFX', 'Multi-platform Optimization']
  },
  {
    title: {
      'pt-BR': 'Aprendiz de Programação Funcional',
      'en': 'Functional Programming Apprentice'
    },
    company: 'Kindelia',
    period: {
      'pt-BR': 'Abr 2022 – Abr 2023',
      'en': 'Apr 2022 – Apr 2023'
    },
    location: {
      'pt-BR': 'Remoto',
      'en': 'Remote'
    },
    description: {
      'pt-BR': 'Estudei e apliquei programação funcional com Haskell, Agda, Kind e HVM. Pesquisei Web3 e smart contracts, aplicando métodos formais para garantir correção de software e abstrações matemáticas precisas.',
      'en': 'Studied and applied functional programming with Haskell, Agda, Kind, and HVM. Researched Web3 and smart contracts, applying formal methods to ensure software correctness and precise mathematical abstractions.'
    },
    highlights: ['Haskell', 'Agda', 'Kind', 'Formal Verification', 'Blockchain', 'Lambda Calculus']
  }
];

export const skillCategories: SkillCategory[] = [
  {
    label: {
      'pt-BR': 'Linguagens Funcionais & Formais',
      'en': 'Functional & Formal Languages'
    },
    items: ['Haskell', 'Agda', 'Idris', 'Kind', 'Formal Verification']
  },
  {
    label: {
      'pt-BR': 'Blockchain & Web3',
      'en': 'Blockchain & Web3'
    },
    items: ['Solidity', 'Rust (Anchor)', 'Smart Contracts', 'EVM', 'Multi-chain', 'DeFi', 'Hardhat']
  },
  {
    label: {
      'pt-BR': 'Web & Mobile',
      'en': 'Web & Mobile'
    },
    items: ['React', 'Next.js', 'TypeScript', 'JavaScript', 'React Native', 'Expo', 'Tailwind CSS']
  },
  {
    label: {
      'pt-BR': 'Game Development',
      'en': 'Game Development'
    },
    items: ['Godot', 'Unity', 'Game Design', 'Shaders', 'Optimization']
  },
  {
    label: {
      'pt-BR': 'Ferramentas & Práticas',
      'en': 'Tools & Practices'
    },
    items: ['Vim', 'Git & CI/CD', 'Automated Testing', 'Performance Optimization', 'Modular Architecture', 'KISS & SRP']
  },
  {
    label: {
      'pt-BR': 'Domínios',
      'en': 'Domains'
    },
    items: ['DeFi & Blockchain', 'Functional Programming', 'Security & Privacy', 'Decentralized Systems', 'Web Development', 'Game Development']
  }
];
