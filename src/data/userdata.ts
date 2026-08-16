// =============================================================
// Portfolio data — single source of truth for all pages
// =============================================================

export type ProjectStatus = "in-progress" | "completed" | "archived";
export type ProjectCategory = "web" | "fullstack" | "frontend" | "mobile" | "ai" | "tooling";

export interface ProjectLanguage {
    name: string;
    percent: string;
    color: string;
}

export interface ProjectRepository {
    label: string;
    url: string;
}

export interface Project {
    slug: string;
    title: string;
    tagline: string;
    description: string;
    longDescription?: string;
    technologies: string;
    techStack: string[];
    github: string;
    link: string;
    duration: string;
    cover: string;
    accent: string;
    status: ProjectStatus;
    category: ProjectCategory;
    featured: boolean;
    githubContributions?: number;
    responsibilities: string[];
    highlights?: { label: string; value: string }[];
    languageBreakdown?: ProjectLanguage[];
    repositories?: ProjectRepository[];
}

export interface BlogPost {
    slug: string;
    title: string;
    excerpt: string;
    tags: string[];
    date: string;
    readMinutes: number;
    cover: string;
    content: string; // markdown-like (rendered with prose-custom)
}

export interface PlaygroundItem {
    slug: string;
    title: string;
    description: string;
    tags: string[];
    accent: string;
    type: "demo" | "experiment" | "tool";
}

const info = {
    main: {
        name: "Mai Nguyễn Tiến Đạt",
        shortName: "Tien Dat",
        description:
            "Sinh viên năm cuối Kỹ thuật Phần mềm tại FPT University, định hướng Full-stack Developer. Có kinh nghiệm thực hành phát triển ứng dụng web end-to-end trong dự án nhóm và cá nhân, từ React/Next.js đến NestJS/ASP.NET Core, database, realtime và các tích hợp cloud.",
        shortBio:
            "Full-stack Developer tập trung vào React, TypeScript, .NET/NestJS và sản phẩm web/mobile có trải nghiệm rõ ràng, dữ liệu đáng tin cậy.",
        role: "Full-stack Developer (Fresher)",
        roles: ["Full-stack Developer", "React / .NET Developer", "Software Engineering Student"],
        photo: "/dat_img.jpg",
        email: "tiendatyyy2005@gmail.com",
        phone: "0935124666",
        birthday: "27/07/2005",
        address: "FPT Plaza 2, Ngũ Hành Sơn, Đà Nẵng",
        availability: "Open to internship & junior roles",
        location: "Đà Nẵng, Vietnam",
        languages: ["Tiếng Việt (Bản ngữ)", "English (IELTS 5.0)"],
    },

    stats: [
        { label: "Học vấn CNTT", value: "Năm cuối" },
        { label: "Repos công khai", value: "21" },
        { label: "Sản phẩm chính", value: "12" },
        { label: "Công nghệ", value: "20+" },
    ],

    values: [
        {
            title: "Quality first",
            description: "Viết code rõ ràng, có thể bảo trì và mở rộng — quan tâm đến chi tiết của trải nghiệm.",
            icon: "sparkle",
        },
        {
            title: "Always learning",
            description: "Mỗi sprint là một cơ hội đọc thêm tài liệu, thử pattern mới, và refactor cũ.",
            icon: "book",
        },
        {
            title: "User-centric",
            description: "Sản phẩm phải giải quyết bài toán thật — đo bằng hành vi người dùng, không phải số dòng code.",
            icon: "users",
        },
        {
            title: "Reliable teammate",
            description: "Giao tiếp rõ, commit nhỏ, PR dễ review, sẵn sàng pair-program.",
            icon: "shield",
        },
    ],

    socials: {
        twitter: "https://x.com/Mai_dat27",
        github: "https://github.com/datmnt-dev",
        linkedin: "https://www.linkedin.com/in/mai-nguy%E1%BB%85n-ti%E1%BA%BFn-%C4%91%E1%BA%A1t-662a112b6/",
        instagram: "https://www.instagram.com/daw.27.7/",
        facebook: "https://www.facebook.com/mai.dat.270705",
    },

    skills: {
        technical: [
            { name: "React 19 / Next.js", level: 85 },
            { name: "TypeScript / JavaScript", level: 85 },
            { name: "NestJS / Node.js / Express", level: 80 },
            { name: "ASP.NET Core 8 / C#", level: 75 },
            { name: "Tailwind CSS / Framer Motion", level: 85 },
            { name: "PostgreSQL / MongoDB / Firestore", level: 80 },
            { name: "JWT / RBAC / REST API", level: 80 },
            { name: "SignalR / Socket.IO", level: 70 },
            { name: "React Native / Expo / Capacitor", level: 65 },
            { name: "Python / FastAPI", level: 60 },
        ],
        tools: [
            "Git & GitHub Pull Request",
            "Vite",
            "Docker / Docker Compose",
            "Swagger / OpenAPI",
            "Postman",
            "Firebase",
            "Cloudinary",
            "ESLint / Jest",
        ],
        methodologies: [
            "Agile/Scrum",
            "MVC Architecture",
            "RESTful API Design",
            "Test Driven Development (TDD)",
            "Object-Oriented Programming (OOP)",
            "SDLC",
        ],
        soft: [
            "Phân tích yêu cầu người dùng",
            "Làm việc nhóm & Git workflow",
            "Tư duy giải quyết vấn đề",
            "Giao tiếp & thuyết trình",
        ],
    },

    projects: [
        {
            slug: "jobfinder",
            title: "JobFinder",
            tagline: "Nền tảng kết nối ứng viên & nhà tuyển dụng",
            description:
                "JobFinder là nền tảng web kết nối ứng viên và nhà tuyển dụng, hỗ trợ quản lý hồ sơ/CV, tìm kiếm và ứng tuyển việc làm, đăng tin tuyển dụng, theo dõi trạng thái ứng tuyển, phân quyền người dùng và quản trị hệ thống.",
            longDescription:
                "JobFinder được xây dựng để rút ngắn khoảng cách giữa ứng viên và nhà tuyển dụng tại thị trường Việt Nam. Ứng viên có thể tạo CV, thiết lập alert việc làm phù hợp; nhà tuyển dụng quản lý tin đăng, sàng lọc ứng viên qua bộ lọc thông minh. Hệ thống được thiết kế theo kiến trúc client-server với Spring Boot + JWT, frontend ReactJS có animation mượt bằng Framer Motion.",
            technologies:
                "ReactJS, Tailwind CSS, Bootstrap, Framer Motion, Spring Boot, JWT Authentication, SQL Server, MySQL, Git, Postman, Figma",
            techStack: [
                "ReactJS",
                "Tailwind CSS",
                "Framer Motion",
                "Spring Boot",
                "JWT",
                "SQL Server",
                "MySQL",
                "Figma",
            ],
            github: "https://github.com/SWPGr/fe-jobfinder",
            link: "https://fe-jobfinder.vercel.app",
            duration: "10/2024 - Hiện tại",
            cover: "/jobfinder.ico",
            accent: "from-cyan-500 to-indigo-500",
            status: "in-progress" as ProjectStatus,
            category: "fullstack" as ProjectCategory,
            featured: true,
            githubContributions: 166,
            responsibilities: [
                "Phát triển dashboard cho admin và job seeker, cùng các trang chi tiết ứng viên",
                "Bổ sung luồng chặn người dùng, trang blocked và notification cho các vai trò liên quan",
                "Xây dựng các phần employer dashboard và điều chỉnh giao diện quản trị",
                "Cộng tác ở cả frontend React và backend Spring Boot trong repository của team",
                "Đóng góp 141 commits ở frontend và 25 commits ở backend theo thống kê GitHub công khai",
                "Phát triển chức năng quản lý CV và hồ sơ người dùng cho ứng viên",
                "Xây dựng tìm kiếm và lọc thông minh cho việc làm và ứng viên theo nhiều tiêu chí",
                "Tích hợp Rich Text Editor cho mô tả công việc và nội dung hồ sơ",
                "Triển khai upload & preview avatar, CV (PDF) cho người dùng",
                "Quản lý trạng thái ứng tuyển và chức năng lưu việc làm",
                "Thiết kế giao diện responsive, component tái sử dụng, cải thiện trải nghiệm người dùng",
                "Xây dựng form xác thực & phân quyền (login/register) với kiểm tra dữ liệu đầu vào",
                "Tối ưu UI với animation mượt bằng Framer Motion",
            ],
            highlights: [
                { label: "Vai trò", value: "Front-end Lead" },
                { label: "Team", value: "7 contributors" },
                { label: "Tech", value: "React + Spring Boot" },
                { label: "GitHub", value: "166 commits" },
            ],
            languageBreakdown: [
                { name: "JavaScript", percent: "55%", color: "#f7df1e" },
                { name: "Tailwind CSS", percent: "25%", color: "#38bdf8" },
                { name: "Spring Boot", percent: "20%", color: "#6db33f" },
            ],
            repositories: [
                { label: "Frontend", url: "https://github.com/SWPGr/fe-jobfinder" },
                { label: "Backend", url: "https://github.com/SWPGr/be-jobfinder" },
            ],
        },
        {
            slug: "myroomie",
            title: "MyRoomie",
            tagline: "Nền tảng tìm phòng trọ và bạn cùng phòng thông minh",
            description:
                "Ứng dụng web/mobile hỗ trợ sinh viên và người đi làm tìm phòng trọ và bạn cùng phòng phù hợp. Hệ thống có phân quyền tenant/chủ trọ/admin, booking, chat thời gian thực, thông báo và các tích hợp Firebase.",
            longDescription:
                "MyRoomie gồm SPA React 19, API ASP.NET Core .NET 8 dùng Firestore và SignalR, cùng service FastAPI. Tôi phát triển chat theo room card và chat ẩn danh tenant, tích hợp dữ liệu thật giữa frontend/backend, hoàn thiện booking/notification, đồng bộ API contracts, Firebase Analytics và leaderboard seeder; đồng thời phối hợp merge/review các nhánh tính năng.",
            technologies:
                "React 19, TypeScript, Vite, Tailwind CSS 4, Firebase/Firestore, SignalR, ASP.NET Core .NET 8, FastAPI",
            techStack: [
                "React 19",
                "TypeScript",
                "Tailwind CSS",
                "ASP.NET Core 8",
                "Firestore",
                "SignalR",
                "FastAPI",
                "Capacitor",
            ],
            github: "https://github.com/dat-21/MyRoomie",
            link: "#",
            duration: "06/2026",
            cover: "/myroomie-logo.png",
            accent: "from-teal-500 to-cyan-500",
            status: "in-progress" as ProjectStatus,
            category: "fullstack" as ProjectCategory,
            featured: true,
            responsibilities: [
                "Phát triển chat theo room card và chat ẩn danh tenant, tích hợp dữ liệu thật giữa frontend và backend",
                "Hoàn thiện backend booking/notification, xử lý phản hồi kiểm thử và đồng bộ API contracts giữa giao diện và API",
                "Tích hợp Firebase Analytics tracking và thiết lập leaderboard seeder",
                "Làm việc với phân quyền tenant/chủ trọ/admin, realtime chat/notification và các tích hợp Firebase",
                "Phối hợp merge/review các nhánh tính năng của team",
            ],
            highlights: [
                { label: "Vai trò", value: "Full-stack Contributor" },
                { label: "Kiến trúc", value: "React + .NET + AI" },
                { label: "Nền tảng", value: "Web + Android" },
            ],
            languageBreakdown: [
                { name: "TypeScript", percent: "55%", color: "#3178c6" },
                { name: "C# / .NET", percent: "30%", color: "#512bd4" },
                { name: "Python AI", percent: "15%", color: "#3776ab" },
            ],
            repositories: [
                { label: "Source code", url: "https://github.com/dat-21/MyRoomie" },
            ],
        },
        {
            slug: "threadlearn",
            title: "ThreadLearn",
            tagline: "Nền tảng học lập trình đa luồng tích hợp AI",
            description:
                "Sản phẩm học lập trình tương tác có coding IDE, khóa học, quiz, gamification, leaderboard, thảo luận và phân tích code bằng AI. Tôi đóng góp cho cả frontend Next.js và backend NestJS trong một team 5 người.",
            longDescription:
                "Frontend dùng Next.js 15, React 19, Zustand, TanStack Query, React Hook Form/Zod và Socket.IO. Backend NestJS dùng MongoDB, Redis, JWT, Socket.IO, Swagger và lớp validation/guard tập trung. Các contribution công khai của tôi gồm Monaco Code Editor với live JavaScript sandbox và AI stream, entitlement khóa học premium, reconciliation PayOS, quiz availability, lesson notes/discussions và curriculum seed data.",
            technologies:
                "Next.js 15, React 19, TypeScript, Tailwind CSS, Zustand, TanStack Query, Socket.IO, NestJS, MongoDB, Redis, JWT, Swagger, PayOS",
            techStack: ["Next.js 15", "React 19", "TypeScript", "Zustand", "NestJS", "MongoDB", "Redis", "Socket.IO"],
            github: "https://github.com/ThreadLearn/ThreadLearn_WEB_FE",
            link: "https://thread-learn-web-fe.vercel.app",
            duration: "05/2026 - Hiện tại",
            cover: "/fpt.png",
            accent: "from-violet-500 to-cyan-500",
            status: "in-progress" as ProjectStatus,
            category: "fullstack" as ProjectCategory,
            featured: true,
            githubContributions: 235,
            responsibilities: [
                "Tích hợp Monaco Code Editor, live JavaScript sandbox và luồng AI server stream cho Code Lab",
                "Hoàn thiện entitlement subscription/premium access và reconciliation callback thanh toán PayOS",
                "Cải thiện luồng quiz, điều kiện truy cập khóa học và UI khóa nội dung premium",
                "Bổ sung lesson discussions ẩn danh, ghi chú nhiều mục trên mỗi lesson và dữ liệu curriculum",
                "Đóng góp 157 commits ở frontend và 78 commits ở backend theo thống kê GitHub công khai",
            ],
            highlights: [
                { label: "Vai trò", value: "Full-stack Contributor" },
                { label: "Team", value: "5 contributors" },
                { label: "GitHub", value: "235 commits" },
            ],
            languageBreakdown: [
                { name: "TypeScript", percent: "70%", color: "#3178c6" },
                { name: "React / Next", percent: "20%", color: "#61dafb" },
                { name: "CSS", percent: "10%", color: "#38bdf8" },
            ],
            repositories: [
                { label: "Frontend", url: "https://github.com/ThreadLearn/ThreadLearn_WEB_FE" },
                { label: "Backend", url: "https://github.com/ThreadLearn/ThreadLearn_WEB_BE" },
            ],
        },
        {
            slug: "agrilink-vietnam",
            title: "AgriLink Vietnam",
            tagline: "Hệ sinh thái thương mại điện tử nông sản",
            description:
                "Nền tảng số kết nối nông dân, hợp tác xã, người mua, doanh nghiệp, nhà cung cấp, cơ quan nhà nước và logistics. Tôi đóng góp cho frontend Next.js và backend NestJS của team.",
            longDescription:
                "AgriLink có marketplace, dashboard theo 7 vai trò, lô hàng hợp tác xã, lịch thu hoạch, market prices, QR traceability, reviews, ads và audit logs. Frontend dùng Next.js 15/Tailwind 4; backend NestJS 10 dùng TypeORM, PostgreSQL, JWT, Swagger và Docker. Contribution công khai của tôi tập trung vào marketplace filters, wishlist/notifications, responsive/CI, product/certification flows, TypeORM composition, auth hardening và ranh giới profiles/admin.",
            technologies:
                "Next.js 15, TypeScript, Tailwind CSS 4, NestJS 10, TypeORM, PostgreSQL, JWT, Swagger, Docker, Recharts",
            techStack: ["Next.js 15", "TypeScript", "Tailwind 4", "NestJS 10", "TypeORM", "PostgreSQL", "Swagger", "Docker"],
            github: "https://github.com/AgriLinkVN/agrilink-frontend",
            link: "#",
            duration: "06/2026 - Hiện tại",
            cover: "https://raw.githubusercontent.com/AgriLinkVN/agrilink-frontend/develop/public/logo.png",
            accent: "from-emerald-500 to-lime-500",
            status: "in-progress" as ProjectStatus,
            category: "fullstack" as ProjectCategory,
            featured: true,
            githubContributions: 208,
            responsibilities: [
                "Hoàn thiện marketplace filters, cải tiến responsive và SEO/image polish cho luồng sản phẩm",
                "Refactor query layer cho notifications và wishlist, đồng thời cải thiện seller/certification flows",
                "Thiết lập frontend CI quality gate, xử lý lint và chuẩn bị checklist deploy",
                "Củng cố TypeORM composition, persistence boundaries cho users/auth/profiles/admin và login email/phone",
                "Đóng góp 38 commits ở frontend và 170 commits ở backend theo contributor API công khai",
            ],
            highlights: [
                { label: "Vai trò", value: "Full-stack Contributor" },
                { label: "Người dùng", value: "7 roles" },
                { label: "GitHub", value: "208 commits" },
            ],
            languageBreakdown: [
                { name: "TypeScript", percent: "70%", color: "#3178c6" },
                { name: "Next.js", percent: "15%", color: "#111827" },
                { name: "PostgreSQL", percent: "15%", color: "#336791" },
            ],
            repositories: [
                { label: "Frontend", url: "https://github.com/AgriLinkVN/agrilink-frontend" },
                { label: "Backend", url: "https://github.com/AgriLinkVN/agrilink-backend" },
            ],
        },
        {
            slug: "music-web",
            title: "Music Web Platform",
            tagline: "Nền tảng nghe nhạc full-stack có AI search",
            description:
                "Nền tảng nghe nhạc gồm ứng dụng React, API Node.js, dịch vụ semantic search bằng FastAPI và shared contracts. Sản phẩm có player, playlist, lịch sử nghe, quản trị nội dung, phân quyền và chatbot AI.",
            longDescription:
                "Frontend được tổ chức theo feature với React 19, TypeScript, Zustand và TanStack Query. Backend triển khai xác thực JWT, quản lý bài hát/album/playlist, upload Cloudinary và API cho admin. Dịch vụ AI tách riêng, dùng embedding, Redis cache, FAISS vector store, Docker và bộ test pytest cho luồng semantic search.",
            technologies:
                "React 19, TypeScript, Zustand, TanStack Query, Tailwind CSS, Node.js, Express, MongoDB, JWT, Cloudinary, FastAPI, FAISS, Redis, Docker",
            techStack: [
                "React 19",
                "TypeScript",
                "Zustand",
                "Node.js",
                "MongoDB",
                "FastAPI",
                "FAISS",
                "Docker",
            ],
            github: "https://github.com/datmnt-dev/Music_Web_FE",
            link: "#",
            duration: "2026",
            cover: "/jobfinder.ico",
            accent: "from-rose-500 to-violet-500",
            status: "in-progress" as ProjectStatus,
            category: "fullstack" as ProjectCategory,
            featured: true,
            githubContributions: 173,
            responsibilities: [
                "Xây dựng giao diện nghe nhạc với player, queue, thư viện, playlist và các trạng thái loading/error",
                "Tổ chức API layer, query hooks và state management cho xác thực, bài hát, lịch sử nghe và chatbot",
                "Phát triển backend theo controller, service, repository và validation tách lớp",
                "Tích hợp JWT, phân quyền User/Moderator/Admin, Cloudinary và quản lý metadata audio",
                "Triển khai dịch vụ semantic search độc lập với FastAPI, embeddings, Redis cache và FAISS",
                "Đóng góp 85 commits ở frontend, 55 commits ở backend, 30 commits ở AI service và 3 commits ở shared contracts",
            ],
            highlights: [
                { label: "Vai trò", value: "Full-stack Developer" },
                { label: "Kiến trúc", value: "Web + API + AI service" },
                { label: "AI", value: "Semantic search" },
                { label: "GitHub", value: "173 commits" },
            ],
            languageBreakdown: [
                { name: "TypeScript", percent: "55%", color: "#3178c6" },
                { name: "Python", percent: "25%", color: "#3776ab" },
                { name: "CSS", percent: "20%", color: "#38bdf8" },
            ],
            repositories: [
                { label: "Frontend", url: "https://github.com/datmnt-dev/Music_Web_FE" },
                { label: "Backend", url: "https://github.com/datmnt-dev/Music_Web_BE" },
                { label: "AI Search", url: "https://github.com/datmnt-dev/Music_Web_AI" },
                { label: "Shared contracts", url: "https://github.com/datmnt-dev/melody-contracts" },
            ],
        },
        {
            slug: "library-management",
            title: "Library Management System",
            tagline: "Số hoá quy trình quản lý sách & mượn-trả",
            description:
                "Hệ thống quản lý thư viện số hóa các quy trình cốt lõi như quản lý sách, người dùng và mượn–trả, giúp thao tác nhanh hơn, dữ liệu nhất quán và giảm sai sót cho thủ thư/admin và người đọc.",
            longDescription:
                "Library Management là hệ thống web full-stack với frontend React và backend TypeScript. Source code thể hiện các module xác thực, sách, người dùng, mượn-trả, upload, email, rate limiting và validation được tách rõ theo controller, service và route.",
            technologies:
                "ReactJS, TypeScript, Vite, Tailwind CSS, React Icons, Node.js, Express.js, MongoDB, Mongoose ODM, RESTful API, Git",
            techStack: [
                "ReactJS",
                "TypeScript",
                "Vite",
                "Tailwind CSS",
                "Node.js",
                "Express",
                "MongoDB",
                "REST API",
            ],
            github: "https://github.com/datmnt-dev/library_management_system",
            link: "#",
            duration: "2025 - Hiện tại",
            cover: "/fpt.png",
            accent: "from-emerald-500 to-cyan-500",
            status: "in-progress" as ProjectStatus,
            category: "fullstack" as ProjectCategory,
            featured: true,
            responsibilities: [
                "Xây dựng quản lý kho sách & trạng thái khả dụng",
                "Phát triển quản lý người dùng và luồng mượn–trả end-to-end với theo dõi hạn trả",
                "Chuẩn hóa business rules & validation cho dữ liệu mượn–trả",
                "Cải thiện UI/UX: tìm kiếm nhanh, phản hồi rõ ràng cho người dùng",
                "Xử lý edge cases để tăng độ ổn định và đảm bảo UI nhất quán với logic backend",
            ],
            highlights: [
                { label: "Vai trò", value: "Full-stack" },
                { label: "Database", value: "MongoDB" },
                { label: "Pattern", value: "REST + MVC" },
            ],
            languageBreakdown: [
                { name: "TypeScript", percent: "65%", color: "#3178c6" },
                { name: "React", percent: "20%", color: "#61dafb" },
                { name: "MongoDB", percent: "15%", color: "#47a248" },
            ],
        },
        {
            slug: "storeflow",
            title: "StoreFlow",
            tagline: "Ứng dụng quản lý sản phẩm, giỏ hàng & đơn hàng",
            description:
                "Ứng dụng Flutter đa nền tảng cho Android, iOS, Web và Windows. Hỗ trợ danh mục sản phẩm, giỏ hàng, đặt hàng, phân quyền Customer/Manager/Admin và thống kê doanh thu.",
            longDescription:
                "StoreFlow dùng Firebase Authentication và Cloud Firestore. Luồng điều hướng thay đổi theo vai trò với StatefulShellRoute; người dùng mua sắm, quản lý giỏ và lịch sử đơn hàng, trong khi Manager/Admin quản lý kho, thống kê và quyền. Codebase có design tokens, các trạng thái loading/empty/error và component tái sử dụng cho sản phẩm, đơn hàng và số lượng.",
            technologies:
                "Flutter, Dart, Firebase Authentication, Cloud Firestore, StatefulShellRoute, Android, iOS, Web, Windows",
            techStack: ["Flutter", "Dart", "Firebase Auth", "Cloud Firestore", "Role-based access", "Material Design"],
            github: "https://github.com/datmnt-dev/product_management_cart_app",
            link: "#",
            duration: "2026",
            cover: "/fpt.png",
            accent: "from-emerald-500 to-teal-500",
            status: "completed" as ProjectStatus,
            category: "mobile" as ProjectCategory,
            featured: true,
            githubContributions: 28,
            responsibilities: [
                "Xây dựng luồng đăng ký, đăng nhập và điều hướng theo vai trò Customer, Manager và Admin",
                "Phát triển quản lý sản phẩm, giỏ hàng, checkout, lịch sử đơn và thống kê doanh thu",
                "Tích hợp Firebase Authentication, Cloud Firestore và cấu hình đa nền tảng",
                "Tạo design system nhỏ gồm màu sắc, typography, spacing, motion và các component dùng lại",
                "Thiết kế trạng thái loading, empty, error và dialog xác nhận cho các thao tác chính",
            ],
            highlights: [
                { label: "Vai trò", value: "Mobile Developer" },
                { label: "Nền tảng", value: "Android, iOS, Web, Windows" },
                { label: "Backend", value: "Firebase" },
            ],
            languageBreakdown: [
                { name: "Dart", percent: "85%", color: "#0175c2" },
                { name: "Firebase", percent: "15%", color: "#ffca28" },
            ],
        },
        {
            slug: "face-auth-ai",
            title: "Face Auth AI",
            tagline: "Xác thực người dùng qua camera và nhận diện khuôn mặt",
            description:
                "Prototype full-stack cho đăng ký, đăng nhập và xác thực khuôn mặt. Frontend React sử dụng webcam, kết nối tới backend Python có database, models và utilities riêng.",
            longDescription:
                "Dự án tách frontend Vite/React khỏi backend Python để xử lý dữ liệu xác thực. Source tree gồm WebcamCapture, API client ở phía client và các module database, models, utils ở server, thể hiện rõ luồng nhận hình ảnh từ camera tới dịch vụ xác thực.",
            technologies:
                "React 19, TypeScript, Vite, react-webcam, Python, API integration, Database",
            techStack: ["React 19", "TypeScript", "Vite", "react-webcam", "Python", "Authentication"],
            github: "https://github.com/datmnt-dev/face_Auth_AI",
            link: "#",
            duration: "2026",
            cover: "/dat_img.jpg",
            accent: "from-cyan-500 to-blue-600",
            status: "in-progress" as ProjectStatus,
            category: "ai" as ProjectCategory,
            featured: false,
            responsibilities: [
                "Xây dựng màn hình React nhận hình ảnh trực tiếp từ webcam",
                "Tách API client khỏi component giao diện để kết nối backend xác thực",
                "Tổ chức backend Python theo các module main, database, models và utilities",
                "Khảo sát luồng xác thực sinh trắc học cho trải nghiệm đăng nhập không cần nhập mật khẩu",
            ],
            highlights: [
                { label: "Vai trò", value: "Full-stack Developer" },
                { label: "Input", value: "Webcam" },
                { label: "Mục tiêu", value: "Face verification" },
            ],
            languageBreakdown: [
                { name: "TypeScript", percent: "50%", color: "#3178c6" },
                { name: "Python", percent: "50%", color: "#3776ab" },
            ],
        },
        {
            slug: "product-management-mobile",
            title: "Product Management Mobile",
            tagline: "Ứng dụng Expo quản lý sản phẩm và đơn hàng",
            description:
                "Ứng dụng React Native/Expo quản lý sản phẩm, giỏ hàng, checkout, wishlist, người dùng và doanh thu. Dữ liệu được lưu cục bộ với SQLite, đi kèm xác thực và các màn hình quản trị.",
            longDescription:
                "Ứng dụng có các màn hình cho home, chi tiết sản phẩm, giỏ hàng, thanh toán, đơn hàng, hồ sơ, analytics, revenue và quản lý người dùng. Kiến trúc tách component, service, hook, context, navigation và type để luồng CRUD dễ mở rộng.",
            technologies:
                "React Native, Expo, TypeScript, Expo SQLite, React Navigation, AsyncStorage, Image Picker",
            techStack: ["React Native", "Expo", "TypeScript", "SQLite", "React Navigation", "AsyncStorage"],
            github: "https://github.com/datmnt-dev/MMA301_PE",
            link: "#",
            duration: "2026",
            cover: "/fpt.png",
            accent: "from-orange-500 to-pink-500",
            status: "completed" as ProjectStatus,
            category: "mobile" as ProjectCategory,
            featured: false,
            responsibilities: [
                "Phát triển các màn hình sản phẩm, giỏ hàng, checkout, đơn hàng và wishlist",
                "Xây dựng dashboard, analytics, revenue và quản lý người dùng cho admin",
                "Tổ chức dữ liệu local với Expo SQLite cùng các service CRUD theo domain",
                "Tạo component tái sử dụng cho tìm kiếm, sản phẩm, đơn hàng, skeleton và toast",
                "Quản lý phiên người dùng bằng AuthContext, navigation stack và AsyncStorage",
            ],
            highlights: [
                { label: "Vai trò", value: "Mobile Developer" },
                { label: "Data", value: "SQLite local" },
                { label: "Runtime", value: "Expo" },
            ],
            languageBreakdown: [
                { name: "TypeScript", percent: "80%", color: "#3178c6" },
                { name: "SQLite", percent: "20%", color: "#003b57" },
            ],
        },
        {
            slug: "store-management-api",
            title: "Store Management API",
            tagline: "REST API TypeScript cho sản phẩm và tài khoản",
            description:
                "Backend Express/TypeScript cho quản lý sản phẩm và người dùng. Có xác thực JWT, upload ảnh bằng Multer, MongoDB/Mongoose và kiểm thử API với Jest, Supertest cùng MongoDB Memory Server.",
            longDescription:
                "Codebase được tách theo router, controller, service, model, middleware và test. Các module riêng cho auth, product, upload và database giúp dự án phù hợp để luyện kiến trúc backend có validation, authorization và kiểm thử tích hợp.",
            technologies:
                "TypeScript, Node.js, Express 5, MongoDB, Mongoose, JWT, bcrypt, Multer, Jest, Supertest",
            techStack: ["TypeScript", "Express", "MongoDB", "JWT", "Multer", "Jest", "Supertest"],
            github: "https://github.com/datmnt-dev/NodeJS_ASM01",
            link: "#",
            duration: "2025",
            cover: "/jobfinder.ico",
            accent: "from-indigo-500 to-cyan-500",
            status: "completed" as ProjectStatus,
            category: "fullstack" as ProjectCategory,
            featured: false,
            responsibilities: [
                "Thiết kế REST API cho xác thực, sản phẩm và upload ảnh",
                "Áp dụng JWT, bcrypt, middleware phân quyền và Mongoose models",
                "Tách controller và service để cô lập HTTP layer khỏi business logic",
                "Viết kiểm thử API bằng Jest, Supertest và MongoDB Memory Server",
            ],
            highlights: [
                { label: "Vai trò", value: "Backend Developer" },
                { label: "Auth", value: "JWT + bcrypt" },
                { label: "Testing", value: "Jest + Supertest" },
            ],
            languageBreakdown: [
                { name: "TypeScript", percent: "75%", color: "#3178c6" },
                { name: "MongoDB", percent: "15%", color: "#47a248" },
                { name: "Tests", percent: "10%", color: "#c21325" },
            ],
        },
        {
            slug: "simple-quiz",
            title: "Simple Quiz",
            tagline: "Quản lý bộ câu hỏi và quiz theo mô hình client-server",
            description:
                "Ứng dụng quiz gồm frontend Vite/React và backend Express/MongoDB. Giao diện có khu vực quản lý quiz và câu hỏi; server tách route, controller, model cho hai domain này.",
            longDescription:
                "Dự án là bài thực hành full-stack tập trung vào mô hình CRUD: client gọi API riêng, backend triển khai Question và Quiz models cùng controller/route tương ứng. Đây là bước thực hành nền tảng cho việc tách frontend và REST API.",
            technologies:
                "React, Vite, JavaScript, Node.js, Express 5, MongoDB, Mongoose, REST API",
            techStack: ["React", "Vite", "JavaScript", "Express", "MongoDB", "Mongoose"],
            github: "https://github.com/datmnt-dev/SimpleQuiz",
            link: "#",
            duration: "2026",
            cover: "/fpt.png",
            accent: "from-amber-500 to-rose-500",
            status: "completed" as ProjectStatus,
            category: "fullstack" as ProjectCategory,
            featured: false,
            responsibilities: [
                "Xây dựng giao diện quản lý quiz và câu hỏi bằng React",
                "Thiết kế API Express cho các thao tác CRUD quiz và question",
                "Mô hình hóa dữ liệu với MongoDB và Mongoose",
                "Tách frontend/backend để thực hành luồng gọi REST API end-to-end",
            ],
            highlights: [
                { label: "Vai trò", value: "Full-stack Developer" },
                { label: "Domain", value: "Quiz + Questions" },
                { label: "Pattern", value: "REST CRUD" },
            ],
            languageBreakdown: [
                { name: "JavaScript", percent: "70%", color: "#f7df1e" },
                { name: "React", percent: "15%", color: "#61dafb" },
                { name: "MongoDB", percent: "15%", color: "#47a248" },
            ],
        },
        {
            slug: "portfolio-website",
            title: "Portfolio Website",
            tagline: "Trang giới thiệu bản thân & dự án",
            description:
                "Trang web Portfolio cá nhân được thiết kế và phát triển nhằm giới thiệu bản thân, kỹ năng, dự án và quá trình học tập, làm việc. Giao diện được tối ưu hiện đại, thân thiện với người dùng và có khả năng mở rộng dễ dàng.",
            longDescription:
                "Portfolio này được dựng từ con số 0 với React 19 + Vite + Tailwind 4. Hỗ trợ dark/light, 4 accent themes (cyan/green/purple/amber), command palette (Ctrl+K) và một easter egg matrix rain. Kiến trúc đa trang với React Router 7, dữ liệu tập trung, các trang chi tiết cho từng project và bài blog.",
            technologies:
                "ReactJS, TypeScript, Vite, Tailwind CSS, React Router, GitHub Pages/Render",
            techStack: [
                "React 19",
                "TypeScript",
                "Vite",
                "Tailwind 4",
                "React Router 7",
                "Resend",
            ],
            github: "https://github.com/datmnt-dev/dat_porfolio",
            link: "https://dat-portfolio.onrender.com",
            duration: "2024 - Hiện tại",
            cover: "/dat_img.jpg",
            accent: "from-fuchsia-500 to-purple-500",
            status: "in-progress" as ProjectStatus,
            category: "frontend" as ProjectCategory,
            featured: true,
            githubContributions: 64,
            responsibilities: [
                "Thiết kế và phát triển giao diện responsive với Tailwind CSS",
                "Tích hợp dark/light theme với CSS Variables, 4 accent themes",
                "Xây dựng form liên hệ tích hợp Resend (email service)",
                "Triển khai routing đa trang với React Router 7",
                "Tối ưu hiệu suất và accessibility (a11y, reduced motion)",
                "Duy trì 64 commits trên repository portfolio public và tách riêng mail API cho production",
            ],
            highlights: [
                { label: "Vai trò", value: "Solo Dev" },
                { label: "Pages", value: "10+" },
                { label: "Theme", value: "Dark/Light + 4 accents" },
                { label: "GitHub", value: "64 commits" },
            ],
            languageBreakdown: [
                { name: "TypeScript", percent: "55%", color: "#3178c6" },
                { name: "React 19", percent: "30%", color: "#61dafb" },
                { name: "Tailwind 4", percent: "15%", color: "#38bdf8" },
            ],
            repositories: [
                { label: "Portfolio frontend", url: "https://github.com/datmnt-dev/dat_porfolio" },
                { label: "Mail API", url: "https://github.com/datmnt-dev/portfolio-mail-api" },
            ],
        },
    ] as Project[],

    education: [
        {
            school: "FPT University – Đà Nẵng",
            degree: "Cử nhân Công nghệ Thông tin – Kỹ thuật Phần mềm (BIT_SE)",
            duration: "2023 - Nay",
            image: "fpt.png",
            descriptions: [
                "Sinh viên năm cuối ngành Kỹ thuật Phần mềm, định hướng phát triển Full-stack.",
                "Đã hoàn thành các học phần nền tảng: OOP, Cấu trúc dữ liệu & Giải thuật, Cơ sở dữ liệu, Hệ điều hành, Mạng máy tính và Web Development.",
                "Đã hoàn thành On-the-Job Training (OJT) và thực hành phát triển dự án theo Git workflow, Pull Request và teamwork.",
            ],
            technicalSkills: {
                languages: ["TypeScript", "JavaScript", "C#", "Java", "SQL"],
                web: ["React 19", "Next.js 15/16", "Vite", "Tailwind CSS 3/4"],
                backend: ["NestJS", "Node.js/Express", "ASP.NET Core 8", "JWT/RBAC"],
                database: ["MongoDB", "PostgreSQL", "Redis", "Firebase/Firestore", "Supabase"],
                tools: ["Git/GitHub Pull Request", "Docker Compose", "Swagger/OpenAPI", "Postman", "ESLint", "Jest"],
            },
        },
    ],

    experience: [
        {
            position: "Full-stack Developer",
            company: "ThreadLearn - Dự án nhóm",
            duration: "05/2026 - 07/2026",
            image: "fpt.png",
            descriptions: [
                "Phát triển luồng subscription và thanh toán PayOS, tạo dữ liệu gói dịch vụ phục vụ kiểm thử và xử lý callback/thanh toán thành công ở backend.",
                "Hoàn thiện trải nghiệm học tập: quyền xem bài preview, tính nhất quán XP/quiz attempt và phân trang lịch sử làm quiz.",
                "Xây dựng, tinh chỉnh giao diện feature-first trên Next.js; áp dụng React Query, Zustand, React Hook Form và Zod cho state, gọi API và validation form.",
                "Phối hợp theo GitHub Pull Request, xử lý fallback production và viết tài liệu bàn giao/kiểm thử end-to-end cho luồng subscription.",
            ],
        },
        {
            position: "Full-stack Developer",
            company: "AgriLink Vietnam - Dự án nhóm",
            duration: "06/2026 - 07/2026",
            image: "fpt.png",
            descriptions: [
                "Phát triển tính năng marketplace end-to-end: wishlist, trang chi tiết sản phẩm có thông tin người bán/vị trí, chuyển trạng thái sản phẩm và luồng duyệt chứng nhận.",
                "Triển khai backend NestJS cho xác thực chứng nhận, Firebase mobile auth sync với JWT, upload tài liệu lên Supabase và tổ chức ảnh trên Cloudinary.",
                "Xây dựng UI đa bước cho sản phẩm, badge chứng nhận đã xác minh, màn hình review chứng nhận và chuẩn hóa upload qua helper dùng chung giữa frontend/backend.",
                "Làm việc với PostgreSQL/TypeORM, DTO validation, REST API, Swagger/OpenAPI và mô hình phân quyền theo vai trò người dùng.",
            ],
        },
        {
            position: "Full-stack Developer",
            company: "MyRoomie - Dự án nhóm",
            duration: "06/2026",
            image: "fpt.png",
            descriptions: [
                "Phát triển chat theo room card và chat ẩn danh tenant, đồng thời tích hợp dữ liệu thật giữa frontend và backend.",
                "Hoàn thiện backend booking/notification, xử lý phản hồi kiểm thử và đồng bộ contract giữa các lớp giao diện - API.",
                "Tích hợp Firebase Analytics tracking, thiết lập leaderboard seeder và phối hợp merge/review các nhánh tính năng.",
                "Làm việc với ứng dụng phân vai tenant/chủ trọ/admin, realtime chat/notification và các tích hợp Firebase.",
            ],
        },
    ],

    achievements: [
        {
            title: "Academic Achievement",
            duration: "2025 - Hiện tại",
            descriptions: [
                "Tham gia và hoàn thành xuất sắc nhiều dự án học thuật Web nâng cao theo mô hình MVC và RESTful API.",
                "Thực hiện thành công các dự án Web ứng dụng Full-stack sử dụng ReactJS, NodeJS trong môi trường học tập nhóm.",
                "Hoàn thành xuất sắc khóa huấn luyện thực tế On-the-Job Training (OJT), nắm vững quy trình phát triển phần mềm chuyên nghiệp.",
                "Đọc hiểu tài liệu kỹ thuật tiếng Anh tốt và có khả năng cộng tác nhóm hiệu quả qua Git workflow.",
            ],
        },
    ],

    certificates: [
        {
            title: "IELTS 5.0",
            description:
                "Chứng chỉ tiếng Anh quốc tế - Có thể đọc/viết tài liệu, email, nghe/nói trong các buổi họp và call với khách hàng",
            icon: "google",
            link: "#",
            year: "2022",
        },
        {
            title: "Git & GitHub Essentials",
            description: "Thành thạo Git workflow, Pull Request, Code Review và quản lý mã nguồn",
            icon: "github",
            link: "#",
            year: "2023",
        },
        {
            title: "Front-End Developer (React)",
            description: "Chứng chỉ lập trình Front-End với ReactJS, Component-based Architecture",
            icon: "hackerrank",
            link: "#",
            year: "2024",
        },
    ],

    blog: [
        {
            slug: "tu-jsp-toi-react-hanh-trinh-tu-mvc-truyen-thong-toi-spa",
            title: "Từ JSP tới React: hành trình từ MVC truyền thống tới SPA",
            excerpt:
                "Ghi chép về quá trình mình chuyển từ tư duy server-rendered (JSP/Servlet) sang client-side rendering với React, những gì học được và những bẫy thường gặp.",
            tags: ["React", "Java", "Architecture"],
            date: "2026-03-12",
            readMinutes: 7,
            cover: "/fpt.png",
            content:
`## Tại sao bài viết này tồn tại
Trong năm hai đại học, dự án đầu tiên mình code là một hệ thống quản lý thư viện bằng **JSP/Servlet**. Năm ba, mình bắt đầu nghiêm túc với **ReactJS**. Sự chuyển dịch không chỉ là về cú pháp — nó là một cú thay đổi tư duy.

## MVC kiểu truyền thống
Với JSP, mỗi request là một vòng đời độc lập: Servlet nhận request → gọi service → query DB → forward về một file \`.jsp\`. Trạng thái sống ở \`HttpSession\`, \`request\`, \`application\`.

> "Server render HTML. Client chỉ là khung kính nhìn vào kết quả."

Điều này giúp dễ tracking nhưng:
- Mỗi action gần như là full reload.
- Logic và view trộn lẫn trong scriptlet.
- Khó tái sử dụng UI giữa các trang.

## SPA với React thay đổi điều gì
Khi sang React, mình phải làm quen với:
- **Component** là đơn vị tái sử dụng.
- **State** sống trong memory client.
- **Routing** là client-side — \`react-router-dom\` quản lý URL mà không reload.

\`\`\`tsx
const [count, setCount] = useState(0);
\`\`\`

Một dòng code, nhưng đứng đằng sau là cả một mô hình render mới: declarative, hook-based, đơn hướng.

## Những bẫy mình đã rơi vào
1. **Quên rằng API là async** — viết \`if (data.length)\` ngay trước khi fetch xong.
2. **State đặt nhầm chỗ** — dùng prop drilling 5 cấp thay vì context.
3. **Re-render quá đà** — không memo những component nặng.

## Kết
JSP cho mình hiểu *server thấy gì*. React cho mình điều khiển *client cảm thấy gì*. Hai góc nhìn này bổ sung cho nhau — và nếu ai hỏi mình nên học cái nào trước, mình sẽ nói: học cái nào *gần với job đầu tiên của bạn* trước, sau đó học cái còn lại.`,
        },
        {
            slug: "thiet-ke-portfolio-voi-css-variables-va-accent-themes",
            title: "Thiết kế portfolio đa-theme với CSS Variables",
            excerpt:
                "Cách mình build hệ thống 4 accent theme + dark/light chỉ với CSS Variables và một context React đơn giản — không cần Tailwind config phức tạp.",
            tags: ["CSS", "Tailwind", "Theming"],
            date: "2026-02-04",
            readMinutes: 5,
            cover: "/dat_img.jpg",
            content:
`## Vấn đề
Portfolio này có **2 chế độ sáng tối × 4 accent** = 8 biến thể. Nếu viết hard-coded class Tailwind cho từng cái thì... thôi khỏi.

## Giải pháp: CSS variables
Đặt một tập biến trong \`:root\`, override trong \`html.dark\` và \`html.accent-*\`. Mọi component chỉ cần đọc \`var(--color-accent)\`.

\`\`\`css
:root { --color-accent: #0891b2; }
html.dark { --color-accent: #06b6d4; }
html.accent-purple { --color-accent: #7c3aed; }
\`\`\`

## React context mỏng
Một context giữ \`theme\` và \`accent\`, gắn class vào \`document.documentElement\` qua \`useEffect\`. Persist bằng \`localStorage\`. Hết.

## Bài học
- **Source of truth là DOM** (class trên \`<html>\`), không phải state React.
- **Đừng inline-style từng nơi** — nó phá compositing và làm code rối.
- **Đặt tên biến rõ ràng**: \`--color-accent\`, \`--color-accent-glow\`, \`--color-accent-soft\` — đọc là biết dùng ở đâu.

> Theming tốt là khi đổi 4 dòng CSS thì cả site đổi, mà không ai phải đụng tay vào component.`,
        },
        {
            slug: "viet-form-lien-he-voi-resend-va-express",
            title: "Form liên hệ tử tế với Resend + Express",
            excerpt:
                "Một form liên hệ không cần Firebase, không cần SendGrid. Chỉ cần một Express endpoint nhỏ và Resend free tier.",
            tags: ["Node.js", "Email", "Backend"],
            date: "2026-01-15",
            readMinutes: 4,
            cover: "/fpt.png",
            content:
`## Tại sao Resend
Free tier hào phóng, API đơn giản, không cần verify domain để test. Cho một trang portfolio cá nhân, đây là điểm vào ngọt nhất.

## Backend ngắn gọn
\`\`\`js
app.post('/api/contact', async (req, res) => {
  const { name, email, subject, message } = req.body;
  await resend.emails.send({
    from: 'portfolio <noreply@yourdomain>',
    to: 'you@gmail.com',
    subject: \`[Portfolio] \${subject}\`,
    html: render({ name, email, message }),
  });
  res.json({ ok: true });
});
\`\`\`

## Validation phía client
Đừng tin form. Check email regex, check độ dài, rate-limit phía server. Một bot 5 phút quét hết các form public.

## Kết
Đây là kiểu API mà mình thích: **nhỏ, làm một việc, làm cho xong**.`,
        },
    ] as BlogPost[],

    playground: [
        {
            slug: "matrix-rain",
            title: "Matrix Rain",
            description: "Hiệu ứng mưa chữ kiểu The Matrix vẽ trên canvas — bấm Ctrl+K trên portfolio rồi gõ 'matrix'.",
            tags: ["Canvas", "Animation"],
            accent: "from-emerald-500 to-cyan-500",
            type: "demo" as const,
        },
        {
            slug: "command-palette",
            title: "Command Palette",
            description: "Bộ điều khiển Ctrl+K kiểu VS Code — search, navigate, đổi theme bằng phím.",
            tags: ["UX", "Keyboard"],
            accent: "from-cyan-500 to-indigo-500",
            type: "tool" as const,
        },
        {
            slug: "accent-themer",
            title: "Live Accent Themer",
            description: "Thử nghiệm chuyển 4 accent themes (cyan/green/purple/amber) ngay tại trang.",
            tags: ["CSS Variables", "Theming"],
            accent: "from-purple-500 to-pink-500",
            type: "experiment" as const,
        },
        {
            slug: "typing-effect",
            title: "Typewriter Roles",
            description: "Hiệu ứng gõ chữ luân phiên các vai trò — viết bằng JS thuần, không lib.",
            tags: ["React", "Hooks"],
            accent: "from-amber-500 to-rose-500",
            type: "demo" as const,
        },
        {
            slug: "color-extractor",
            title: "Hex Picker",
            description: "Một widget nhỏ để picks color và xem nó áp vào UI theo thời gian thực.",
            tags: ["DOM", "Color"],
            accent: "from-sky-500 to-fuchsia-500",
            type: "tool" as const,
        },
        {
            slug: "snake",
            title: "Snake (mini)",
            description: "Bản Snake gọn nhẹ chơi ngay trên trang — vì sao không?",
            tags: ["Game", "Canvas"],
            accent: "from-rose-500 to-orange-500",
            type: "experiment" as const,
        },
    ] as PlaygroundItem[],

    contact: {
        title: "Liên hệ với tôi",
        description:
            "Cảm ơn bạn đã quan tâm đến hồ sơ của tôi. Nếu bạn có bất kỳ câu hỏi hoặc muốn hợp tác, vui lòng gửi email cho tôi. Tôi sẽ phản hồi trong thời gian sớm nhất!",
    },

    footer: "© 2025 Mai Nguyễn Tiến Đạt. All Rights Reserved",
};

export default info;
