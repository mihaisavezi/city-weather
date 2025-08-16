import { Outlet } from '@tanstack/react-router';

import { Header } from './Header';

export function Layout() {
  return (
    <div className="min-h-full">
      <Header />
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
}
