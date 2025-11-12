import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
interface PostLoaderProps {
  className?: string;
}
export function PostLoader({ className }: PostLoaderProps) {
  return (
    <div className={cn("flex justify-center items-center py-8 col-span-full", className)}>
      <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
    </div>
  );
}