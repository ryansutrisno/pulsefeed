import { Post } from "@shared/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { MessageCircle, Heart, Repeat, Send, Instagram } from "lucide-react";
import { formatDistanceToNow } from 'date-fns';
import { useMemo } from "react";
import { cn } from "@/lib/utils";
import { usePostInteractionStore } from "@/stores/postInteractionStore";
import { motion } from "framer-motion";
const ThreadsIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 256 256"
    aria-hidden="true"
    {...props}
  >
    <path d="M156.58,104.42a4,4,0,0,1-5.66,0L128,81.51,105.08,104.42a4,4,0,0,1-5.66-5.66l25.83-25.83a4,4,0,0,1,5.66,0l25.67,25.67a4,4,0,0,1,0,5.66ZM228,128a100,100,0,1,1-100-100A100.11,100.11,0,0,1,228,128Zm-20,0a80,80,0,1,0-80,80A80.09,80.09,0,0,0,208,128Zm-80,47.5a48,48,0,0,0,42.92-25.58,4,4,0,1,0-7-4.84A40,40,0,0,1,92,140a39.43,39.43,0,0,1,11.12-28.08,4,4,0,1,0-5.66-5.66A47.6,47.6,0,0,0,80,140a48,48,0,0,0,48,47.5Z"></path>
  </svg>
);
const formatNumber = (num: number): string => {
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}m`;
  if (num >= 1000) return `${(num / 1000).toFixed(1)}k`;
  return num.toString();
};
interface PostCardProps {
    post: Post;
    onPostSelect: (post: Post) => void;
    className?: string;
}
export function PostCard({ post, onPostSelect, className }: PostCardProps) {
  const isLiked = usePostInteractionStore(state => state.isLiked(post.id));
  const toggleLike = usePostInteractionStore(state => state.toggleLike);
  const timeAgo = useMemo(() => {
    return formatDistanceToNow(new Date(post.createdAt), { addSuffix: true });
  }, [post.createdAt]);
  const handleLikeClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleLike(post.id);
  };
  const optimisticLikes = post.likes + (isLiked ? 1 : 0);
  const PlatformIcon = post.platform === 'instagram' ? Instagram : ThreadsIcon;
  return (
    <Card
        className={cn("overflow-hidden transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-1 flex flex-col h-full cursor-pointer", className)}
        onClick={() => onPostSelect(post)}
    >
      <CardHeader className="flex flex-row items-center gap-3 p-4">
        <Avatar>
          <AvatarImage src={post.authorAvatar} alt={post.authorName} />
          <AvatarFallback>{post.authorName.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <p className="font-semibold text-sm">{post.authorName}</p>
          <p className="text-xs text-muted-foreground">@{post.authorHandle}</p>
        </div>
        <PlatformIcon className="w-5 h-5 text-muted-foreground" />
      </CardHeader>
      <CardContent className="p-4 pt-0 flex-1">
        <p className="text-sm mb-4 whitespace-pre-wrap">{post.content}</p>
        {post.mediaUrl && (
          <div className="rounded-lg overflow-hidden border">
            <AspectRatio ratio={post.mediaAspectRatio || 16 / 9}>
              <img
                src={post.mediaUrl}
                alt="Post media"
                className="object-cover w-full h-full"
              />
            </AspectRatio>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex flex-col items-start p-4 pt-0">
        <p className="text-xs text-muted-foreground mb-3">{timeAgo}</p>
        <div className="flex items-center justify-between w-full text-muted-foreground">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="w-auto h-auto p-1 group -ml-1" onClick={handleLikeClick}>
              <motion.div
                animate={{ scale: isLiked ? [1, 1.3, 1] : 1 }}
                transition={{ duration: 0.3 }}
              >
                <Heart className={cn("w-5 h-5 group-hover:text-red-500 transition-colors", isLiked && "fill-red-500 text-red-500")} />
              </motion.div>
              <span className="text-sm ml-2 font-medium">{formatNumber(optimisticLikes)}</span>
            </Button>
            <div className="flex items-center group">
              <MessageCircle className="w-5 h-5" />
              <span className="text-sm ml-2 font-medium">{formatNumber(post.comments)}</span>
            </div>
            {post.platform === 'threads' && post.shares != null && (
              <div className="flex items-center group">
                <Repeat className="w-5 h-5" />
                <span className="text-sm ml-2 font-medium">{formatNumber(post.shares)}</span>
              </div>
            )}
          </div>
          <Button variant="ghost" size="icon" className="group -mr-2" onClick={(e) => e.stopPropagation()}>
            <Send className="w-5 h-5 group-hover:text-primary transition-colors" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}