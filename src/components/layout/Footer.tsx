import Link from 'next/link';

export function Footer() {
  return (
    <footer className="w-full border-t border-border bg-background py-8 md:py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex flex-col items-center md:items-start gap-2">
          <Link href="/" className="font-bold text-xl tracking-tight text-primary">
            MovieNest
          </Link>
          <p className="text-sm text-muted-foreground text-center md:text-left max-w-sm">
            Your ultimate destination for movies and TV shows. Discover, track, and enjoy your favorite content.
          </p>
        </div>
        
        <div className="flex gap-6 text-sm font-medium text-muted-foreground">
          <Link href="/about" className="hover:text-foreground transition-colors">About</Link>
          <Link href="/privacy" className="hover:text-foreground transition-colors">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-foreground transition-colors">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
}
