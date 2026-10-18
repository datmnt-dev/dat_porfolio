import React from "react";
import { Link } from "react-router-dom";
import { FaArrowRight, FaMapMarkerAlt, FaEnvelope, FaGithub, FaLinkedin, FaDownload } from "react-icons/fa";
import user_info from "../data/userdata";
import { Reveal } from "../motion";

const About: React.FC = () => {
  return (
    <div className="py-12 sm:py-16 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
      {/* Editorial Header */}
      <header className="space-y-4">
        <Reveal direction="right" distance={12} duration={580} delay={0}>
          <span className="text-xs font-mono uppercase tracking-widest text-[var(--color-accent)] block mb-1">
            About / Profile
          </span>
        </Reveal>
        <Reveal direction="up" distance={26} duration={680} delay={60}>
          <h1 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight text-[var(--color-text)]">
            Mai Nguyễn Tiến Đạt
          </h1>
        </Reveal>
        <Reveal direction="up" distance={16} duration={600} delay={120}>
          <p className="text-base sm:text-xl text-[var(--color-subtext)] leading-relaxed max-w-[58ch]">
            Software Engineer định hướng Full-stack & Product Engineering. Thích biến các ý tưởng sản phẩm thành hiện thực với mã nguồn rõ ràng và kiến trúc bền vững.
          </p>
        </Reveal>
      </header>

      {/* Portrait & Introduction Grid */}
      <section className="grid md:grid-cols-12 gap-8 md:gap-12 items-start">
        {/* Editorial Portrait (Enters from left x: -24px, scale .99) */}
        <div className="md:col-span-5 space-y-6">
          <Reveal direction="right" distance={24} scale={0.99} duration={720} delay={60}>
            <div className="relative rounded-3xl overflow-hidden border border-[var(--color-border)] bg-[var(--color-card)] shadow-lg aspect-[4/5]">
              <img
                src={user_info.main.photo}
                alt={user_info.main.name}
                className="w-full h-full object-cover grayscale contrast-110 hover:grayscale-0 transition-all duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 right-4 text-white font-mono text-xs">
                <span className="text-white/80">Software Engineer</span>
                <div className="text-sm font-display font-bold">Mai Nguyen Tien Dat</div>
              </div>
            </div>
          </Reveal>

          {/* Public Contact Details */}
          <Reveal variant="card" distance={16} duration={540} delay={120}>
            <div className="p-5 rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] space-y-3 font-mono text-xs">
              <div className="flex items-center gap-3 text-[var(--color-text)]">
                <FaMapMarkerAlt className="text-[var(--color-accent)] flex-shrink-0" />
                <span>{user_info.main.location}</span>
              </div>
              <div className="flex items-center gap-3 text-[var(--color-text)]">
                <FaEnvelope className="text-[var(--color-accent)] flex-shrink-0" />
                <a href={`mailto:${user_info.main.email}`} className="hover:underline truncate">
                  {user_info.main.email}
                </a>
              </div>
              <div className="flex items-center gap-3 text-[var(--color-text)]">
                <FaGithub className="text-[var(--color-accent)] flex-shrink-0" />
                <a href={user_info.socials.github} target="_blank" rel="noopener noreferrer" className="hover:underline">
                  github.com/datmnt-dev
                </a>
              </div>
              <div className="flex items-center gap-3 text-[var(--color-text)]">
                <FaLinkedin className="text-[var(--color-accent)] flex-shrink-0" />
                <a href={user_info.socials.linkedin} target="_blank" rel="noopener noreferrer" className="hover:underline">
                  LinkedIn Profile
                </a>
              </div>
            </div>
          </Reveal>

          <div className="flex gap-3">
            <a
              href="/CV_MaiNguyenTienDat.pdf"
              download
              className="btn-primary w-full justify-center !text-xs !py-2.5"
            >
              <FaDownload className="text-[10px]" />
              <span>Download CV (PDF)</span>
            </a>
          </div>
        </div>

        {/* Narrative & Engineering Journey (Enters from right x: +20px) */}
        <div className="md:col-span-7">
          <Reveal direction="left" distance={20} duration={680} delay={100}>
            <div className="space-y-8 leading-relaxed text-sm sm:text-base text-[var(--color-subtext)]">
              <div className="space-y-4">
                <h2 className="font-display font-bold text-xl sm:text-2xl text-[var(--color-text)]">
                  Hành trình & Góc nhìn
                </h2>
                <p>
                  Mình hiện là sinh viên năm cuối ngành Kỹ thuật Phần mềm tại FPT University Đà Nẵng.
                  Quá trình học tập và làm việc qua các dự án thực tế đã định hình góc nhìn kỹ thuật của mình:
                  phần mềm không chỉ là đoạn code chạy được, mà là một sản phẩm hoàn chỉnh mà người dùng tin tưởng sử dụng mỗi ngày.
                </p>
                <p>
                  Ở phía frontend, mình yêu thích hệ sinh thái <strong>React & TypeScript</strong> vì khả năng tạo ra các
                  giao diện chặt chẽ, tối ưu hiệu năng và dễ mở rộng khi dự án lớn dần.
                  Ở phía backend, mình làm việc chủ yếu với <strong>ASP.NET Core</strong> và <strong>NestJS</strong> để
                  thiết kế RESTful APIs, phân quyền RBAC, tích hợp cơ sở dữ liệu quan hệ và giải quyết bài toán giao tiếp thời gian thực (realtime).
                </p>
              </div>

              <div className="space-y-4 pt-4 border-t border-[var(--color-border)]">
                <h2 className="font-display font-bold text-xl sm:text-2xl text-[var(--color-text)]">
                  Điều gì thúc đẩy mình?
                </h2>
                <p>
                  Cảm giác tuyệt vời nhất là khi một tính năng phức tạp — từ việc thanh toán tự động,
                  code sandbox thời gian thực, đến thông báo tức thì giữa người dùng — vận hành ổn định và giải quyết đúng vấn đề.
                </p>
                <p>
                  Mình thích làm việc trong môi trường đề cao văn hóa code review thẳng thắn,
                  sẵn sàng pair-programming khi gặp bài toán hóc búa và coi trọng tính bền vững của mã nguồn.
                </p>
              </div>

              <div className="space-y-4 pt-4 border-t border-[var(--color-border)]">
                <h2 className="font-display font-bold text-xl sm:text-2xl text-[var(--color-text)]">
                  Mục tiêu hiện tại
                </h2>
                <p>
                  Mình đang tập trung nâng cao năng lực thiết kế hệ thống phân tán, tối ưu hóa database queries,
                  và tích hợp các dịch vụ AI / semantic search vào sản phẩm thực tế.
                  Đồng thời, mình đang sẵn sàng đón nhận cơ hội việc làm vị trí <strong>Full-stack / Software Engineer (Junior/Fresher)</strong>.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Values & Principles with restrained typography separators */}
      <section className="space-y-8 pt-8 border-t border-[var(--color-border)]">
        <div>
          <Reveal direction="right" distance={12} duration={580} delay={0}>
            <span className="text-xs font-mono uppercase tracking-widest text-[var(--color-accent)] block mb-1">
              How I Work
            </span>
          </Reveal>
          <Reveal direction="up" distance={24} duration={680} delay={60}>
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-[var(--color-text)]">
              Nguyên tắc làm việc
            </h2>
          </Reveal>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {user_info.values.map((v, idx) => (
            <Reveal key={v.title} variant="card" distance={16} duration={540} delay={idx * 70}>
              <div className="p-5 rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] space-y-2">
                <span className="font-mono text-xs font-bold text-[var(--color-accent)]">
                  0{idx + 1}
                </span>
                <h3 className="font-display font-bold text-base text-[var(--color-text)]">
                  {v.title}
                </h3>
                <p className="text-xs text-[var(--color-subtext)] leading-relaxed">
                  {v.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Deep Link Navigation Cards */}
      <section className="grid sm:grid-cols-2 gap-6 pt-4">
        <Reveal variant="card" delay={0}>
          <Link
            to="/experience"
            className="p-6 rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] hover:border-[var(--color-accent)] transition-colors group space-y-2 block"
          >
            <span className="text-xs font-mono text-[var(--color-accent)] uppercase">
              Trajectory
            </span>
            <h3 className="font-display font-bold text-xl text-[var(--color-text)] group-hover:text-[var(--color-accent)] transition-colors flex items-center justify-between">
              <span>Kinh nghiệm & Học vấn</span>
              <FaArrowRight className="text-xs" />
            </h3>
            <p className="text-xs text-[var(--color-subtext)] leading-relaxed">
              Xem chi tiết timeline từng dự án, vai trò đóng góp và bài học kỹ thuật rút ra.
            </p>
          </Link>
        </Reveal>

        <Reveal variant="card" delay={60}>
          <Link
            to="/skills"
            className="p-6 rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] hover:border-[var(--color-accent)] transition-colors group space-y-2 block"
          >
            <span className="text-xs font-mono text-[var(--color-accent)] uppercase">
              Competency
            </span>
            <h3 className="font-display font-bold text-xl text-[var(--color-text)] group-hover:text-[var(--color-accent)] transition-colors flex items-center justify-between">
              <span>Kỹ năng & Công nghệ</span>
              <FaArrowRight className="text-xs" />
            </h3>
            <p className="text-xs text-[var(--color-subtext)] leading-relaxed">
              Xem bảng phân tầng kỹ năng theo bằng chứng thực tế từ mã nguồn và đồ án.
            </p>
          </Link>
        </Reveal>
      </section>
    </div>
  );
};

export default About;
