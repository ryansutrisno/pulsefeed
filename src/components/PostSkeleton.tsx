import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
export function PostSkeleton() {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="flex flex-row items-center gap-3 p-4">
        <Skeleton className="h-10 w-10 rounded-full" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-3 w-24" />
        </div>
        <Skeleton className="h-5 w-5" />
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <div className="space-y-2 mb-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
        </div>
        <Skeleton className="h-48 w-full rounded-lg" />
      </CardContent>
      <CardFooter className="flex flex-col items-start p-4 pt-0">
        <Skeleton className="h-3 w-20 mb-3" />
        <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-4">
                <Skeleton className="h-6 w-12" />
                <Skeleton className="h-6 w-12" />
            </div>
            <Skeleton className="h-8 w-8" />
        </div>
      </CardFooter>
    </Card>
  );
}