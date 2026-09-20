import Head from 'next/head';
import { Layout } from '@/components/layout/Layout';

const sections = [
  {
    id: 'information-we-collect',
    title: '1. Information We Collect',
    content: `We collect information you provide directly to us when you create an account, such as your name and email address. We also collect information automatically when you use MovieNest, including browsing activity, pages viewed, and interactions with content. Your favorites and watchlist are stored locally on your device using browser storage and are never transmitted to our servers.`,
  },
  {
    id: 'how-we-use-information',
    title: '2. How We Use Your Information',
    content: `We use the information we collect to operate and improve MovieNest, personalize your experience, respond to your comments and questions, and send you technical notices. Movie and TV show data is sourced from The Movie Database (TMDB) API. We do not sell your personal information to third parties.`,
  },
  {
    id: 'data-storage',
    title: '3. Data Storage & Security',
    content: `Your account credentials are stored securely in your browser's local storage. Favorites and watchlist data are stored locally on your device. We implement industry-standard security measures to protect your information, but no method of transmission over the internet is 100% secure.`,
  },
  {
    id: 'cookies',
    title: '4. Cookies & Tracking',
    content: `MovieNest uses essential cookies to maintain your session and preferences (such as theme selection). We do not use third-party advertising cookies or tracking pixels. You can control cookie settings through your browser preferences.`,
  },
  {
    id: 'third-party',
    title: '5. Third-Party Services',
    content: `MovieNest integrates with The Movie Database (TMDB) to provide movie and TV show information. When you use MovieNest, your interactions with TMDB's API are subject to TMDB's own privacy policy. We are not responsible for the privacy practices of third-party services.`,
  },
  {
    id: 'your-rights',
    title: '6. Your Rights',
    content: `You have the right to access, update, or delete your personal information at any time. You can clear your local data (favorites, watchlist, and account information) directly from your browser's settings. If you have questions about your data, please contact us.`,
  },
  {
    id: 'changes',
    title: '7. Changes to This Policy',
    content: `We may update this Privacy Policy from time to time. We will notify you of any significant changes by updating the date at the top of this page. Your continued use of MovieNest after any changes constitutes your acceptance of the new policy.`,
  },
];

export default function PrivacyPage() {
  return (
    <Layout>
      <Head>
        <title>Privacy Policy — MovieNest</title>
        <meta name="description" content="MovieNest Privacy Policy — learn how we collect, use, and protect your information." />
      </Head>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24 max-w-3xl">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-extrabold tracking-tight mb-3">Privacy Policy</h1>
          <p className="text-muted-foreground text-sm">Last updated: September 2026</p>
          <div className="mt-4 rounded-xl border border-primary/20 bg-primary/5 px-5 py-4">
            <p className="text-sm text-muted-foreground leading-relaxed">
              Your privacy matters to us. This policy explains what information MovieNest collects, how we use it,
              and the choices you have regarding your data. Please read it carefully.
            </p>
          </div>
        </div>

        {/* Table of Contents */}
        <nav className="mb-12 rounded-xl border border-border bg-card p-6">
          <p className="text-sm font-semibold mb-3 text-foreground">Table of Contents</p>
          <ol className="space-y-2">
            {sections.map((s) => (
              <li key={s.id}>
                <a href={`#${s.id}`} className="text-sm text-primary hover:underline transition-colors">
                  {s.title}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        {/* Sections */}
        <div className="space-y-10">
          {sections.map((s) => (
            <section key={s.id} id={s.id} className="scroll-mt-24">
              <h2 className="text-xl font-bold tracking-tight mb-3">{s.title}</h2>
              <p className="text-muted-foreground leading-relaxed text-sm">{s.content}</p>
            </section>
          ))}
        </div>

        {/* Contact */}
        <div className="mt-16 rounded-xl border border-border bg-card p-6 text-center">
          <p className="text-sm text-muted-foreground">
            Questions about our privacy practices?{' '}
            <a href="mailto:contact@movienest.app" className="text-primary hover:underline">
              contact@movienest.app
            </a>
          </p>
        </div>
      </div>
    </Layout>
  );
}
