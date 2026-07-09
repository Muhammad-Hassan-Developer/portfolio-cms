import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import { PortfolioLayout } from "@/components/layout/PortfolioLayout";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { ProtectedRoute } from "@/components/layout/ProtectedRoute";
import { PageTransition } from "@/components/ui/PageTransition";

const HomePage = lazy(() => import("@/pages/portfolio/HomePage").then((m) => ({ default: m.HomePage })));
const AboutPage = lazy(() => import("@/pages/portfolio/AboutPage").then((m) => ({ default: m.AboutPage })));
const ProjectsPage = lazy(() => import("@/pages/portfolio/ProjectsPage").then((m) => ({ default: m.ProjectsPage })));
const CertificatesPage = lazy(() => import("@/pages/portfolio/CertificatesPage").then((m) => ({ default: m.CertificatesPage })));
const ContactPage = lazy(() => import("@/pages/portfolio/ContactPage").then((m) => ({ default: m.ContactPage })));
const AdminLoginPage = lazy(() => import("@/pages/admin/AdminLoginPage").then((m) => ({ default: m.AdminLoginPage })));
const AdminDashboardPage = lazy(() => import("@/pages/admin/AdminDashboardPage").then((m) => ({ default: m.AdminDashboardPage })));
const AdminHeroPage = lazy(() => import("@/pages/admin/AdminHeroPage").then((m) => ({ default: m.AdminHeroPage })));
const AdminAboutPage = lazy(() => import("@/pages/admin/AdminAboutPage").then((m) => ({ default: m.AdminAboutPage })));
const AdminSkillsPage = lazy(() => import("@/pages/admin/AdminSkillsPage").then((m) => ({ default: m.AdminSkillsPage })));
const AdminProjectsPage = lazy(() => import("@/pages/admin/AdminProjectsPage").then((m) => ({ default: m.AdminProjectsPage })));
const AdminCategoriesPage = lazy(() => import("@/pages/admin/AdminCategoriesPage").then((m) => ({ default: m.AdminCategoriesPage })));
const AdminCertificatesPage = lazy(() => import("@/pages/admin/AdminCertificatesPage").then((m) => ({ default: m.AdminCertificatesPage })));
const AdminThemePage = lazy(() => import("@/pages/admin/AdminThemePage").then((m) => ({ default: m.AdminThemePage })));
const AdminFooterPage = lazy(() => import("@/pages/admin/AdminFooterPage").then((m) => ({ default: m.AdminFooterPage })));
const AdminMediaPage = lazy(() => import("@/pages/admin/AdminMediaPage").then((m) => ({ default: m.AdminMediaPage })));
const AdminProfilePage = lazy(() => import("@/pages/admin/AdminProfilePage").then((m) => ({ default: m.AdminProfilePage })));
const AdminSettingsPage = lazy(() => import("@/pages/admin/AdminSettingsPage").then((m) => ({ default: m.AdminSettingsPage })));
const NotFoundPage = lazy(() => import("@/pages/errors/NotFoundPage").then((m) => ({ default: m.NotFoundPage })));

function PageLoader() {
  return (
    <div className="flex h-64 items-center justify-center">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-accent-blue border-t-transparent" />
    </div>
  );
}

function SuspenseWrapper({ children }: { children: React.ReactNode }) {
  return <Suspense fallback={<PageLoader />}>{children}</Suspense>;
}

function TransitionsWrapper({ children }: { children: React.ReactNode }) {
  return <PageTransition>{children}</PageTransition>;
}

export const router = createBrowserRouter([
  {
    path: "/",
    element: <PortfolioLayout />,
    children: [
      { index: true, element: <SuspenseWrapper><TransitionsWrapper><HomePage /></TransitionsWrapper></SuspenseWrapper> },
      { path: "about", element: <SuspenseWrapper><TransitionsWrapper><AboutPage /></TransitionsWrapper></SuspenseWrapper> },
      { path: "projects", element: <SuspenseWrapper><TransitionsWrapper><ProjectsPage /></TransitionsWrapper></SuspenseWrapper> },
      { path: "certificates", element: <SuspenseWrapper><TransitionsWrapper><CertificatesPage /></TransitionsWrapper></SuspenseWrapper> },
      { path: "contact", element: <SuspenseWrapper><TransitionsWrapper><ContactPage /></TransitionsWrapper></SuspenseWrapper> },
    ],
  },
  {
    path: "/admin/login",
    element: <SuspenseWrapper><AdminLoginPage /></SuspenseWrapper>,
  },
  {
    path: "/admin",
    element: (
      <ProtectedRoute>
        <SuspenseWrapper>
          <AdminLayout>
            <AdminDashboardPage />
          </AdminLayout>
        </SuspenseWrapper>
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/dashboard",
    element: (
      <ProtectedRoute>
        <SuspenseWrapper>
          <AdminLayout>
            <AdminDashboardPage />
          </AdminLayout>
        </SuspenseWrapper>
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/hero",
    element: (
      <ProtectedRoute>
        <SuspenseWrapper>
          <AdminLayout>
            <AdminHeroPage />
          </AdminLayout>
        </SuspenseWrapper>
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/about",
    element: (
      <ProtectedRoute>
        <SuspenseWrapper>
          <AdminLayout>
            <AdminAboutPage />
          </AdminLayout>
        </SuspenseWrapper>
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/skills",
    element: (
      <ProtectedRoute>
        <SuspenseWrapper>
          <AdminLayout>
            <AdminSkillsPage />
          </AdminLayout>
        </SuspenseWrapper>
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/projects",
    element: (
      <ProtectedRoute>
        <SuspenseWrapper>
          <AdminLayout>
            <AdminProjectsPage />
          </AdminLayout>
        </SuspenseWrapper>
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/categories",
    element: (
      <ProtectedRoute>
        <SuspenseWrapper>
          <AdminLayout>
            <AdminCategoriesPage />
          </AdminLayout>
        </SuspenseWrapper>
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/certificates",
    element: (
      <ProtectedRoute>
        <SuspenseWrapper>
          <AdminLayout>
            <AdminCertificatesPage />
          </AdminLayout>
        </SuspenseWrapper>
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/theme",
    element: (
      <ProtectedRoute>
        <SuspenseWrapper>
          <AdminLayout>
            <AdminThemePage />
          </AdminLayout>
        </SuspenseWrapper>
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/footer",
    element: (
      <ProtectedRoute>
        <SuspenseWrapper>
          <AdminLayout>
            <AdminFooterPage />
          </AdminLayout>
        </SuspenseWrapper>
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/media",
    element: (
      <ProtectedRoute>
        <SuspenseWrapper>
          <AdminLayout>
            <AdminMediaPage />
          </AdminLayout>
        </SuspenseWrapper>
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/profile",
    element: (
      <ProtectedRoute>
        <SuspenseWrapper>
          <AdminLayout>
            <AdminProfilePage />
          </AdminLayout>
        </SuspenseWrapper>
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/settings",
    element: (
      <ProtectedRoute>
        <SuspenseWrapper>
          <AdminLayout>
            <AdminSettingsPage />
          </AdminLayout>
        </SuspenseWrapper>
      </ProtectedRoute>
    ),
  },
  {
    path: "*",
    element: <SuspenseWrapper><NotFoundPage /></SuspenseWrapper>,
  },
]);
