import NekoManager from "@/features/neko-manager/_neko-manager";
import Dashboard from "@/pages/dashboard";
import "@/styles/_index.css";
import { minute, second } from "@/utils/time";
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
      <NekoManager />
      <StrictMode>
        <Dashboard />
      </StrictMode>
    </QueryClientProvider>
  </>,
);
