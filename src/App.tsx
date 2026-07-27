import React from "react";
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

const App: React.FC = () => {
  return (
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

        {/* Route 404 ngoài layout */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;