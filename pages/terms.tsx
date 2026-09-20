import Head from 'next/head';
import { Layout } from '@/components/layout/Layout';

const sections = [
  {
    id: 'acceptance',
    title: '1. Acceptance of Terms',
    content: `By accessing or using MovieNest, you agree to be bound by these Terms of Service and our Privacy Policy. If you do not agree to these terms, please do not use our service. We reserve the right to update these terms at any time, and your continued use of MovieNest constitutes acceptance of any changes.`,
  },
  {
    id: 'use-of-service',
    title: '2. Use of Service',
    content: `MovieNest is provided for personal, non-commercial use only. You agree not to use the service to: (a) violate any applicable law or regulation; (b) infringe the rights of any third party; (c) transmit harmful, offensive, or disruptive content; (d) attempt to gain unauthorized access to any part of the service; or (e) use automated tools to scrape or harvest data from MovieNest.`,
  },
  {
    id: 'accounts',
    title: '3. User Accounts',
    content: `When you create an account on MovieNest, you are responsible for maintaining the security of your credentials and for all activities that occur under your account. You must provide accurate and complete information when registering. MovieNest reserves the right to suspend or terminate accounts that violate these terms.`,
  },
  {
    id: 'content',
    title: '4. Content & Intellectual Property',
    content: `Movie and TV show data, images, and metadata displayed on MovieNest are sourced from The Movie Database (TMDB) and remain the property of their respective owners. MovieNest does not claim ownership of third-party content. The MovieNest name, logo, and interface design are the property of MovieNest and may not be reproduced without permission.`,
  },
  {
    id: 'tmdb',
    title: '5. TMDB Attribution',
    content: `This product uses the TMDB API but is not endorsed or certified by TMDB. All movie and TV show information, posters, and related media are provided by The Movie Database (TMDB). MovieNest is an independent application built using the TMDB API.`,
  },
  {
    id: 'disclaimer',
    title: '6. Disclaimer of Warranties',
    content: `MovieNest is provided "as is" without any warranties, express or implied. We do not warrant that the service will be uninterrupted, error-free, or free of viruses or other harmful components. The information provided through our service is for entertainment and informational purposes only.`,
  },
  {
    id: 'limitation',
    title: '7. Limitation of Liability',
    content: `To the fullest extent permitted by law, MovieNest shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of your use of, or inability to use, the service. Our total liability for any claims under these terms shall not exceed the amount you paid (if any) to use MovieNest in the past twelve months.`,
  },
  {
    id: 'termination',
    title: '8. Termination',
    content: `We reserve the right to terminate or suspend your access to MovieNest at our sole discretion, without notice, for conduct that we believe violates these Terms of Service or is harmful to other users, MovieNest, or third parties. You may also delete your account at any time by clearing your browser's local storage.`,
  },
  {
    id: 'governing-law',
    title: '9. Governing Law',
    content: `These Terms of Service shall be governed by and construed in accordance with applicable laws, without regard to conflict of law principles. Any disputes arising from these terms shall be resolved through good-faith negotiation or, if necessary, through binding arbitration.`,
  },
];

export default function TermsPage() {
  return (
    <Layout>
      <Head>
        <title>Terms of Service — MovieNest</title>
        <meta name="description" content="MovieNest Terms of Service — the rules and guidelines for using our platform." />
      </Head>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24 max-w-3xl">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-extrabold tracking-tight mb-3">Terms of Service</h1>
          <p className="text-muted-foreground text-sm">Last updated: September 2026</p>
          <div className="mt-4 rounded-xl border border-primary/20 bg-primary/5 px-5 py-4">
            <p className="text-sm text-muted-foreground leading-relaxed">
              Please read these Terms of Service carefully before using MovieNest. By using our service, you agree
              to be bound by these terms.
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
            Questions about our terms?{' '}
            <a href="mailto:contact@movienest.app" className="text-primary hover:underline">
              contact@movienest.app
            </a>
          </p>
        </div>
      </div>
    </Layout>
  );
}
