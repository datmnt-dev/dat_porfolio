# 🌌 Mai Nguyễn Tiến Đạt — Personal Portfolio

[![React](https://img.shields.io/badge/React-19.1-61DAFB?logo=react&logoColor=black)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Vite](https://img.shields.io/badge/Vite-7.1-646CFF?logo=vite&logoColor=white)](https://vite.dev)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Trang portfolio cá nhân chính thức của **Mai Nguyễn Tiến Đạt** (Full-stack Developer / Software Engineering Student tại Đại học FPT Đà Nẵng). Được thiết kế theo phong cách developer-centric, hiện đại với trải nghiệm tương tác 3D, hiệu ứng chuyển động mượt mà (smooth scrolling & tiered motion reveal) và kiến trúc đa trang tối ưu hiệu năng.

---

## ✨ Điểm nổi bật & Tính năng chính

- 🚀 **Kiến trúc Multi-page & Dynamic Code-Splitting**: 
  - Định tuyến phân tách bằng React Router v7 (`/`, `/about`, `/projects`, `/projects/:slug`, `/experience`, `/skills`, `/blog`, `/contact`, `/playground`).
  - Áp dụng `React.lazy` và `Suspense` kết hợp `PageLoader` cho toàn bộ trang nhánh, giảm tải initial bundle xuống 38% và tăng tốc First Contentful Paint.
  - Phân tách vendor chunks (`vendor-react`, `vendor-motion`, `vendor-three`, `vendor-icons`) trong Vite Rollup config giúp tối ưu bộ nhớ đệm trình duyệt & CDN.
- 🎨 **Hệ thống Motion & Scroll Reveal phân tầng**:
  - `Reveal`: Animation xuất hiện theo hướng và khoảng cách với cấu hình linh hoạt theo ngữ cảnh (`section`, `content`, `visual`, `card`, `scale`).
  - `VisualReveal`: Tối ưu hiển thị cho hình ảnh, screenshot sản phẩm và sơ đồ kiến trúc với hiệu ứng scale chiều sâu.
  - `SectionDivider`: Đường phân cách động mở rộng (`scaleX`) khi cuộn tới vị trí tương ứng.
  - Tích hợp bảo vệ truy cập (Accessibility safeguard) qua `usePrefersReducedMotion` và media queries.
  - Tự động dọn dẹp `will-change: auto` để giải phóng bộ nhớ GPU sau khi animation kết thúc.
- 🕹️ **Không gian 3D tương tác**: Hero Scene 3D dựng bằng Three.js phản hồi theo tương tác chuột và góc nhìn.
- ⚡ **Command Palette (Ctrl+K / Cmd+K)**: Tìm kiếm nhanh các dự án, bài viết, công nghệ và điều hướng tức thì.
- 📊 **GitHub Activity Insights**: Hiển thị hoạt động commit, repositories và chỉ số đóng góp trực quan.
- 📬 **Interactive Contact Hub**: Hỗ trợ 2 chế độ GUI & CLI Terminal trực tiếp, kết nối với mail server API backend.
- 🌊 **Lenis Smooth Scroll**: Cuộn trang siêu mượt với trải nghiệm nhất quán trên mọi kích thước màn hình.

---

## 🛠️ Công nghệ sử dụng (Tech Stack)

### Core & Frameworks
- **Framework / UI Library**: [React 19](https://react.dev) + [TypeScript 5.9](https://www.typescriptlang.org)
- **Bundler & Dev Server**: [Vite 7](https://vite.dev) với dynamic chunk splitting
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com) (tận dụng `@tailwindcss/vite` engine mới nhất)
- **Routing**: [React Router DOM v7](https://reactrouter.com)

### Animation & 3D
- **3D Graphics**: [Three.js](https://threejs.org)
- **Smooth Scrolling**: [Lenis](https://lenis.darkroom.engineering)
- **Timeline & Tweening**: [GSAP 3](https://gsap.com)
- **Delight & Micro-interactions**: `canvas-confetti`, custom spring physics

### Code Quality & Standards
- **Linter**: [ESLint 9](https://eslint.org) với cấu hình Flat Config
- **Type Checking**: TypeScript Compiler (`tsc -b`) với strict rules

---

## 📁 Cấu trúc thư mục (Directory Structure)

```text
dat_porfolio/
├── public/                  # Tài nguyên tĩnh (ảnh đại diện, favicon, CV pdf, assets)
├── src/
│   ├── components/          # Các component giao diện dùng chung
│   │   ├── layout/          # SiteHeader, SiteFooter, SiteLayout, IDEStatusBar
│   │   ├── sections/        # Project, Hero, Skills, Education, Contact...
│   │   └── ui/              # PageLoader, HeroScene3D, CommandPalette, SectionDivider...
│   ├── config/              # Cấu hình API, endpoints
│   ├── context/             # AppContext & State providers
│   ├── data/                # userdata.ts (Single source of truth cho toàn bộ nội dung)
│   ├── motion/              # Toàn bộ hệ thống motion kit, hooks, scenes & primitives
│   │   ├── feedback/        # Celebrate & sound feedback
│   │   ├── hooks/           # useInView, useLenis, useScrollProgress, usePrefersReducedMotion
│   │   ├── primitives/      # Reveal, VisualReveal, TiltCard, CountUp, ProgressRing
│   │   ├── providers/       # SmoothScrollProvider, LenisContext
│   │   └── scenes/          # GlyphPortalScene, ScrollVideoReveal
│   ├── pages/               # Các trang chính (Home, About, Projects, ProjectDetail, Blog...)
│   ├── App.tsx              # Cấu hình routes, Suspense và root layout
│   ├── main.tsx             # Entry point
│   └── index.css            # Custom CSS variables, tokens, keyframes & Tailwind directives
├── package.json
├── tsconfig.json
└── vite.config.ts
```

---

## 💻 Cài đặt & Khởi chạy cục bộ (Getting Started)

### Yêu cầu môi trường
- **Node.js**: >= 18.0.0 (khuyến nghị v20+)
- **Package Manager**: `npm` hoặc `pnpm`

### Các bước thực hiện

1. **Clone repository**:
   ```bash
   git clone https://github.com/datmnt-dev/dat_porfolio.git
   cd dat_porfolio
   ```

2. **Cài đặt dependencies**:
   ```bash
   npm install
   ```

3. **Cấu hình môi trường**:
   Sao chép `.env.example` thành `.env`:
   ```bash
   cp .env.example .env
   ```

4. **Chạy môi trường phát triển (Development mode)**:
   ```bash
   npm run dev
   ```
   Truy cập `http://localhost:5173` trên trình duyệt.

5. **Kiểm tra linter và type check**:
   ```bash
   npm run lint
   npm run build
   ```

---

## 📬 Liên hệ

- **Mai Nguyễn Tiến Đạt**
- **Email**: [tiendatyyy2005@gmail.com](mailto:tiendatyyy2005@gmail.com)
- **GitHub**: [@datmnt-dev](https://github.com/datmnt-dev)
- **Địa chỉ**: FPT Plaza 2, Ngũ Hành Sơn, Đà Nẵng, Việt Nam

---

*© 2026 Mai Nguyễn Tiến Đạt. All rights reserved.*
