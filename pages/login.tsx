import Head from 'next/head';
import { Layout } from '@/components/layout/Layout';
import { LoginForm } from '@/components/auth/LoginForm';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function LoginPage() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setIsReady(true);
  }, []);

  useEffect(() => {
    if (isReady && isAuthenticated && router.isReady) {
      router.push('/');
    }
  }, [isReady, isAuthenticated, router]);

  if (!isReady || isAuthenticated) return null;

  return (
    <Layout hideHeaderAndFooter>
      <Head>
        <title>Login — MovieNest</title>
      </Head>
      <div className="container mx-auto px-4 py-24 min-h-[80vh] flex items-center justify-center">
        <LoginForm />
      </div>
    </Layout>
  );
}
