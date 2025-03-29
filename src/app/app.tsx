import NekoManager from "@/features/neko-manager/_NekoManager";
import ErrorBoundary from "@/lib/sw-toolkit/components/ErrorBoundary";
import { minute, second } from "@/lib/sw-toolkit/utils/time";
import Dashboard from "@/pages/dashboard";
import "@/styles/app.css";
import { keepPreviousData, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

const client = new QueryClient({
  defaultOptions: {
    queries: {
      retry: true, // inifinite retry
      placeholderData: keepPreviousData,
      retryDelay: (attemptIndex) => Math.min(2 ** attemptIndex * second, 30 * minute),
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <>
    <QueryClientProvider client={client}>
      <ErrorBoundary>
        <NekoManager />
      </ErrorBoundary>
      <StrictMode>
        <Dashboard />
      </StrictMode>
    </QueryClientProvider>
  </>,
);
