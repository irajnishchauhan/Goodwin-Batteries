import Parser from "rss-parser";
import Link from "next/link";
import { ArrowRight, ExternalLink, Clock } from "lucide-react";

interface BlogPost {
  title: string;
  link: string;
  pubDate: string;
  contentSnippet?: string;
  guid: string;
  isoDate?: string;
}

export const revalidate = 3600; // Revalidate every hour

async function getBatteryNews(): Promise<BlogPost[]> {
  try {
    const parser = new Parser();
    const feed = await parser.parseURL(
      'https://news.google.com/rss/search?q=inverter+battery+OR+"lead-acid+battery"+OR+"automotive+battery"&hl=en-IN&gl=IN&ceid=IN:en'
    );
    
    return feed.items.map(item => ({
      title: item.title || 'Battery Industry News',
      link: item.link || '#',
      pubDate: item.pubDate || new Date().toISOString(),
      contentSnippet: item.contentSnippet,
      guid: item.guid || item.link || Math.random().toString(),
      isoDate: item.isoDate,
    }));
  } catch (error) {
    console.error("Error fetching battery news:", error);
    return [];
  }
}

export default async function BlogsPage() {
  const news = await getBatteryNews();

  return (
    <main className="min-h-screen pt-24 pb-20">
      {/* Hero Section */}
      <section className="bg-surface py-20 relative overflow-hidden border-b border-border">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 blur-[150px] rounded-full pointer-events-none mix-blend-screen" />
        <div className="container relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-black mb-6 text-foreground leading-tight uppercase">
              Latest <span className="text-primary">Updates</span> & Insights
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              Stay informed with live news and updates from the battery industry. Discover the latest trends, technological advancements, and insights about energy storage solutions.
            </p>
          </div>
        </div>
      </section>

      {/* Blogs Grid */}
      <section className="py-20 relative">
        <div className="container relative z-10">
          {news.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {news.map((post) => (
                <a
                  key={post.guid}
                  href={post.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col bg-surface-hover rounded-xl overflow-hidden border border-border hover:border-primary/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_40px_-15px_rgba(0,255,102,0.1)] relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="p-8 flex flex-col h-full relative z-10">
                    <div className="flex items-center gap-2 text-primary text-sm font-bold mb-4">
                      <Clock size={16} />
                      <span>
                        {new Date(post.pubDate).toLocaleDateString('en-IN', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </span>
                    </div>
                    
                    <h2 className="text-xl font-heading font-bold text-foreground mb-4 group-hover:text-primary transition-colors line-clamp-3">
                      {post.title}
                    </h2>
                    
                    {post.contentSnippet && (
                      <p className="text-muted-foreground line-clamp-3 mb-8 flex-grow text-sm leading-relaxed">
                        {post.contentSnippet}
                      </p>
                    )}
                    
                    <div className="mt-auto flex items-center justify-between text-sm font-bold text-primary group-hover:text-white transition-colors pt-6 border-t border-border/50">
                      <span className="flex items-center gap-2">
                        Read Article <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                      </span>
                      <ExternalLink size={16} className="opacity-50" />
                    </div>
                  </div>
                </a>
              ))}
            </div>
          ) : (
             <div className="text-center py-32 bg-surface-hover rounded-2xl border border-border">
              <h3 className="text-2xl font-heading font-bold text-foreground mb-4">Fetching Updates...</h3>
              <p className="text-muted-foreground max-w-md mx-auto">
                Check back shortly for live updates on the battery industry.
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
