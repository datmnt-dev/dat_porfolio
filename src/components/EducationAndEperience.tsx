import React from "react";
import user_info from "../data/userdata";
import ScrollReveal from "./ui/ScrollReveal";

interface ExperienceEvent {
  year: string;
  role: string;
  entity: string;
  summary: string;
  keyContributions: string[];
  technology: string[];
  lesson: string;
}

const experienceEvents: ExperienceEvent[] = [
  {
    year: "2026",
    role: "Full-stack Contributor",
    entity: "ThreadLearn — Dự án Nền tảng Học Lập trình Tương tác",
    summary: "Xây dựng tính năng Monaco Code Editor live sandbox, subscription/PayOS callback và hệ thống quiz attempt.",
    keyContributions: [
      "Tích hợp Monaco Code Editor, live JavaScript sandbox và luồng AI server stream cho Code Lab",
      "Xây dựng entitlement gói premium và xử lý đối soát callback thanh toán PayOS ở backend",
      "Đóng góp 157 commits ở frontend Next.js và 78 commits ở backend NestJS theo thống kê GitHub",
    ],
    technology: ["Next.js 15", "NestJS", "MongoDB", "Redis", "Socket.IO", "Zustand", "PayOS"],
    lesson: "Học được cách đồng bộ trạng thái phức tạp giữa server stream và editor, cùng với tính idempotent khi xử lý webhook thanh toán.",
  },
  {
    year: "2026",
    role: "Full-stack Contributor",
    entity: "AgriLink Vietnam — Hệ sinh thái TMĐT Nông sản",
    summary: "Phát triển tính năng marketplace đa vai trò, bộ lọc sản phẩm, DTO validation và xác thực chứng nhận.",
    keyContributions: [
      "Hoàn thiện marketplace filters, tối ưu responsive và SEO hình ảnh cho luồng sản phẩm",
      "Củng cố ranh giới persistence TypeORM, bảo mật auth cho 7 vai trò người dùng và admin",
      "Đóng góp 38 commits ở frontend và 170 commits ở backend theo contributor API công khai",
    ],
    technology: ["Next.js 15", "NestJS 10", "PostgreSQL", "TypeORM", "Docker", "Swagger"],
    lesson: "Hiểu sâu hơn về việc thiết kế schema quan hệ cho hệ thống nhiều vai trò (RBAC) và quản lý upload tài liệu an toàn.",
  },
  {
    year: "2026",
    role: "Full-stack Contributor",
    entity: "MyRoomie — Nền tảng Ghép Phòng & Bạn Cùng Phòng",
    summary: "Triển khai chat realtime theo room card, đồng bộ API contracts giữa React 19 và ASP.NET Core 8.",
    keyContributions: [
      "Phát triển chat thời gian thực theo room card và chat ẩn danh tenant bằng SignalR",
      "Hoàn thiện backend booking/notification, xử lý phản hồi kiểm thử và đồng bộ API contracts",
      "Tích hợp Firebase Analytics tracking và leaderboard seeder",
    ],
    technology: ["React 19", "TypeScript", "ASP.NET Core 8", "SignalR", "Firestore", "FastAPI"],
    lesson: "Làm chủ việc kết nối duplex realtime giữa client SPA và server .NET cùng cách xử lý reconnect mượt mà khi rớt mạng.",
  },
  {
    year: "2024 - 2025",
    role: "Front-end Lead & Backend Contributor",
    entity: "JobFinder — Nền tảng Tuyển dụng & Tìm việc làm",
    summary: "Xây dựng dashboard ứng viên/nhà tuyển dụng, quy trình quản lý CV và tìm kiếm việc làm thông minh.",
    keyContributions: [
      "Phát triển dashboard admin & job seeker, quản lý CV (PDF) và bộ lọc tìm kiếm việc làm",
      "Cộng tác ở cả frontend ReactJS và backend Spring Boot (141 commits FE, 25 commits BE)",
      "Triển khai xác thực JWT và bảo vệ API theo vai trò người dùng",
    ],
    technology: ["ReactJS", "Tailwind CSS", "Spring Boot", "JWT", "SQL Server", "REST API"],
    lesson: "Rèn luyện kỹ năng lãnh đạo nhóm front-end, thiết kế giao diện responsive và phối hợp chặt chẽ với backend team.",
  },
  {
    year: "2023 - Nay",
    role: "Sinh viên Kỹ thuật Phần mềm (BIT_SE)",
    entity: "FPT University — Đà Nẵng",
    summary: "Hoàn thành chương trình đào tạo chính quy, khóa huấn luyện OJT và các đồ án chuyên ngành phần mềm.",
    keyContributions: [
      "Nắm vững các môn học cốt lõi: OOP, Cấu trúc dữ liệu & Giải thuật, Hệ quản trị CSDL, Mạng máy tính",
      "Hoàn thành On-the-Job Training (OJT), áp dụng quy trình Git workflow và teamwork chuyên nghiệp",
      "Đạt thành tích học tập xuất sắc trong nhiều đồ án phát triển web theo mô hình MVC & REST",
    ],
    technology: ["Java", "C#", "TypeScript", "SQL", "Git", "OOP Architecture"],
    lesson: "Xây dựng nền tảng khoa học máy tính vững chắc giúp học công nghệ mới nhanh chóng và hiểu sâu bản chất hệ thống.",
  },
];

const EducationAndExperience: React.FC = () => {
  return (
    <div className="space-y-16">
      {/* Timeline Section */}
      <div className="space-y-12">
        {experienceEvents.map((event, index) => (
          <ScrollReveal key={index} delay={Math.min(index, 3) * 60}>
            <article
              className="relative grid md:grid-cols-12 gap-6 pb-12 border-b border-[var(--color-border)] last:border-b-0"
            >
              {/* Left: Year & Entity metadata */}
              <div className="md:col-span-4 space-y-1">
                <span className="font-mono text-xs font-semibold text-[var(--color-accent)]">
                  {event.year}
                </span>
                <h3 className="font-display font-bold text-lg text-[var(--color-text)] leading-snug">
                  {event.entity}
                </h3>
                <p className="text-xs font-mono text-[var(--color-subtext)]">
                  {event.role}
                </p>
              </div>

              {/* Right: Summary, Contributions, Tech & Lesson */}
              <div className="md:col-span-8 space-y-4">
                <p className="text-sm text-[var(--color-text)] font-medium leading-relaxed">
                  {event.summary}
                </p>

                <div className="space-y-2">
                  <span className="text-[11px] font-mono uppercase text-[var(--color-subtext)] block">
                    Key Work Delivered:
                  </span>
                  <ul className="space-y-1.5 text-xs text-[var(--color-subtext)] list-disc pl-4 leading-relaxed">
                    {event.keyContributions.map((c, i) => (
                      <li key={i}>{c}</li>
                    ))}
                  </ul>
                </div>

                {/* Stack Used */}
                <div className="pt-2 flex flex-wrap gap-1.5">
                  {event.technology.map((t) => (
                    <span key={t} className="tag">
                      {t}
                    </span>
                  ))}
                </div>

                {/* Lesson Learned */}
                <div className="p-3.5 rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] text-xs text-[var(--color-subtext)] space-y-1">
                  <span className="font-mono font-semibold text-[var(--color-text)] text-[11px] block">
                    Lesson Learned:
                  </span>
                  <p className="leading-relaxed font-sans">{event.lesson}</p>
                </div>
              </div>
            </article>
          </ScrollReveal>
        ))}
      </div>

      {/* Certificates & Credentials Section */}
      <section className="pt-8 space-y-6">
        <ScrollReveal>
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-[var(--color-accent)]">
              Credentials
            </span>
            <h3 className="mt-1 font-display font-bold text-2xl text-[var(--color-text)]">
              Certificates & Achievements
            </h3>
          </div>
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
          {user_info.certificates.map((cert, idx) => (
            <ScrollReveal key={cert.title} delay={idx * 50}>
              <div
                className="card-surface p-5 rounded-2xl flex flex-col justify-between space-y-3"
              >
                <div>
                  <div className="flex items-center justify-between text-xs font-mono text-[var(--color-subtext)] mb-2">
                    <span>{cert.year}</span>
                    <span className="chip !py-0.5 !px-2 text-[9px]">Verified</span>
                  </div>
                  <h4 className="font-display font-bold text-base text-[var(--color-text)]">
                    {cert.title}
                  </h4>
                  <p className="mt-2 text-xs text-[var(--color-subtext)] leading-relaxed">
                    {cert.description}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>
    </div>
  );
};

export default EducationAndExperience;
