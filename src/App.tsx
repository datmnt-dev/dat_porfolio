import React, { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SiteLayout from "./components/layout/SiteLayout";
import Home from "./pages/Home";
import PageLoader from "./components/ui/PageLoader";
import { SmoothScrollProvider } from "./motion";

// Lazy-loaded routes for code-splitting and faster initial page load
const About = lazy(() => import("./pages/About"));
const Projects = lazy(() => import("./pages/Projects"));
const ProjectDetail = lazy(() => import("./pages/ProjectDetail"));
const Experience = lazy(() => import("./pages/Experience"));
const SkillsPage = lazy(() => import("./pages/Skills"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogDetail = lazy(() => import("./pages/BlogDetail"));
const Playground = lazy(() => import("./pages/Playground"));
const ContactPage = lazy(() => import("./pages/Contact"));
const NotFound = lazy(() => import("./pages/Error/404"));
const MotionKitDemo = lazy(() => import("./motion/demo/MotionKitDemo"));

const App: React.FC = () => {
  return (
    <SmoothScrollProvider>
      <BrowserRouter>
        <Routes>
          {/* Main layout routes with automatic Suspense fallback */}
          <Route element={<SiteLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/:slug" element={<ProjectDetail />} />
            <Route path="/experience" element={<Experience />} />
            <Route path="/skills" element={<SkillsPage />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogDetail />} />
            <Route path="/playground" element={<Playground />} />
            <Route path="/contact" element={<ContactPage />} />
          </Route>

          {/* Route Motion Kit Playground (Lazy loaded) */}
          <Route
            path="/motion-kit"
            element={
              <Suspense fallback={<PageLoader />}>
                <MotionKitDemo />
              </Suspense>
            }
          />

          {/* 404 Route outside main layout */}
          <Route
            path="*"
            element={
              <Suspense fallback={<PageLoader />}>
                <NotFound />
              </Suspense>
            }
          />
        </Routes>
      </BrowserRouter>
    </SmoothScrollProvider>
  );
};

export default App;
