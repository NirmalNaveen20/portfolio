import Portfolio from "@/components/portfolio/Portfolio";
import "@/components/portfolio/portfolio.css";

import {getPosts} from "@/lib/blog";
import "@/components/blog/blog.css";

export default function Home() {
  return <Portfolio posts={getPosts().slice(0,4)} />;
}
