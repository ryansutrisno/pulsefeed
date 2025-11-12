import { useAuthStore } from '@/stores/authStore';
import { useNavigate } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { LogOut, ArrowLeft, Heart, MessageCircle, Users } from 'lucide-react';
import { motion } from 'framer-motion';
import { UserNav } from '@/components/UserNav';
function StatCard({ icon: Icon, label, value }: { icon: React.ElementType, label: string, value: string }) {
  return (
    <div className="flex flex-col items-center justify-center p-4 bg-muted/50 rounded-lg text-center">
      <Icon className="w-8 h-8 text-muted-foreground mb-2" />
      <p className="text-2xl font-bold">{value}</p>
      <p className="text-sm text-muted-foreground">{label}</p>
    </div>
  );
}
export function ProfilePage() {
  const user = useAuthStore(s => s.user);
  const logout = useAuthStore(s => s.logout);
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  if (!user) {
    // This should not happen due to ProtectedRoute, but it's a good safeguard.
    navigate('/login');
    return null;
  }
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
            <Button variant="ghost" onClick={() => navigate('/')} className="mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Feed
            </Button>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card className="w-full max-w-2xl mx-auto overflow-hidden shadow-xl">
              <div className="h-32 bg-gradient-to-r from-blue-500 to-purple-600" />
              <CardHeader className="text-center -mt-16">
                <Avatar className="w-24 h-24 mx-auto mb-2 border-4 border-background shadow-lg">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <CardTitle className="text-3xl font-bold">{user.name}</CardTitle>
                <CardDescription>{user.email}</CardDescription>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                <div className="grid grid-cols-3 gap-4">
                  <StatCard icon={Heart} label="Likes Given" value="1.2k" />
                  <StatCard icon={MessageCircle} label="Comments" value="89" />
                  <StatCard icon={Users} label="Following" value="247" />
                </div>
                <Button onClick={handleLogout} className="w-full" variant="destructive">
                  <LogOut className="mr-2 h-4 w-4" />
                  Log Out
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>
    </div>
  );
}