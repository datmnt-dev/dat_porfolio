// =============================================================
// Portfolio data — single source of truth for all pages
// =============================================================

export type ProjectStatus = "in-progress" | "completed" | "archived";
export type ProjectCategory = "web" | "fullstack" | "frontend" | "tooling";

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
    responsibilities: string[];
    highlights?: { label: string; value: string }[];
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
            "Là người tập trung vào giải quyết vấn đề bằng công nghệ, có tư duy logic và tinh thần cải tiến liên tục. Mong muốn làm việc trong môi trường năng động với các dự án có độ phức tạp cao, nơi tôi có thể áp dụng kiến thức lập trình, học hỏi từ đội ngũ kỹ sư giàu kinh nghiệm và đóng góp vào sự phát triển của sản phẩm. Hướng đến môi trường đề cao hiệu suất, giá trị cá nhân và kết quả thực tế.",
        shortBio:
            "Front-End Developer tập trung vào xây dựng giao diện hiện đại, hiệu năng cao và trải nghiệm người dùng tinh tế.",
        role: "Front-End Developer",
        roles: ["Front-End Developer", "ReactJS Specialist", "Software Engineering Student"],
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
        { label: "Năm học CNTT", value: "3+" },
        { label: "Dự án đã build", value: "10+" },
        { label: "Công nghệ", value: "15+" },
        { label: "Coffees/day", value: "∞" },
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
        github: "https://github.com/dat-21",
        linkedin: "https://www.linkedin.com/in/mai-nguy%E1%BB%85n-ti%E1%BA%BFn-%C4%91%E1%BA%A1t-662a112b6/",
        instagram: "https://www.instagram.com/daw.27.7/",
        facebook: "https://www.facebook.com/mai.dat.270705",
    },

    skills: {
        technical: [
            { name: "HTML5 & CSS3", level: 85 },
            { name: "JavaScript", level: 80 },
            { name: "ReactJS", level: 80 },
            { name: "TypeScript", level: 75 },
            { name: "NodeJS & Express", level: 75 },
            { name: "Tailwind CSS", level: 85 },
            { name: "Java (JSP/Servlet)", level: 65 },
            { name: "SQL Server / MongoDB", level: 75 },
        ],
        tools: ["Git & GitHub", "VS Code", "Figma", "Postman", "Vite"],
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
            link: "#",
            duration: "10/2024 - Hiện tại",
            cover: "/jobfinder.ico",
            accent: "from-cyan-500 to-indigo-500",
            status: "in-progress" as ProjectStatus,
            category: "fullstack" as ProjectCategory,
            featured: true,
            responsibilities: [
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
                { label: "Team size", value: "5 thành viên" },
                { label: "Tech", value: "React + Spring Boot" },
            ],
        },
        {
            slug: "library-management",
            title: "Library Management System",
            tagline: "Số hoá quy trình quản lý sách & mượn-trả",
            description:
                "Hệ thống quản lý thư viện số hóa các quy trình cốt lõi như quản lý sách, người dùng và mượn–trả, giúp thao tác nhanh hơn, dữ liệu nhất quán và giảm sai sót cho thủ thư/admin và người đọc.",
            longDescription:
                "Library Management thay thế bảng tính Excel rời rạc bằng một hệ thống web full-stack. Thủ thư có dashboard quản lý kho sách, người dùng và lịch sử mượn-trả với cảnh báo quá hạn. Người đọc tra cứu nhanh, tự gia hạn và xem lịch sử của mình. Backend tách services rõ ràng, validation tập trung và xử lý edge cases được kiểm thử thủ công kỹ.",
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
            github: "https://github.com/dat-21/library-management-system",
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
            github: "https://github.com/dat-21/dat_porfolio",
            link: "https://dat-portfolio.onrender.com",
            duration: "2024 - Hiện tại",
            cover: "/dat_img.jpg",
            accent: "from-fuchsia-500 to-purple-500",
            status: "in-progress" as ProjectStatus,
            category: "frontend" as ProjectCategory,
            featured: true,
            responsibilities: [
                "Thiết kế và phát triển giao diện responsive với Tailwind CSS",
                "Tích hợp dark/light theme với CSS Variables, 4 accent themes",
                "Xây dựng form liên hệ tích hợp Resend (email service)",
                "Triển khai routing đa trang với React Router 7",
                "Tối ưu hiệu suất và accessibility (a11y, reduced motion)",
            ],
            highlights: [
                { label: "Vai trò", value: "Solo Dev" },
                { label: "Pages", value: "10+" },
                { label: "Theme", value: "Dark/Light + 4 accents" },
            ],
        },
    ] as Project[],

    education: [
        {
            school: "FPT University – Đà Nẵng",
            degree: "Cử nhân Công nghệ Thông tin – Kỹ thuật Phần mềm (BIT_SE)",
            duration: "2023 - Hiện tại (Hệ Chính Quy)",
            image: "fpt.png",
            descriptions: [
                "Chuyên ngành Software Engineering, định hướng phát triển ứng dụng Web và phần mềm.",
                "GPA đang tích lũy tốt (đến Kì 7).",
                "Được đào tạo theo mô hình thực hành – dự án – teamwork gắn liền với môi trường doanh nghiệp thực tế.",
                "Đã hoàn thành các học phần nền tảng cốt lõi: Lập trình hướng đối tượng (Java), Cấu trúc dữ liệu & Giải thuật, Cơ sở dữ liệu, Hệ điều hành, Mạng máy tính, Phát triển Web (Java Web, ReactJS, NodeJS).",
                "Tham gia các môn học chuyên sâu về Software Engineering: phân tích yêu cầu, thiết kế hệ thống, kiểm thử phần mềm, kiến trúc phần mềm và quản lý dự án.",
                "Có kiến thức và thực hành UI/UX Design, xây dựng wireframe, prototype và giao diện thân thiện người dùng.",
                "Thực hiện đồ án môn học và dự án nhóm phức tạp: quản lý người dùng, quản lý phòng, Job Finder, hệ thống CRUD, xác thực người dùng, phân trang, làm việc theo mô hình MVC.",
                "Hoàn thành On-the-Job Training (OJT), làm quen môi trường làm việc thực tế, quy trình phát triển phần mềm chuẩn và làm việc nhóm.",
                "Sử dụng Git/GitHub thành thạo trong quản lý mã nguồn và Git workflow của đội nhóm.",
            ],
            technicalSkills: {
                languages: ["Java", "JavaScript", "SQL"],
                web: ["HTML", "CSS", "ReactJS", "JSP/Servlet"],
                backend: ["NodeJS", "Express"],
                database: ["SQL Server", "MongoDB"],
                tools: ["Git", "MVC", "SDLC", "Agile/Scrum"],
            },
        },
    ],

    experience: [
        {
            position: "Front-end Developer",
            company: "Dự án JobFinder",
            duration: "10/2024 - Hiện tại",
            image: "jobfinder.ico",
            descriptions: [
                "Phát triển chức năng quản lý CV và hồ sơ người dùng cho ứng viên",
                "Xây dựng tìm kiếm và lọc thông minh cho việc làm và ứng viên theo nhiều tiêu chí",
                "Tích hợp Rich Text Editor cho mô tả công việc và nội dung hồ sơ",
                "Triển khai upload & preview avatar, CV (PDF) cho người dùng",
                "Quản lý trạng thái ứng tuyển và chức năng lưu việc làm",
                "Thiết kế giao diện responsive, component tái sử dụng với ReactJS và Tailwind CSS",
                "Xây dựng form xác thực & phân quyền (login/register) với kiểm tra dữ liệu đầu vào",
                "Tối ưu UI với animation mượt bằng Framer Motion",
            ],
        },
        {
            position: "Full-stack Developer",
            company: "Dự án Library Management System",
            duration: "2025 - Hiện tại",
            image: "fpt.png",
            descriptions: [
                "Xây dựng quản lý kho sách & trạng thái khả dụng",
                "Phát triển quản lý người dùng và luồng mượn–trả end-to-end với theo dõi hạn trả",
                "Chuẩn hóa business rules & validation cho dữ liệu mượn–trả",
                "Cải thiện UI/UX: tìm kiếm nhanh, phản hồi rõ ràng cho người dùng",
                "Xử lý edge cases để tăng độ ổn định và đảm bảo UI nhất quán với logic backend",
                "Sử dụng ReactJS, TypeScript, Node.js, Express.js và MongoDB",
            ],
        },
        {
            position: "Web Developer - Student",
            company: "FPT University – Đà Nẵng",
            duration: "2023 - Hiện tại",
            image: "fpt.png",
            descriptions: [
                "Tham gia các dự án học tập mô phỏng môi trường làm việc thực tế",
                "Phát triển các hệ thống web theo mô hình MVC sử dụng JSP, Servlet, JDBC và SQL Server",
                "Thực hành với các công nghệ hiện đại như ReactJS, NodeJS, MongoDB",
                "Áp dụng kiến thức từ các môn: Cấu trúc dữ liệu, OOP, Thiết kế Web, Kiểm thử phần mềm",
                "Rèn luyện kỹ năng UI/UX và các kỹ năng mềm như giao tiếp, làm việc nhóm",
                "Hoàn thành On-the-Job Training (OJT), làm quen môi trường làm việc thực tế",
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
