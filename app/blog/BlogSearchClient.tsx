"use client"

import { useState, useEffect } from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  featured_image: string;
  author_name: string;
  published_at: string | null;
}

interface BlogSearchClientProps {
  initialPosts: BlogPost[];
}

export function BlogSearchClient({ initialPosts }: BlogSearchClientProps) {
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    if (!searchQuery) {
      // Show all posts
      const grid = document.getElementById('blog-posts-grid');
      if (grid) {
        const cards = grid.querySelectorAll('[data-post-id]');
        cards.forEach(card => {
          (card as HTMLElement).style.display = '';
        });
      }
      return;
    }

    // Filter posts client-side
    const query = searchQuery.toLowerCase();
    const grid = document.getElementById('blog-posts-grid');
    if (grid) {
      const cards = grid.querySelectorAll('[data-post-id]');
      cards.forEach(card => {
        const title = card.getAttribute('data-post-title')?.toLowerCase() || '';
        const excerpt = card.getAttribute('data-post-excerpt')?.toLowerCase() || '';

        if (title.includes(query) || excerpt.includes(query)) {
          (card as HTMLElement).style.display = '';
        } else {
          (card as HTMLElement).style.display = 'none';
        }
      });
    }
  }, [searchQuery]);

  return (
    <div className="relative max-w-2xl mx-auto">
      <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/80 h-5 w-5" />
      <Input
        type="text"
        placeholder="Search articles..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="pl-12 pr-4 py-3 text-lg bg-white/10 border-white/20 text-white placeholder:text-white/80 focus:bg-white/20"
      />
    </div>
  );
}
