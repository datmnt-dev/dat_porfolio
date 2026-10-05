import React, { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SiteLayout from "./components/layout/SiteLayout";
import Home from "./pages/Home";
import About from "./pages/About";
import Projects from "./pages/Projects";
import ProjectDetail from "./pages/ProjectDetail";
import Experience from "./pages/Experience";
import SkillsPage from "./pages/Skills";
import Blog from "./pages/Blog";
import BlogDetail from "./pages/BlogDetail";
import Playground from "./pages/Playground";
import ContactPage from "./pages/Contact";
import NotFound from "./pages/Error/404";
import { SmoothScrollProvider } from "./motion";

const MotionKitDemo = lazy(() => import("./motion/demo/MotionKitDemo"));

const App: React.FC = () => {
  return (
    <SmoothScrollProvider>
      <BrowserRouter>
        <Routes>
          {/* Các route đa trang bọc bởi SiteLayout */}
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
              <Suspense
                fallback={
                  <div className="min-h-screen bg-[#090b10] flex items-center justify-center font-mono text-xs text-zinc-400">
                    Initializing Motion Kit...
                  </div>
                }
              >
                <MotionKitDemo />
              </Suspense>
            }
          />

          {/* Route 404 ngoài layout */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </SmoothScrollProvider>
  );
};

export default App;