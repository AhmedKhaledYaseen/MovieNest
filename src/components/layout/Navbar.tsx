import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Search, Bell, Menu, LogOut, User as UserIcon, X } from 'lucide-react';
import { useUIStore } from '@/store/uiStore';
import { MobileMenu } from './MobileMenu';
import { useAuth } from '@/hooks/useAuth';
import { useState, useEffect } from 'react';
import { ThemeToggle } from '../common/ThemeToggle';
import { useNotificationStore } from '@/store/notificationStore';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function Navbar() {
  const { toggleMobileMenu } = useUIStore();
  const { user, isAuthenticated, logout } = useAuth();
  
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const userId = user?.id || 'guest';
  const notifications = useNotificationStore(state => state.notificationsByUser[userId]);
  const safeNotifications = notifications || [];
  const unreadCount = safeNotifications.filter(n => !n.read).length;
  const markAsRead = useNotificationStore(state => state.markAsRead);
  const deleteNotification = useNotificationStore(state => state.deleteNotification);

  return (
    <>
      <header className="fixed top-0 w-full z-40 bg-background/80 backdrop-blur-md border-b border-border/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-6 md:gap-10">
            <Link href="/" className="font-bold text-xl tracking-tight text-primary">
              MovieNest
            </Link>
            <nav className="hidden md:flex gap-6 text-sm font-medium">
              <Link href="/" className="text-foreground/80 hover:text-foreground transition-colors">Home</Link>
              <Link href="/movies" className="text-foreground/80 hover:text-foreground transition-colors">Movies</Link>
              <Link href="/tv" className="text-foreground/80 hover:text-foreground transition-colors">TV Shows</Link>
            </nav>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <Button variant="ghost" size="icon" className="text-foreground/80 hover:text-foreground rounded-full" asChild>
              <Link href="/search">
                <Search className="w-5 h-5" />
              </Link>
            </Button>
            
            {mounted && isAuthenticated ? (
              <>
                <DropdownMenu modal={false} onOpenChange={(open) => { if (open && unreadCount > 0) markAsRead(userId) }}>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="text-foreground/80 hover:text-foreground rounded-full hidden sm:flex relative">
                      <Bell className="w-5 h-5" />
                      {unreadCount > 0 && (
                        <span className="absolute top-1 right-1 flex h-2.5 w-2.5">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
                        </span>
                      )}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-80 max-h-[400px] overflow-y-auto">
                    <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {safeNotifications.length === 0 ? (
                      <div className="p-4 text-center text-sm text-muted-foreground">
                        No new notifications
                      </div>
                    ) : (
                      safeNotifications.map(notif => (
                        <div key={notif.id} className={`p-3 text-sm border-b last:border-0 relative group ${!notif.read ? 'bg-primary/5' : ''}`}>
                          <div className="pr-6">
                            <p className="font-medium text-foreground">{notif.message}</p>
                            <p className="text-xs text-muted-foreground mt-1">
                              {new Date(notif.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </p>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6 absolute right-2 top-3 opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              deleteNotification(userId, notif.id);
                            }}
                          >
                            <X className="h-3 w-3 text-muted-foreground hover:text-destructive" />
                            <span className="sr-only">Delete notification</span>
                          </Button>
                        </div>
                      ))
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
                
                <DropdownMenu modal={false}>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="hidden sm:flex relative h-8 w-8 rounded-full bg-primary/10 text-primary">
                      {user?.name?.charAt(0).toUpperCase() || <UserIcon className="w-4 h-4" />}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{user?.name}</p>
                        <p className="text-xs leading-none text-muted-foreground">{user?.email}</p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/favorites">Favorites</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/watchlist">Watchlist</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={logout} className="text-destructive focus:text-destructive cursor-pointer">
                      <LogOut className="w-4 h-4 mr-2" />
                      Log out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : mounted && !isAuthenticated ? (
              <Button variant="outline" size="sm" className="hidden sm:flex rounded-full px-4 font-semibold" asChild>
                <Link href="/login">Sign In</Link>
              </Button>
            ) : null}
            
            {mounted && <ThemeToggle />}
            
            <Button variant="ghost" size="icon" className="sm:hidden text-foreground/80 rounded-full" onClick={toggleMobileMenu}>
              <Menu className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </header>
      <MobileMenu />
    </>
  );
}
