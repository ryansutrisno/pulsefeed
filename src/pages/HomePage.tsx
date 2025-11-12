import { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { Post } from '@shared/types';
import { api } from '@/lib/api-client';
import { Toaster, toast } from '@/components/ui/sonner';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PostCard } from '@/components/PostCard';
import { PostSkeleton } from '@/components/PostSkeleton';
import { motion, AnimatePresence } from 'framer-motion';
import { Waves, RefreshCw } from 'lucide-react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { PostDetail } from '@/components/PostDetail';
import { PostLoader } from '@/components/PostLoader';
import { UserNav } from '@/components/UserNav';
import { EmptyState } from '@/components/EmptyState';
type FilterType = 'all' | 'instagram' | 'threads';
type SortType = 'trending' | 'newest';
export function HomePage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [initialLoading, setInitialLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [nextCursor, setNextCursor] = useState<string | null>(null);
  const [filter, setFilter] = useState<FilterType>('all');
  const [sort, setSort] = useState<SortType>('trending');
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const observer = useRef<IntersectionObserver>();
  const fetchMorePosts = useCallback(async () => {
    if (loadingMore || !nextCursor) return;
    setLoadingMore(true);
    try {
      const url = `/api/posts?limit=9&cursor=${nextCursor}`;
      const { items, next } = await api<{ items: Post[]; next: string | null }>(url);
      setPosts(prev => [...prev, ...items]);
      setNextCursor(next);
    } catch (error) {
      toast.error('Failed to fetch more posts.');
      console.error(error);
    } finally {
      setLoadingMore(false);
    }
  }, [nextCursor, loadingMore]);
  const loadMoreRef = useCallback((node: HTMLDivElement) => {
    if (initialLoading || loadingMore) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && nextCursor) {
        fetchMorePosts();
      }
    });
    if (node) observer.current.observe(node);
  }, [initialLoading, loadingMore, nextCursor, fetchMorePosts]);
  const fetchInitialPosts = () => {
    setInitialLoading(true);
    setPosts([]);
    setNextCursor(null);
    api<{ items: Post[]; next: string | null }>(`/api/posts?limit=9`)
      .then(({ items, next }) => {
        setPosts(items);
        setNextCursor(next);
      })
      .catch(error => {
        toast.error('Failed to fetch posts. Please try again later.');
        console.error(error);
      })
      .finally(() => {
        setInitialLoading(false);
      });
  };
  useEffect(() => {
    fetchInitialPosts();
  }, []);
  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      const { items } = await api<{ items: Post[]; next: string | null }>(`/api/posts?shuffle=true&limit=9`);
      setPosts(items);
      setNextCursor(null); // Shuffled results are not paginated
      window.scrollTo({ top: 0, behavior: 'smooth' });
      toast.success("Feed refreshed!");
    } catch (error) {
      toast.error('Failed to refresh feed.');
      console.error(error);
    } finally {
      setIsRefreshing(false);
    }
  };
  const filteredAndSortedPosts = useMemo(() => {
    let result = posts;
    if (filter !== 'all') {
      result = result.filter(post => post.platform === filter);
    }
    if (sort === 'newest') {
      result = [...result].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    } else { // 'trending'
      result = [...result].sort((a, b) => (b.likes + (b.comments * 2) + (b.shares || 0 * 3)) - (a.likes + (a.comments * 2) + (a.shares || 0 * 3)));
    }
    return result;
  }, [posts, filter, sort]);
  return (
    <Dialog open={!!selectedPost} onOpenChange={(isOpen) => !isOpen && setSelectedPost(null)}>
      <div className="min-h-screen bg-background text-foreground">
        <UserNav />
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
            className="sticky top-0 z-40 bg-background/80 backdrop-blur-sm py-4 mb-8"
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
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <Select value={sort} onValueChange={(value: SortType) => setSort(value)}>
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="trending">Trending</SelectItem>
                    <SelectItem value="newest">Newest</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" size="icon" onClick={handleRefresh} disabled={isRefreshing}>
                  <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
                </Button>
              </div>
            </div>
          </motion.div>
          <div className="pb-16 md:pb-24 lg:pb-32">
            {initialLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {Array.from({ length: 9 }).map((_, i) => <PostSkeleton key={i} />)}
              </div>
            ) : filteredAndSortedPosts.length === 0 ? (
              <EmptyState
                title="No Posts Found"
                message="Try adjusting your filters to discover more viral content."
              />
            ) : (
              <AnimatePresence>
                <motion.div
                  layout
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
                >
                  {filteredAndSortedPosts.map((post) => (
                    <motion.div
                      key={post.id}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.3 }}
                    >
                      <PostCard post={post} onPostSelect={setSelectedPost} />
                    </motion.div>
                  ))}
                  {(loadingMore || nextCursor) && <div ref={loadMoreRef} className="col-span-full" />}
                  {loadingMore && <PostLoader />}
                </motion.div>
              </AnimatePresence>
            )}
          </div>
        </main>
        <footer className="text-center py-8 border-t space-y-2">
          <p className="text-muted-foreground">Built with ❤️ at Cloudflare</p>
          <p className="text-xs text-muted-foreground/80 px-4">
            Disclaimer: All content is for demonstration purposes only and is not from live Instagram or Threads APIs.
          </p>
        </footer>
        <Toaster richColors />
      </div>
      <DialogContent className="max-w-4xl p-0 gap-0">
        {selectedPost && <PostDetail post={selectedPost} />}
      </DialogContent>
    </Dialog>
  );
}