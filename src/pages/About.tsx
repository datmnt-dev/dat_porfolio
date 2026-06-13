import { Link } from "react-router-dom";
import { FaArrowRight, FaDownload, FaMapMarkerAlt, FaEnvelope, FaBirthdayCake, FaLanguage } from "react-icons/fa";
import { HiSparkles, HiOutlineBookOpen, HiOutlineUserGroup, HiOutlineShieldCheck } from "react-icons/hi2";
import user_info from "../data/userdata";
import PageHero from "../components/ui/PageHero";
import SectionHeader from "../components/ui/SectionHeader";

const valueIcons: Record<string, React.ReactNode> = {
  sparkle: <HiSparkles />,
  book: <HiOutlineBookOpen />,
  users: <HiOutlineUserGroup />,
  shield: <HiOutlineShieldCheck />,
};

const About = () => {
  return (
    <div>
      <PageHero
        eyebrow="About me"
        title={
          <>
            Một câu chuyện ngắn <br />
            về <span className="text-gradient">Tien Dat</span>
          </>
        }
        subtitle="Sinh viên Software Engineering, đang biến đam mê thành sản phẩm — từng dòng code một."
      >
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link to="/contact" className="btn-primary">
            Cùng làm việc nhé <FaArrowRight className="text-xs" />
          </Link>
          <a href="/CV_MaiNguyenTienDat.pdf" download className="btn-ghost">
            <FaDownload className="text-xs" />
            CV PDF
          </a>
        </div>
      </PageHero>

      {/* BIO */}
      <section className="max-w-7xl mx-auto px-4 lg:px-8 py-16">
        <div className="grid lg:grid-cols-[1fr,1.4fr] gap-10 items-start">
          {/* Photo + facts */}
          <div className="reveal">
            <div className="card-surface p-5">
              <div className="aspect-[4/5] rounded-2xl overflow-hidden relative">
                <div className="absolute inset-0" style={{ background: "var(--gradient-accent)" }} />
                <img
                  src={user_info.main.photo}
                  alt={user_info.main.name}
                  className="absolute inset-0 w-full h-full object-cover mix-blend-luminosity opacity-90"
                />
              </div>
              <div className="mt-5 space-y-3 text-sm">
                <FactRow Icon={FaEnvelope} label="Email" value={user_info.main.email} />
                <FactRow Icon={FaMapMarkerAlt} label="Sống tại" value={user_info.main.location} />
                <FactRow Icon={FaBirthdayCake} label="Sinh nhật" value={user_info.main.birthday} />
                <FactRow Icon={FaLanguage} label="Ngôn ngữ" value={user_info.main.languages.join(", ")} />
              </div>
            </div>
          </div>

          {/* Story */}
          <div className="reveal reveal-2 prose-custom">
            <h2>Xin chào, mình là Đạt 👋</h2>
            <p>{user_info.main.description}</p>
            <p>
              Mình bắt đầu code khi học cấp ba — không phải vì điểm cao, mà vì lần đầu thấy thứ mình viết
              ra <em>chạy được</em>. Cảm giác đó vẫn còn đến hôm nay, mỗi lần một component mới lên đúng vị trí.
            </p>
            <h3>Mình hợp với ai?</h3>
            <ul>
              <li>Team coi user là trung tâm, không phải feature count.</li>
              <li>Đồng nghiệp sẵn sàng review code thẳng thắn và pair lúc cần.</li>
              <li>Product có độ phức tạp đủ để mình phải đọc — không phải copy-paste là xong.</li>
            </ul>
            <h3>Ngoài giờ làm</h3>
            <p>
              Mình đọc về kiến trúc front-end, thử Figma plugins, và thỉnh thoảng viết note kỹ thuật trên
              <Link to="/blog"> blog</Link>. Cuối tuần mình hay ngồi cà phê ở Đà Nẵng, mở VS Code, làm side-project nhỏ.
            </p>
            <blockquote>
              "Ship something small, ship it often, ship it with care." — phương châm cá nhân.
            </blockquote>
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="max-w-7xl mx-auto px-4 lg:px-8 py-16">
        <SectionHeader
          eyebrow="Values"
          title="Bốn nguyên tắc làm việc"
          description="Đây là cách mình ra quyết định khi không có ai bảo phải làm gì."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {user_info.values.map((v, i) => (
            <div
              key={v.title}
              className="card-surface p-6 reveal"
              style={{ animationDelay: `${0.08 + i * 0.06}s` }}
            >
              <div className="w-12 h-12 rounded-2xl grid place-items-center text-2xl text-[var(--color-accent)] bg-[var(--color-accent-soft)]">
                {valueIcons[v.icon] ?? <HiSparkles />}
              </div>
              <h4 className="mt-4 font-display font-bold">{v.title}</h4>
              <p className="mt-2 text-sm text-[var(--color-subtext)] leading-relaxed">{v.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TIMELINE TEASER */}
      <section className="max-w-7xl mx-auto px-4 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 gap-5">
          <Link to="/experience" className="card-surface p-7 group reveal">
            <div className="text-[var(--color-accent)] text-xs font-code uppercase tracking-wider">/experience</div>
            <h3 className="mt-2 font-display font-bold text-2xl">Học vấn & dự án thật</h3>
            <p className="mt-2 text-sm text-[var(--color-subtext)]">
              Timeline đầy đủ — từ JSP/Servlet đến React full-stack, kèm những thứ mình học được ở mỗi chặng.
            </p>
            <div className="mt-5 inline-flex items-center gap-2 text-sm text-[var(--color-accent)] group-hover:gap-3 transition-all">
              Xem timeline <FaArrowRight className="text-xs" />
            </div>
          </Link>
          <Link to="/skills" className="card-surface p-7 group reveal reveal-1">
            <div className="text-[var(--color-accent)] text-xs font-code uppercase tracking-wider">/skills</div>
            <h3 className="mt-2 font-display font-bold text-2xl">Stack chi tiết</h3>
            <p className="mt-2 text-sm text-[var(--color-subtext)]">
              Breakdown rõ ràng theo nhóm: front-end, back-end, tools, methodologies — cùng mức độ tự tin.
            </p>
            <div className="mt-5 inline-flex items-center gap-2 text-sm text-[var(--color-accent)] group-hover:gap-3 transition-all">
              Xem skills <FaArrowRight className="text-xs" />
            </div>
          </Link>
        </div>
      </section>
    </div>
  );
};

const FactRow: React.FC<{ Icon: React.ComponentType<{ className?: string }>; label: string; value: string }> = ({ Icon, label, value }) => (
  <div className="flex items-start gap-3">
    <Icon className="text-[var(--color-accent)] mt-0.5 flex-shrink-0" />
    <div className="min-w-0">
      <div className="text-[10px] uppercase tracking-wider text-[var(--color-subtext)] font-code">{label}</div>
      <div className="text-[var(--color-text)] truncate">{value}</div>
    </div>
  </div>
);

export default About;
