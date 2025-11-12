import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/stores/authStore';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Instagram, Waves, Info } from 'lucide-react';
import { motion } from 'framer-motion';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
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
export function LoginPage() {
  const navigate = useNavigate();
  const isAuthenticated = useAuthStore(s => s.isAuthenticated);
  const login = useAuthStore(s => s.login);
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);
  const handleLogin = (platform: 'instagram' | 'threads') => {
    login(platform);
    navigate('/');
  };
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background p-4 relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-hero opacity-50 dark:opacity-100" />
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <Card className="w-full max-w-sm shadow-2xl">
          <CardHeader className="text-center">
            <div className="inline-flex items-center justify-center bg-primary text-primary-foreground p-3 rounded-full mb-4 shadow-lg mx-auto w-fit">
              <Waves className="h-8 w-8" />
            </div>
            <CardTitle className="text-3xl font-bold tracking-tighter">Welcome to PulseFeed</CardTitle>
            <CardDescription>Sign in to view the latest viral content.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert>
              <Info className="h-4 w-4" />
              <AlertTitle>Demonstration Mode</AlertTitle>
              <AlertDescription>
                This is a UI/UX prototype using mock data. Live API integration is not available due to platform constraints.
              </AlertDescription>
            </Alert>
            <Button
              className="w-full transition-all hover:scale-105 active:scale-95"
              onClick={() => handleLogin('instagram')}
            >
              <Instagram className="mr-2 h-4 w-4" /> Continue with Instagram
            </Button>
            <Button
              variant="secondary"
              className="w-full transition-all hover:scale-105 active:scale-95"
              onClick={() => handleLogin('threads')}
            >
              <ThreadsIcon className="mr-2 h-4 w-4 fill-current" /> Continue with Threads
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}