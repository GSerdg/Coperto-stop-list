'use client';

import { DefaultOptions, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState, type ReactNode } from 'react';
import { NuqsAdapter } from 'nuqs/adapters/next/app';

export function Providers({ children }: { children: ReactNode }) {
  const queryConfig: DefaultOptions = {
    queries: {
      staleTime: 60 * 1000,
      refetchOnWindowFocus: false,
      retry: false,
    },
  };

  const [queryClient] = useState(() => new QueryClient({ defaultOptions: queryConfig }));

  return (
    <NuqsAdapter>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
    </NuqsAdapter>
  );
}
