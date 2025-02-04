// File: [src/components/Blog/Articles/Post1/Post1.tsx](src/components/Blog/Articles/Post1/Post1.tsx)
import BlogPost, { BlogPostData } from '@/components/Blog/BlogPost';
import postContent from './Post1.mdx';
import postImage from '@/components/Blog/Articles/Post1/Post1.png';

const post: BlogPostData = {
  image: postImage,
  title: 'Seu terminal pode ser muito mais produtivo, bonito e amigável!',
  content: postContent,
};

export default function Post1Page() {
  return <BlogPost post={post} />;
}
