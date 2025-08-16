import { createRootRoute, Link, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Layout } from '@/components/layout/Layout';

export const Route = createRootRoute({
  component: () => (
    <>
      <Layout />
      <ReactQueryDevtools />
      <TanStackRouterDevtools />
    </>
  ),
});
