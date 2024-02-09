import { headers } from 'next/headers';
import Dashboard from '@/app/ui/dashboard';
import MyClient from '@/app/ui/client';
export default async function Home({ searchParams }) {
  const headerList = headers();
  console.log('searchParams: ', searchParams);
  console.log('authorization: ', headerList.get('authorization'));
  return (
    <main className="flex min-h-screen items-center justify-center bg-hubbl-brand-off-white">
      <div className="flex flex-col items-center bg-white w-[calc(100vw-1rem)] h-[calc(100vh-1rem)] rounded-lg border border-hubbl-brand-greige">
        <MyClient />
        <Dashboard />
      </div>
    </main>
  );
}
