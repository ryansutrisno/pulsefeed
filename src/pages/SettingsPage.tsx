import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ArrowLeft, Bell, Palette, Shield } from 'lucide-react';
import { motion } from 'framer-motion';
import { UserNav } from '@/components/UserNav';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
export function SettingsPage() {
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
            <Card className="w-full max-w-2xl mx-auto shadow-lg">
              <CardHeader>
                <CardTitle className="text-3xl font-bold">Settings</CardTitle>
                <CardDescription>Manage your application preferences.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold flex items-center"><Palette className="mr-2 h-5 w-5" /> Appearance</h3>
                  <div className="pl-7">
                    <Label>Theme</Label>
                    <RadioGroup defaultValue="system" className="mt-2">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="light" id="light" />
                        <Label htmlFor="light">Light</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="dark" id="dark" />
                        <Label htmlFor="dark">Dark</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="system" id="system" />
                        <Label htmlFor="system">System</Label>
                      </div>
                    </RadioGroup>
                    <p className="text-sm text-muted-foreground mt-2">Note: This is a mock setting. Use the ☀️/🌙 toggle to change themes.</p>
                  </div>
                </div>
                <Separator />
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold flex items-center"><Bell className="mr-2 h-5 w-5" /> Notifications</h3>
                  <div className="pl-7 space-y-4">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="new-posts" className="flex flex-col space-y-1">
                        <span>New Post Alerts</span>
                        <span className="font-normal leading-snug text-muted-foreground">
                          Get notified when new viral content is available.
                        </span>
                      </Label>
                      <Switch id="new-posts" disabled />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="trending-digest" className="flex flex-col space-y-1">
                        <span>Trending Digest</span>
                        <span className="font-normal leading-snug text-muted-foreground">
                          Receive a weekly summary of the top posts.
                        </span>
                      </Label>
                      <Switch id="trending-digest" disabled defaultChecked />
                    </div>
                  </div>
                </div>
                <Separator />
                 <div className="space-y-4">
                  <h3 className="text-lg font-semibold flex items-center"><Shield className="mr-2 h-5 w-5" /> Account</h3>
                   <div className="pl-7">
                     <Button variant="outline" disabled>Change Password</Button>
                   </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>
    </div>
  );
}