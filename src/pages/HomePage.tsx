import { useState, useEffect, useMemo } from 'react';
import { Post } from '@shared/types';
import { api } from '@/lib/api-client';
import { Toaster, toast } from '@/components/ui/sonner';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PostCard } from '@/components/PostCard';
import { PostSkeleton } from '@/components/PostSkeleton';
import { motion, AnimatePresence } from 'framer-motion';
import { Waves } from 'lucide-react';
type FilterType = 'all' | 'instagram' | 'threads';
type SortType = 'trending' | 'newest';
export function HomePage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<FilterType>('all');
  const [sort, setSort] = useState<SortType>('trending');
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const fetchedPosts = await api<Post[]>('/api/posts');
        setPosts(fetchedPosts);
      } catch (error) {
        toast.error('Failed to fetch posts. Please try again later.');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);
  const filteredAndSortedPosts = useMemo(() => {
    let result = posts;
    if (filter !== 'all') {
      result = result.filter(post => post.platform === filter);
    }
    if (sort === 'newest') {
      result = [...result].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    } else { // 'trending'
      result = [...result].sort((a, b) => (b.likes + b.comments) - (a.likes + a.comments));
    }
    return result;
  }, [posts, filter, sort]);
  return (
    <div className="min-h-screen bg-background text-foreground">
      <ThemeToggle className="fixed top-4 right-4" />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-16 md:py-24 lg:py-32 text-center relative">
          <div className="absolute inset-0 -z-10 bg-gradient-hero opacity-50 dark:opacity-100" />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center justify-center bg-primary text-primary-foreground p-3 rounded-full mb-4 shadow-lg">
              <Waves className="h-8 w-8" />
            </div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-foreground to-muted-foreground">
              PulseFeed
            </h1>
            <p className="mt-4 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover the most viral and trending content from Instagram and Threads, all in one place.
            </p>
          </motion.div>
        </div>
        <motion.div
          className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm py-4 mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Button variant={filter === 'all' ? 'default' : 'outline'} onClick={() => setFilter('all')}>All</Button>
              <Button variant={filter === 'instagram' ? 'default' : 'outline'} onClick={() => setFilter('instagram')}>Instagram</Button>
              <Button variant={filter === 'threads' ? 'default' : 'outline'} onClick={() => setFilter('threads')}>Threads</Button>
            </div>
            <Select value={sort} onValueChange={(value: SortType) => setSort(value)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="trending">Trending</SelectItem>
                <SelectItem value="newest">Newest</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </motion.div>
        <div className="pb-16 md:pb-24 lg:pb-32">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {Array.from({ length: 9 }).map((_, i) => <PostSkeleton key={i} />)}
            </div>
          ) : (
            <AnimatePresence>
              <motion.div
                layout
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
              >
                {filteredAndSortedPosts.map(post => (
                  <motion.div
                    key={post.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                  >
                    <PostCard post={post} />
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </main>
      <footer className="text-center py-8 border-t">
        <p className="text-muted-foreground">Built with ❤️ at Cloudflare</p>
      </footer>
      <Toaster richColors />
    </div>
  );
}