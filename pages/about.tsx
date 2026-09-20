import Head from 'next/head';
import { Layout } from '@/components/layout/Layout';
import { Film, Heart, Star, Users } from 'lucide-react';

const stats = [
  { label: 'Movies & Shows', value: '500K+', icon: Film },
  { label: 'Happy Users', value: '50K+', icon: Users },
  { label: 'Top Ratings', value: '9.9', icon: Star },
  { label: 'Favorites Saved', value: '1M+', icon: Heart },
];

export default function AboutPage() {
  return (
    <Layout>
      <Head>
        <title>About — MovieNest</title>
        <meta name="description" content="Learn more about MovieNest, your ultimate destination for discovering movies and TV shows." />
      </Head>

      {/* Hero */}
      <div className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 text-center overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-primary/10 via-background to-background" />
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
          About <span className="text-primary">MovieNest</span>
        </h1>
        <p className="text-muted-foreground max-w-xl mx-auto text-lg leading-relaxed">
          Your ultimate destination for discovering, tracking, and enjoying movies and TV shows from around the world.
        </p>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-24 space-y-20">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map(({ label, value, icon: Icon }) => (
            <div
              key={label}
              className="flex flex-col items-center gap-3 rounded-2xl border border-border bg-card p-6 text-center shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="rounded-full bg-primary/10 p-3">
                <Icon className="h-6 w-6 text-primary" />
              </div>
              <p className="text-3xl font-extrabold">{value}</p>
              <p className="text-sm text-muted-foreground">{label}</p>
            </div>
          ))}
        </div>

        {/* Mission */}
        <div className="max-w-3xl mx-auto space-y-6">
          <h2 className="text-2xl font-bold tracking-tight">Our Mission</h2>
          <p className="text-muted-foreground leading-relaxed">
            MovieNest was built with one goal in mind — to give every movie and TV enthusiast a beautifully simple way
            to discover new content, keep track of what they want to watch, and celebrate what they love. We pull
            data from TMDB so you always have access to up-to-date information on the latest releases, top-rated
            classics, and hidden gems.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Whether you're a casual viewer or a hardcore cinephile, MovieNest adapts to your taste. Build your
            watchlist, mark your favorites, and explore thousands of titles across every genre — all in one place.
          </p>
        </div>

        {/* Features */}
        <div className="max-w-3xl mx-auto space-y-6">
          <h2 className="text-2xl font-bold tracking-tight">What We Offer</h2>
          <ul className="grid sm:grid-cols-2 gap-4">
            {[
              'Browse trending, popular, and top-rated titles',
              'Save favorites and build your personal watchlist',
              'Watch trailers directly in the app',
              'Explore cast & crew profiles',
              'Search across movies and TV shows',
              'Light & dark mode support',
            ].map((feature) => (
              <li key={feature} className="flex items-start gap-3 rounded-xl border border-border bg-card p-4">
                <span className="mt-0.5 flex-shrink-0 h-2 w-2 rounded-full bg-primary" />
                <span className="text-sm text-muted-foreground">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Layout>
  );
}
