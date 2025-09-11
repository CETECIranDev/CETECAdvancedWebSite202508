import { GetStaticPaths, GetStaticProps } from 'next';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Image from 'next/image';
// 'ReactNode' and 'HTMLProps' are no longer needed here as we will use more specific types
import React from 'react';

interface PostFrontmatter {
  title: string;
  date: string;
  author: string;
  category: string;
  image: string;
  excerpt: string;
}

interface PostPageProps {
  frontmatter: PostFrontmatter;
  mdxSource: MDXRemoteSerializeResult;
}

// --- THIS IS THE FIX ---
// Instead of one generic type, we use specific types for each component.
// This ensures that the props match the underlying HTML element.
const components = {
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3 className="text-2xl font-bold mt-8 mb-4 text-foreground" {...props} />
  ),
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className="text-lg leading-relaxed text-muted-foreground mb-6" {...props} />
  ),
  blockquote: (props: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote className="border-r-4 border-primary pr-4 my-6 italic text-foreground bg-muted p-4 rounded-r-lg" {...props} />
  ),
  pre: (props: React.HTMLAttributes<HTMLPreElement>) => (
    <pre className="bg-muted p-4 rounded-lg overflow-x-auto my-6 text-sm" {...props} />
  ),
  code: (props: React.HTMLAttributes<HTMLElement>) => (
    <code className="text-secondary font-mono bg-muted px-1 py-0.5 rounded" {...props} />
  ),
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className="list-disc list-inside space-y-2 mb-6 text-muted-foreground" {...props} />
  ),
  li: (props: React.HTMLAttributes<HTMLLIElement>) => (
    <li className="pl-2" {...props} />
  ),
};

const PostPage: React.FC<PostPageProps> = ({ frontmatter, mdxSource }) => {
  return (
    <article className="container mx-auto px-6 max-w-3xl py-16">
      <header className="mb-12 text-center">
        <span className="text-primary font-semibold">{frontmatter.category}</span>
        <h1 className="text-4xl md:text-5xl font-extrabold mt-2 mb-4 text-foreground">{frontmatter.title}</h1>
        <div className="text-muted-foreground">
          <span>{frontmatter.author}</span> &bull; <span>{new Date(frontmatter.date).toLocaleDateString('fa-IR')}</span>
        </div>
      </header>
      <div className="relative w-full aspect-[16/9] mb-12 rounded-2xl overflow-hidden shadow-lg">
        <Image src={frontmatter.image} layout="fill" objectFit="cover" alt={frontmatter.title} />
      </div>
      
      <MDXRemote {...mdxSource} components={components} />
      
    </article>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const files = fs.readdirSync(path.join('_posts'));
  const paths = files.map(filename => ({
    params: {
      slug: filename.replace('.mdx', ''),
    },
  }));
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params, locale }) => {
  const slug = params?.slug as string;
  const markdownWithMeta = fs.readFileSync(path.join('_posts', slug + '.mdx'), 'utf-8');
  const { data: frontmatter, content } = matter(markdownWithMeta);
  const mdxSource = await serialize(content);

  return {
    props: {
      frontmatter,
      mdxSource,
      ...(await serverSideTranslations(locale!, ['common'])),
    },
  };
};

export default PostPage;