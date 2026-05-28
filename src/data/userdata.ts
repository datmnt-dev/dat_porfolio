const info = {
    // ============ MAIN DETAILS ============
    main: {
        name: "Mai Nguyễn Tiến Đạt",
        description: "Là người tập trung vào giải quyết vấn đề bằng công nghệ, có tư duy logic và tinh thần cải tiến liên tục. Mong muốn làm việc trong môi trường năng động với các dự án có độ phức tạp cao, nơi tôi có thể áp dụng kiến thức lập trình, học hỏi từ đội ngũ kỹ sư giàu kinh nghiệm và đóng góp vào sự phát triển của sản phẩm. Hướng đến môi trường đề cao hiệu suất, giá trị cá nhân và kết quả thực tế.",
        role: "Front-End Developer",
        photo: "/dat_img.jpg",
        email: "tiendatyyy2005@gmail.com",
        phone: "0935124666",
        birthday: "27/07/2005",
        address: "FPT Plaza 2, Ngũ Hành Sơn, Đà Nẵng",
    },

    // ============ SOCIAL LINKS ============
    socials: {
        twitter: "https://x.com/Mai_dat27",
        github: "https://github.com/dat-21",
        linkedin: "https://www.linkedin.com/in/mai-nguy%E1%BB%85n-ti%E1%BA%BFn-%C4%91%E1%BA%A1t-662a112b6/",
        instagram: "https://www.instagram.com/daw.27.7/",
        facebook: "https://www.facebook.com/mai.dat.270705",
    },

    // ============ SKILLS ============
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
        tools: [
            "Git & GitHub",
            "VS Code",
            "Figma",
            "Postman",
            "Vite",
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

    // ============ PROJECTS ============
    projects: [
        {
            title: "JobFinder",
            description: "JobFinder là nền tảng web kết nối ứng viên và nhà tuyển dụng, hỗ trợ quản lý hồ sơ/CV, tìm kiếm và ứng tuyển việc làm, đăng tin tuyển dụng, theo dõi trạng thái ứng tuyển, phân quyền người dùng và quản trị hệ thống.",
            technologies: "ReactJS, Tailwind CSS, Bootstrap, Framer Motion, Spring Boot, JWT Authentication, SQL Server, MySQL, Git, Postman, Figma",
            github: "https://github.com/SWPGr/fe-jobfinder",
            link: "#",
            duration: "10/2024 - Hiện tại",
            responsibilities: [
                "Phát triển chức năng quản lý CV và hồ sơ người dùng cho ứng viên",
                "Xây dựng tìm kiếm và lọc thông minh cho việc làm và ứng viên theo nhiều tiêu chí",
                "Tích hợp Rich Text Editor cho mô tả công việc và nội dung hồ sơ",
                "Triển khai upload & preview avatar, CV (PDF) cho người dùng",
                "Quản lý trạng thái ứng tuyển và chức năng lưu việc làm",
                "Thiết kế giao diện responsive, component tái sử dụng, cải thiện trải nghiệm người dùng",
                "Xây dựng form xác thực & phân quyền (login/register) với kiểm tra dữ liệu đầu vào",
                "Tối ưu UI với animation mượt bằng Framer Motion"
            ]
        },
        {
            title: "Library Management System",
            description: "Hệ thống quản lý thư viện số hóa các quy trình cốt lõi như quản lý sách, người dùng và mượn–trả, giúp thao tác nhanh hơn, dữ liệu nhất quán và giảm sai sót cho thủ thư/admin và người đọc.",
            technologies: "ReactJS, TypeScript, Vite, Tailwind CSS, React Icons, Node.js, Express.js, MongoDB, Mongoose ODM, RESTful API, Git",
            github: "https://github.com/dat-21/library-management-system",
            link: "#",
            duration: "2025 - Hiện tại",
            responsibilities: [
                "Xây dựng quản lý kho sách & trạng thái khả dụng",
                "Phát triển quản lý người dùng và luồng mượn–trả end-to-end với theo dõi hạn trả",
                "Chuẩn hóa business rules & validation cho dữ liệu mượn–trả",
                "Cải thiện UI/UX: tìm kiếm nhanh, phản hồi rõ ràng cho người dùng",
                "Xử lý edge cases để tăng độ ổn định và đảm bảo UI nhất quán với logic backend"
            ]
        },
        {
            title: "Portfolio Website",
            description: "Trang web Portfolio cá nhân được thiết kế và phát triển nhằm giới thiệu bản thân, kỹ năng, dự án và quá trình học tập, làm việc. Giao diện được tối ưu hiện đại, thân thiện với người dùng và có khả năng mở rộng dễ dàng.",
            technologies: "ReactJS, TypeScript, Vite, Tailwind CSS, Framer Motion, GitHub Pages/Render",
            github: "https://github.com/dat-21/dat_porfolio",
            link: "https://dat-portfolio.onrender.com",
            duration: "2024 - Hiện tại",
            responsibilities: [
                "Thiết kế và phát triển giao diện responsive với Tailwind CSS",
                "Tích hợp dark/light theme với CSS Variables",
                "Xây dựng form liên hệ với email service",
                "Tối ưu hiệu suất và SEO"
            ]
        }
    ],

    // ============ EDUCATION ============
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
                "Sử dụng Git/GitHub thành thạo trong quản lý mã nguồn và Git workflow của đội nhóm."
            ],
            technicalSkills: {
                languages: ["Java", "JavaScript", "SQL"],
                web: ["HTML", "CSS", "ReactJS", "JSP/Servlet"],
                backend: ["NodeJS", "Express"],
                database: ["SQL Server", "MongoDB"],
                tools: ["Git", "MVC", "SDLC", "Agile/Scrum"]
            }
        }
    ],

    // ============ EXPERIENCE ============
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
                "Tối ưu UI với animation mượt bằng Framer Motion"
            ]
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
                "Sử dụng ReactJS, TypeScript, Node.js, Express.js và MongoDB"
            ]
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
                "Hoàn thành On-the-Job Training (OJT), làm quen môi trường làm việc thực tế"
            ]
        }
    ],

    // ============ ACHIEVEMENTS ============
    achievements: [
        {
            title: "Academic Achievement",
            duration: "2025 - Hiện tại",
            descriptions: [
                "Tham gia và hoàn thành xuất sắc nhiều dự án học thuật Web nâng cao theo mô hình MVC và RESTful API.",
                "Thực hiện thành công các dự án Web ứng dụng Full-stack sử dụng ReactJS, NodeJS trong môi trường học tập nhóm.",
                "Hoàn thành xuất sắc khóa huấn luyện thực tế On-the-Job Training (OJT), nắm vững quy trình phát triển phần mềm chuyên nghiệp.",
                "Đọc hiểu tài liệu kỹ thuật tiếng Anh tốt và có khả năng cộng tác nhóm hiệu quả qua Git workflow."
            ]
        }
    ],

    // ============ CERTIFICATES ============
    certificates: [
        {
            title: "IELTS 5.0",
            description: "Chứng chỉ tiếng Anh quốc tế - Có thể đọc/viết tài liệu, email, nghe/nói trong các buổi họp và call với khách hàng",
            icon: "google",
            link: "#",
            year: "2022"
        },
        {
            title: "Git & GitHub Essentials",
            description: "Thành thạo Git workflow, Pull Request, Code Review và quản lý mã nguồn",
            icon: "github",
            link: "#",
            year: "2023"
        },
        {
            title: "Front-End Developer (React)",
            description: "Chứng chỉ lập trình Front-End với ReactJS, Component-based Architecture",
            icon: "hackerrank",
            link: "#",
            year: "2024"
        }
    ],

    // ============ CONTACT ============
    contact: {
        title: "Liên hệ với tôi",
        description: "Cảm ơn bạn đã quan tâm đến hồ sơ của tôi. Nếu bạn có bất kỳ câu hỏi hoặc muốn hợp tác, vui lòng gửi email cho tôi. Tôi sẽ phản hồi trong thời gian sớm nhất!",
    },

    // ============ FOOTER ============
    footer: "© 2025 Mai Nguyễn Tiến Đạt. All Rights Reserved"
}

export default info
