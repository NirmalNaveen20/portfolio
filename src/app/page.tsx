import Portfolio from "@/components/portfolio/Portfolio";
import "@/components/portfolio/portfolio.css";

import {getPosts} from "@/lib/blog";
import "@/components/blog/blog.css";

export default function Home() {
  const posts = getPosts();
  return <Portfolio posts={posts} />;
}
