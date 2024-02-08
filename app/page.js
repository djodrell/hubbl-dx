import Image from 'next/image';

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-between bg-hubbl-brand-off-white">
      <div className="bg-white w-[calc(100vw-1rem)] h-[calc(100vh-1rem)] m-auto rounded-lg border border-hubbl-brand-greige">
        <p className="text-center">Multi Org Dashboard PoC</p>
      </div>
    </main>
  );
}
