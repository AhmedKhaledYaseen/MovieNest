import Head from 'next/head';
import { useRouter } from 'next/router';
import { Layout } from '@/components/layout/Layout';
import { AuthGuard } from '@/components/auth/AuthGuard';
import { useAuth } from '@/hooks/useAuth';
import { useFavorites } from '@/hooks/useFavorites';
import { useWatchlist } from '@/hooks/useWatchlist';
import { Button } from '@/components/ui/button';
import { User as UserIcon, Heart, Bookmark, LogOut, Calendar } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function ProfilePage() {
  const { user, logout } = useAuth();
  const { favorites } = useFavorites();
  const { watchlist } = useWatchlist();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  if (!mounted || !user) return null;

  const joinedDate = new Date(user.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <AuthGuard>
      <Layout>
        <Head>
          <title>My Profile — MovieNest</title>
        </Head>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 min-h-screen">
          <div className="max-w-3xl mx-auto space-y-8">
            <h1 className="text-3xl font-bold tracking-tight">My Profile</h1>
            
            <div className="bg-card border border-border rounded-xl p-6 md:p-8 shadow-sm">
              <div className="flex flex-col md:flex-row gap-6 items-center md:items-start text-center md:text-left">
                <div className="h-24 w-24 bg-primary/10 rounded-full flex items-center justify-center text-primary shrink-0">
                  <UserIcon className="h-12 w-12" />
                </div>
                
                <div className="flex-1 space-y-2">
                  <h2 className="text-2xl font-bold">{user.name}</h2>
                  <p className="text-muted-foreground">{user.email}</p>
                  <div className="flex items-center justify-center md:justify-start gap-2 text-sm text-muted-foreground mt-2">
                    <Calendar className="h-4 w-4" />
                    <span>Joined {joinedDate}</span>
                  </div>
                </div>
                
                <Button variant="destructive" onClick={handleLogout} className="w-full md:w-auto md:self-start">
                  <LogOut className="h-4 w-4 mr-2" />
                  Log out
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div 
                className="bg-card border border-border rounded-xl p-6 shadow-sm hover:border-primary/50 transition-colors cursor-pointer"
                onClick={() => router.push('/favorites')}
              >
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 bg-red-500/10 text-red-500 rounded-full flex items-center justify-center shrink-0">
                    <Heart className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Favorites</h3>
                    <p className="text-muted-foreground">{favorites.length} items saved</p>
                  </div>
                </div>
              </div>
              
              <div 
                className="bg-card border border-border rounded-xl p-6 shadow-sm hover:border-primary/50 transition-colors cursor-pointer"
                onClick={() => router.push('/watchlist')}
              >
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 bg-primary/10 text-primary rounded-full flex items-center justify-center shrink-0">
                    <Bookmark className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Watchlist</h3>
                    <p className="text-muted-foreground">{watchlist.length} items to watch</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </AuthGuard>
  );
}
