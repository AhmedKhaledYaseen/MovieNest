import { ReactNode } from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

interface LayoutProps {
  children: ReactNode;
  hideHeaderAndFooter?: boolean;
}

export function Layout({ children, hideHeaderAndFooter = false }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground font-sans">
      {!hideHeaderAndFooter && <Navbar />}
      <main className={`flex-1 w-full ${!hideHeaderAndFooter ? 'pt-16' : ''}`}>
        {children}
      </main>
      {!hideHeaderAndFooter && <Footer />}
    </div>
  );
}
