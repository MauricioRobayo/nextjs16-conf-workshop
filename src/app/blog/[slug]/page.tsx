import {cacheLife} from "next/cache";

import {getBlogPostBySlug, getBlogPosts} from "@/api";

export async function generateStaticParams() {
  const posts = await getBlogPosts();

  return posts.map((post) => ({slug: post.slug}));
}

export default async function Page({params}: {params: Promise<{slug: string}>}) {
  "use cache";
  cacheLife("max");
  const {slug} = await params;
  const post = await getBlogPostBySlug(slug);

  return <div>{post?.content}</div>;
}
