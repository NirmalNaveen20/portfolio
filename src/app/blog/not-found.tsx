import Link from 'next/link';

export default function ArticleNotFound() {
  return <div className="journal-wrap"><div className="journal-empty">
    <p className="kicker">BLOG</p><h1>Article not found</h1>
    <p>This article may have moved or is not published yet.</p>
    <Link className="button" href="/blog">Browse articles</Link>
  </div></div>;
}
