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
      'en': 'Founder & Developer',
      'es': 'Fundador y Desarrollador',
      'de': 'Gründer & Entwickler',
      'ja': '創業者＆開発者',
      'it': 'Fondatore e Sviluppatore'
    },
    company: 'Agoriz',
    period: {
      'pt-BR': 'Jun 2025 - Presente',
      'en': 'Jun 2025 - Present',
      'es': 'Jun 2025 - Presente',
      'de': 'Jun 2025 - Gegenwart',
      'ja': '2025年6月 - 現在',
      'it': 'Giu 2025 - Presente'
    },
    location: {
      'pt-BR': 'Remoto',
      'en': 'Remote',
      'es': 'Remoto',
      'de': 'Remote',
      'ja': 'リモート',
      'it': 'Remoto'
    },
    description: {
      'pt-BR': 'Criei e lidero o Agoriz, protocolo de pagamentos descentralizado "Stripe para blockchain". Desenvolvo e otimizo smart contracts com segurança rigorosa, arquitetura multi-chain e zero-custódia. Responsável por design, testes, deploy e planejamento de funcionalidades, garantindo escalabilidade e privacidade total.',
      'en': 'Created and lead Agoriz, a decentralized payment protocol—"Stripe for blockchain". Develop and optimize smart contracts with strict security, multi-chain architecture, and zero-custody. Responsible for design, testing, deployment, and feature planning, ensuring scalability and full privacy.',
      'es': 'Creé y lidero Agoriz, protocolo de pagos descentralizado—"Stripe para blockchain". Desarrollo y optimizo smart contracts con seguridad rigurosa, arquitectura multi-chain y cero custodia. Responsable del diseño, pruebas, despliegue y planificación de funcionalidades, garantizando escalabilidad y privacidad total.',
      'de': 'Habe Agoriz erstellt und leite es, ein dezentrales Zahlungsprotokoll—"Stripe für Blockchain". Entwickle und optimiere Smart Contracts mit strenger Sicherheit, Multi-Chain-Architektur und Zero-Custody. Verantwortlich für Design, Tests, Deployment und Feature-Planung, um Skalierbarkeit und vollständige Privatsphäre zu gewährleisten.',
      'ja': 'Agoriz（ブロックチェーン向けの「Stripe」）というスマートコントラクト向けの分散型決済プロトコルを構築・統括しています。厳密なセキュリティ、マルチチェーン・アーキテクチャ、ノンカストディアル設計のスマートコントラクトを開発・最適化。設計、テスト、デプロイメント、機能計画を担当し、スケーラビリティと完全なプライバシーを保証。',
      'it': 'Creato e guidato Agoriz, un protocollo di pagamento decentralizzato—"Stripe per blockchain". Sviluppo e ottimizzazione di smart contract con sicurezza rigorosa, architettura multi-chain e zero-custody. Responsabile della progettazione, test, deployment e pianificazione delle funzionalità, garantendo scalabilità e privacy totale.'
    },
    highlights: ['Solidity', 'Smart Contracts', 'EVM', 'Multi-chain', 'Gas Optimization', 'Security (MEV, Reentrancy)', 'Modular Architecture']
  },
  {
    title: {
      'pt-BR': 'Desenvolvedor de Software',
      'en': 'Software Developer',
      'es': 'Desarrollador de Software',
      'de': 'Software-Entwickler',
      'ja': 'ソフトウェア開発者',
      'it': 'Sviluppatore Software'
    },
    company: 'Higher Order Company',
    period: {
      'pt-BR': 'Mar 2023 - Fev 2025',
      'en': 'Mar 2023 - Feb 2025',
      'es': 'Mar 2023 - Feb 2025',
      'de': 'Mär 2023 - Feb 2025',
      'ja': '2023年3月 - 2025年2月',
      'it': 'Mar 2023 - Feb 2025'
    },
    location: {
      'pt-BR': 'São Paulo, Brasil (Híbrido)',
      'en': 'São Paulo, Brazil (Hybrid)',
      'es': 'São Paulo, Brasil (Híbrido)',
      'de': 'São Paulo, Brasilien (Hybrid)',
      'ja': 'サンパウロ、ブラジル（ハイブリッド）',
      'it': 'San Paolo, Brasile (Ibrido)'
    },
    description: {
      'pt-BR': 'Dois anos desenvolvendo soluções web escaláveis com foco em qualidade e performance. Contribuí em projetos open-source de destaque (Bend 19k⭐, Kind 3.7k⭐). Criei interfaces responsivas, APIs robustas e sistemas de autenticação seguros, sempre aplicando boas práticas e testes automatizados.',
      'en': 'Two years developing scalable web solutions focused on quality and performance. Contributed to prominent open-source projects (Bend 19k⭐, Kind 3.7k⭐). Built responsive interfaces, robust APIs, and secure authentication systems, always applying best practices and automated testing.',
      'es': 'Dos años desarrollando soluciones web escalables con enfoque en calidad y rendimiento. Contribuí a proyectos open-source destacados (Bend 19k⭐, Kind 3.7k⭐). Creé interfaces responsivas, APIs robustas y sistemas de autenticación seguros, siempre aplicando mejores prácticas y pruebas automatizadas.',
      'de': 'Zwei Jahre Entwicklung skalierbarer Web-Lösungen mit Fokus auf Qualität und Performance. Beitrug zu prominenten Open-Source-Projekten (Bend 19k⭐, Kind 3.7k⭐). Erstellte responsive Interfaces, robuste APIs und sichere Authentifizierungssysteme, wobei immer Best Practices und automatisierte Tests angewendet wurden.',
      'ja': '2年間、品質とパフォーマンスに焦点を当てたスケーラブルなウェブソリューションを開発。著名なオープンソースプロジェクト（Bend 19k⭐、Kind 3.7k⭐）に貢献。レスポンシブインターフェース、堅牢なAPI、安全な認証システムを構築し、ベストプラクティスと自動テストを常に適用。',
      'it': 'Due anni sviluppando soluzioni web scalabili focalizzate sulla qualità e performance. Contribuito a importanti progetti open-source (Bend 19k⭐, Kind 3.7k⭐). Costruito interfacce responsive, API robuste e sistemi di autenticazione sicuri, applicando sempre best practice e test automatizzati.'
    },
    highlights: ['React', 'TypeScript', 'Backend APIs', 'Security', 'Performance Optimization', 'Open-source', 'Automated Testing']
  },
  {
    title: {
      'pt-BR': 'Desenvolvedor de Jogos',
      'en': 'Game Developer',
      'es': 'Desarrollador de Videojuegos',
      'de': 'Spieleentwickler',
      'ja': 'ゲーム開発者',
      'it': 'Sviluppatore di Videogiochi'
    },
    company: 'UwU Games',
    period: {
      'pt-BR': 'Out 2023 - Set 2024',
      'en': 'Oct 2023 - Sep 2024',
      'es': 'Oct 2023 - Sep 2024',
      'de': 'Okt 2023 - Sep 2024',
      'ja': '2023年10月 - 2024年9月',
      'it': 'Ott 2023 - Set 2024'
    },
    location: {
      'pt-BR': 'Remoto (Meio período)',
      'en': 'Remote (Part-time)',
      'es': 'Remoto (Medio tiempo)',
      'de': 'Remote (Teilzeit)',
      'ja': 'リモート（パートタイム）',
      'it': 'Remoto (Part-time)'
    },
    description: {
      'pt-BR': 'Desenvolvi mecânicas de jogo complexas, sistemas de IA, simulações físicas e experiências imersivas. Criei shaders e efeitos visuais, otimizando para múltiplas plataformas. Colaborei com artistas e designers para integração de ativos e qualidade visual.',
      'en': 'Developed complex game mechanics, AI systems, physics simulations, and immersive experiences. Created shaders and visual effects, optimizing for multiple platforms. Collaborated with artists and designers for asset integration and visual quality.',
      'es': 'Desarrollé mecánicas de juego complejas, sistemas de IA, simulaciones físicas y experiencias inmersivas. Creé shaders y efectos visuales, optimizando para múltiples plataformas. Colaboré con artistas y diseñadores para integración de activos y calidad visual.',
      'de': 'Entwickelte komplexe Spielmechaniken, KI-Systeme, Physiksimulationen und immersive Erlebnisse. Erstellte Shader und visuelle Effekte mit Optimierung für mehrere Plattformen. Arbeitete mit Künstlern und Designern für Asset-Integration und visuelle Qualität zusammen.',
      'ja': '複雑なゲームメカニクス、AIシステム、物理シミュレーション、没入感のある体験を開発。シェーダーとビジュアルエフェクトを作成し、複数のプラットフォーム向けに最適化。アセット統合とビジュアル品質のためアーティストとデザイナーと協働。',
      'it': 'Sviluppato meccaniche di gioco complesse, sistemi di IA, simulazioni fisiche ed esperienze immersive. Creato shader e effetti visivi, ottimizzati per multiple piattaforme. Collaborato con artisti e designer per integrazione di asset e qualità visiva.'
    },
    highlights: ['Godot', 'Unity', 'Game Design', 'AI & Physics', 'Shaders & VFX', 'Multi-platform Optimization']
  },
  {
    title: {
      'pt-BR': 'Aprendiz de Programação Funcional',
      'en': 'Functional Programming Apprentice',
      'es': 'Aprendiz de Programación Funcional',
      'de': 'Lehrling für Funktionale Programmierung',
      'ja': '関数型プログラミング見習い',
      'it': 'Apprendista Programmazione Funzionale'
    },
    company: 'Kindelia',
    period: {
      'pt-BR': 'Abr 2022 - Abr 2023',
      'en': 'Apr 2022 - Apr 2023',
      'es': 'Abr 2022 - Abr 2023',
      'de': 'Apr 2022 - Apr 2023',
      'ja': '2022年4月 - 2023年4月',
      'it': 'Apr 2022 - Apr 2023'
    },
    location: {
      'pt-BR': 'Remoto',
      'en': 'Remote',
      'es': 'Remoto',
      'de': 'Remote',
      'ja': 'リモート',
      'it': 'Remoto'
    },
    description: {
      'pt-BR': 'Estudei e apliquei programação funcional com Haskell, Agda, Kind e HVM. Pesquisei Web3 e smart contracts, aplicando métodos formais para garantir correção de software e abstrações matemáticas precisas.',
      'en': 'Studied and applied functional programming with Haskell, Agda, Kind, and HVM. Researched Web3 and smart contracts, applying formal methods to ensure software correctness and precise mathematical abstractions.',
      'es': 'Estudié y apliqué programación funcional con Haskell, Agda, Kind y HVM. Investigué Web3 y smart contracts, aplicando métodos formales para garantizar corrección de software y abstracciones matemáticas precisas.',
      'de': 'Studierte und wendete funktionale Programmierung mit Haskell, Agda, Kind und HVM an. Forschte zu Web3 und Smart Contracts, wendete formale Methoden an, um Software-Korrektheit und präzise mathematische Abstraktionen zu gewährleisten.',
      'ja': 'Haskell、Agda、Kind、HVMを用いた関数型プログラミングを学習・応用。Web3とスマートコントラクトを研究し、ソフトウェアの正確性を保証し、正確な数学的抽象化を実現するために形式手法を適用。',
      'it': 'Studio e applicazione della programmazione funzionale con Haskell, Agda, Kind e HVM. Ricerca su Web3 e smart contract, applicando metodi formali per garantire la correttezza del software e precise astrazioni matematiche.'
    },
    highlights: ['Haskell', 'Agda', 'Kind', 'Formal Verification', 'Blockchain', 'Lambda Calculus']
  }
];

export const skillCategories: SkillCategory[] = [
  {
    label: {
      'pt-BR': 'Linguagens Funcionais & Formais',
      'en': 'Functional & Formal Languages',
      'es': 'Lenguajes Funcionales y Formales',
      'de': 'Funktionale & Formale Sprachen',
      'ja': '関数型・形式言語',
      'it': 'Linguaggi Funzionali e Formali'
    },
    items: ['Haskell', 'Agda', 'Idris', 'Kind', 'Formal Verification']
  },
  {
    label: {
      'pt-BR': 'Blockchain & Web3',
      'en': 'Blockchain & Web3',
      'es': 'Blockchain y Web3',
      'de': 'Blockchain & Web3',
      'ja': 'ブロックチェーン & Web3',
      'it': 'Blockchain & Web3'
    },
    items: ['Solidity', 'Rust (Anchor)', 'Smart Contracts', 'EVM', 'Multi-chain', 'DeFi', 'Hardhat']
  },
  {
    label: {
      'pt-BR': 'Web & Mobile',
      'en': 'Web & Mobile',
      'es': 'Web y Móvil',
      'de': 'Web & Mobile',
      'ja': 'Web & モバイル',
      'it': 'Web & Mobile'
    },
    items: ['React', 'Next.js', 'TypeScript', 'JavaScript', 'React Native', 'Expo', 'Tailwind CSS']
  },
  {
    label: {
      'pt-BR': 'Game Development',
      'en': 'Game Development',
      'es': 'Desarrollo de Videojuegos',
      'de': 'Spieleentwicklung',
      'ja': 'ゲーム開発',
      'it': 'Sviluppo di Videogiochi'
    },
    items: ['Godot', 'Unity', 'Game Design', 'Shaders', 'Optimization']
  },
  {
    label: {
      'pt-BR': 'Ferramentas & Práticas',
      'en': 'Tools & Practices',
      'es': 'Herramientas y Prácticas',
      'de': 'Werkzeuge & Praktiken',
      'ja': 'ツール & プラクティス',
      'it': 'Strumenti e Pratiche'
    },
    items: ['Vim', 'Git & CI/CD', 'Automated Testing', 'Performance Optimization', 'Modular Architecture', 'KISS & SRP']
  },
  {
    label: {
      'pt-BR': 'Domínios',
      'en': 'Domains',
      'es': 'Dominios',
      'de': 'Bereiche',
      'ja': 'ドメイン',
      'it': 'Domini'
    },
    items: ['DeFi & Blockchain', 'Functional Programming', 'Security & Privacy', 'Decentralized Systems', 'Web Development', 'Game Development']
  }
];
