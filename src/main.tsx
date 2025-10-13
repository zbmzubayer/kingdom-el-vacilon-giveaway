import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { TanstackQueryProvider } from "@/providers/TanstackQueryProvider.tsx";
import { RouterProvider } from "react-router";
import { router } from "@/routes/routes";
import { Toaster } from "@/components/ui/sonner";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <TanstackQueryProvider>
      {/* <AuthProvider> */}
      <RouterProvider router={router} />
      {/* </AuthProvider> */}
      <Toaster richColors />
    </TanstackQueryProvider>
  </StrictMode>
);
