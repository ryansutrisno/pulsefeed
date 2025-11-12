import { Inbox } from 'lucide-react';
import { motion } from 'framer-motion';
interface EmptyStateProps {
  title: string;
  message: string;
}
export function EmptyState({ title, message }: EmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center text-center py-16 px-4 col-span-full"
    >
      <div className="p-4 bg-muted rounded-full mb-4">
        <Inbox className="w-12 h-12 text-muted-foreground" />
      </div>
      <h3 className="text-xl font-semibold text-foreground">{title}</h3>
      <p className="mt-2 text-muted-foreground">{message}</p>
    </motion.div>
  );
}