import { RouterProvider } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { router } from "./routes";
import { ToastProvider } from "./components/admin/Toast";
import { ScrollProgress } from "./components/ui/ScrollProgress";
import { CursorGlow } from "./components/ui/CursorGlow";
import { BackToTop } from "./components/ui/BackToTop";

function App() {
  return (
    <HelmetProvider>
      <ToastProvider>
        <ScrollProgress />
        <CursorGlow />
        <BackToTop />
        <RouterProvider router={router} />
      </ToastProvider>
    </HelmetProvider>
  );
}

export default App;
