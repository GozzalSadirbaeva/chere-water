import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { TranslationProvider } from "./contexts/TranslationContext.jsx";
import "./index.css";
import { router } from "./Router.jsx";
import "./utils/i18n/i18n.jsx";
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});
createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <QueryClientProvider client={queryClient}>
    <TranslationProvider>
      <RouterProvider router={createBrowserRouter(router)} />
    </TranslationProvider>
  </QueryClientProvider>
  // </StrictMode>,
);
