import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import React from 'react';

const components: { [key: string]: React.ComponentType } = {
  post1: dynamic(() => import('@/components/Blog/Articles/Post1/Post1')),
  // adicione aqui outros posts, se necessário
};

const PostPage: React.FC = () => {
  const router = useRouter();
  const { slug } = router.query;

  if (!slug || typeof slug !== 'string') {
    return <p>Carregando...</p>;
  }

  const Component = components[slug];

  if (!Component) {
    return <p>404 - Post não encontrado</p>;
  }

  return <Component />;
};

export default PostPage;
