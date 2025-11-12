import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Target, ServerCog, Cloud, Route } from 'lucide-react';
import { motion } from 'framer-motion';
import { UserNav } from '@/components/UserNav';
const infoCards = [
  {
    icon: Target,
    title: "The Goal: A Live Content Feed",
    description: "The primary request was to integrate live data from Instagram and Threads. This would involve users logging in with their social accounts to see a real-time feed of viral content, providing a dynamic and ever-changing experience."
  },
  {
    icon: ServerCog,
    title: "Technical Requirements for Live APIs",
    description: "Live social media integration requires a complex, secure backend process. This includes a full server-side OAuth 2.0 flow to authenticate users, securely exchange codes for access tokens, and a database to store sensitive API keys and user refresh tokens safely."
  },
  {
    icon: Cloud,
    title: "Current Architecture & Constraints",
    description: "This application is built on a high-performance, serverless edge architecture (Cloudflare Workers). While excellent for speed and scalability, this environment is designed for stateless computation and is not suited for securely storing the long-lived secrets and managing the stateful, server-side authentication flows required by platforms like Instagram."
  },
  {
    icon: Route,
    title: "The Path Forward for a Future Project",
    description: "To achieve live integration, a different architecture would be necessary. A future project would require a dedicated backend server (e.g., Node.js, Python) running in a secure environment that can handle the OAuth 2.0 lifecycle and manage a database for storing user tokens and API secrets, separate from the edge frontend."
  }
];
export function ApiStatusPage() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-background text-foreground">
      <UserNav />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-8 md:py-10 lg:py-12">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Button variant="ghost" onClick={() => navigate('/settings')} className="mb-6">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Settings
            </Button>
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tighter">Live API Integration: A Technical Deep Dive</h1>
              <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
                Understanding the path from a UI prototype to a fully integrated live application.
              </p>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8"
          >
            {infoCards.map((card, index) => (
              <Card key={index} className="shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader className="flex flex-row items-center gap-4">
                  <div className="p-3 bg-primary/10 text-primary rounded-full">
                    <card.icon className="h-6 w-6" />
                  </div>
                  <CardTitle>{card.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{card.description}</p>
                </CardContent>
              </Card>
            ))}
          </motion.div>
        </div>
      </main>
    </div>
  );
}