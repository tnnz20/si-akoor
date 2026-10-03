import { Outlet } from 'react-router';

import { Footer } from '@/components/layout/footer';
import { Navbar } from '@/components/layout/navbar';
import { Toaster } from '@/components/ui/sonner';

export default function HomeLayout() {
  return (
    <div className="bg-brand-mesh flex min-h-dvh flex-col justify-between font-sans text-neutral-800 antialiased selection:bg-amber-300 selection:text-neutral-900">
      <Navbar />
      <div className="flex-1">
        <Outlet />
      </div>
      <Footer />
      <Toaster position="bottom-right" richColors />
    </div>
  );
}
