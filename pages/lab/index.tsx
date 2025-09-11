import React from 'react';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Image from 'next/image';

// 1. Define a specific type for our post frontmatter
interface PostFrontmatter {
  title: string;
  date: string;
  author: string;
  category: string;
  image: string;
  excerpt: string;
}

interface Post {
  slug: string;
  frontmatter: PostFrontmatter; // 2. Use the specific type here
}

interface LabPageProps {
  posts: Post[];
}

const PostCard: React.FC<{ post: Post; index: number }> = ({ post, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
  >
    <Link href={`/lab/${post.slug}`} className="block h-full">
      <div className="group bg-card border border-border rounded-2xl overflow-hidden h-full flex flex-col">
        <div className="relative w-full aspect-[16/9]">
          <Image src={post.frontmatter.image} layout="fill" objectFit="cover" alt={post.frontmatter.title} className="group-hover:scale-105 transition-transform duration-300" />
        </div>
        <div className="p-6 flex flex-col flex-grow">
          <span className="text-sm font-semibold text-primary mb-2">{post.frontmatter.category}</span>
          <h2 className="text-xl font-bold text-foreground mb-3 flex-grow">{post.frontmatter.title}</h2>
          <p className="text-muted-foreground mb-4">{post.frontmatter.excerpt}</p>
          <div className="mt-auto text-sm text-muted-foreground">
            <span>{post.frontmatter.author}</span> &bull; <span>{new Date(post.frontmatter.date).toLocaleDateString('fa-IR')}</span>
          </div>
        </div>
      </div>
    </Link>
  </motion.div>
);

const LabPage: React.FC<LabPageProps> = ({ posts }) => {
  return (
    <div>
      {/* Hero Section */}
      <section className="py-24 text-center">
        <h1 className="text-5xl font-extrabold text-foreground">آزمایشگاه دانش</h1>
        <p className="mt-4 text-xl text-muted-foreground">مقالات فنی، تحقیقات و آخرین دستاوردهای تیم ما</p>
      </section>

      {/* Posts Grid */}
      <section className="container mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <PostCard key={post.slug} post={post} index={index} />
          ))}
        </div>
      </section>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const files = fs.readdirSync(path.join('_posts'));

  const posts = files.map(filename => {
    const slug = filename.replace('.mdx', '');
    const markdownWithMeta = fs.readFileSync(path.join('_posts', filename), 'utf-8');
    const { data: frontmatter } = matter(markdownWithMeta);
    return {
      slug,
      frontmatter,
    };
  });
  
  // Sort posts by date in descending order
  const sortedPosts = posts.sort((a, b) => new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime());

  return {
    props: {
      posts: sortedPosts,
      ...(await serverSideTranslations(locale!, ['common'])),
    },
  };
};

export default LabPage;