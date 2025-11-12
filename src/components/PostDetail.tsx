import { Post, Comment } from "@shared/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { MessageCircle, Heart, Repeat, Send, Instagram } from "lucide-react";
import { formatDistanceToNow } from 'date-fns';
import { useMemo } from "react";
import { Separator } from "@/components/ui/separator";
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
function CommentEntry({ comment }: { comment: Comment }) {
    const timeAgo = useMemo(() => {
        return formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true });
    }, [comment.createdAt]);
    return (
        <div className="flex items-start gap-3">
            <Avatar className="h-8 w-8">
                <AvatarImage src={comment.authorAvatar} alt={comment.authorName} />
                <AvatarFallback>{comment.authorName.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
                <div className="flex items-center gap-2 text-sm">
                    <span className="font-semibold">{comment.authorName}</span>
                    <span className="text-muted-foreground">@{comment.authorHandle}</span>
                    <span className="text-muted-foreground">·</span>
                    <span className="text-muted-foreground">{timeAgo}</span>
                </div>
                <p className="text-sm text-foreground">{comment.content}</p>
            </div>
        </div>
    );
}
export function PostDetail({ post }: { post: Post }) {
  const timeAgo = useMemo(() => {
    return formatDistanceToNow(new Date(post.createdAt), { addSuffix: true });
  }, [post.createdAt]);
  const PlatformIcon = post.platform === 'instagram' ? Instagram : ThreadsIcon;
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 max-h-[80vh] md:max-h-[70vh]">
      <div className="bg-muted/50 flex items-center justify-center p-4">
        {post.mediaUrl ? (
          <AspectRatio ratio={post.mediaAspectRatio || 1} className="max-w-full max-h-full">
            <img
              src={post.mediaUrl}
              alt="Post media"
              className="object-contain w-full h-full rounded-lg"
            />
          </AspectRatio>
        ) : (
          <div className="flex items-center justify-center h-full w-full bg-muted rounded-lg">
            <p className="text-muted-foreground">No media</p>
          </div>
        )}
      </div>
      <div className="flex flex-col">
        <div className="p-4 border-b">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src={post.authorAvatar} alt={post.authorName} />
              <AvatarFallback>{post.authorName.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <p className="font-semibold text-sm">{post.authorName}</p>
              <p className="text-xs text-muted-foreground">@{post.authorHandle}</p>
            </div>
            <PlatformIcon className="w-5 h-5 text-muted-foreground" />
          </div>
        </div>
        <ScrollArea className="flex-1">
          <div className="p-4 space-y-4">
            <p className="text-sm whitespace-pre-wrap">{post.content}</p>
            <p className="text-xs text-muted-foreground">{timeAgo}</p>
            <Separator />
            <div className="flex items-center justify-between w-full text-muted-foreground">
              <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" className="w-auto h-auto p-1 group">
                  <Heart className="w-5 h-5 group-hover:text-red-500 group-hover:fill-red-500 transition-colors" />
                  <span className="text-sm ml-2 font-medium">{formatNumber(post.likes)}</span>
                </Button>
                <Button variant="ghost" size="icon" className="w-auto h-auto p-1 group">
                  <MessageCircle className="w-5 h-5 group-hover:text-primary transition-colors" />
                  <span className="text-sm ml-2 font-medium">{formatNumber(post.comments)}</span>
                </Button>
                {post.platform === 'threads' && post.shares != null && (
                  <Button variant="ghost" size="icon" className="w-auto h-auto p-1 group">
                    <Repeat className="w-5 h-5 group-hover:text-green-500 transition-colors" />
                    <span className="text-sm ml-2 font-medium">{formatNumber(post.shares)}</span>
                  </Button>
                )}
              </div>
              <Button variant="ghost" size="icon" className="group">
                <Send className="w-5 h-5 group-hover:text-primary transition-colors" />
              </Button>
            </div>
            <Separator />
            <div className="space-y-4">
                {post.mockComments && post.mockComments.length > 0 ? (
                    post.mockComments.map(comment => <CommentEntry key={comment.id} comment={comment} />)
                ) : (
                    <p className="text-sm text-muted-foreground text-center py-4">No comments yet.</p>
                )}
            </div>
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}