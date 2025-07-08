declare module 'prismjs/components/prism-*' {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const component: any;
  export = component;
}

declare module 'prismjs' {
  const Prism: {
    highlightAll: () => void;
    highlightElement: (element: Element) => void;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    languages: Record<string, any>;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    util: any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    hooks: any;
  };
  export default Prism;
  export = Prism;
}
