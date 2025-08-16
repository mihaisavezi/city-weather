import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { createRootRoute } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';

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
