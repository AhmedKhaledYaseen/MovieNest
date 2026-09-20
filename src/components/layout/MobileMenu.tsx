import Link from 'next/link';
import { useRouter } from 'next/router';
import { Sheet, SheetContent, SheetTitle } from '@/components/ui/sheet';
import { useUIStore } from '@/store/uiStore';
import { useAuth } from '@/hooks/useAuth';
import { LogOut } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';

export function MobileMenu() {
  const { isMobileMenuOpen, setMobileMenuOpen } = useUIStore();
  const { user, isAuthenticated, logout } = useAuth();
  const router = useRouter();

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // Close menu on route change
  useEffect(() => {
    const handleRouteChange = () => {
      setMobileMenuOpen(false);
    };

    router.events.on('routeChangeStart', handleRouteChange);
    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
    };
  }, [router.events, setMobileMenuOpen]);

  const handleLogout = () => {
    logout();
    setMobileMenuOpen(false);
  };

  return (
    <Sheet open={isMobileMenuOpen} onOpenChange={setMobileMenuOpen}>
      <SheetContent side="right" className="w-[300px] sm:w-[400px] pt-16 border-l-border/50 bg-background/95 backdrop-blur-md">
        <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
        <nav className="flex flex-col gap-6">
          <div className="flex flex-col gap-4 border-b border-border/50 pb-6">
            <Link href="/" className="text-lg font-medium hover:text-primary transition-colors">
              Home
            </Link>
            <Link href="/movies" className="text-lg font-medium hover:text-primary transition-colors">
              Movies
            </Link>
            <Link href="/tv" className="text-lg font-medium hover:text-primary transition-colors">
              TV Shows
            </Link>
          </div>
          
          {mounted && isAuthenticated ? (
            <div className="flex flex-col gap-4">
              <div className="pb-2">
                <p className="text-sm font-medium leading-none">{user?.name}</p>
                <p className="text-xs leading-none text-muted-foreground mt-1">{user?.email}</p>
              </div>
              <Link href="/favorites" className="text-lg font-medium hover:text-primary transition-colors">
                Favorites
              </Link>
              <Link href="/watchlist" className="text-lg font-medium hover:text-primary transition-colors">
                Watchlist
              </Link>
              <Button variant="ghost" className="justify-start px-0 text-destructive hover:text-destructive hover:bg-transparent" onClick={handleLogout}>
                <LogOut className="w-5 h-5 mr-2" />
                Log out
              </Button>
            </div>
          ) : mounted && !isAuthenticated ? (
            <div className="flex flex-col gap-4">
              <Link href="/login" className="text-lg font-medium hover:text-primary transition-colors">
                Sign In
              </Link>
              <Link href="/register" className="text-lg font-medium hover:text-primary transition-colors">
                Create Account
              </Link>
            </div>
          ) : null}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
