import React, { useState, FormEvent } from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa6";
import { MdEmail, MdLocationOn, MdSend } from "react-icons/md";
import { sendEmail } from "../services/emailService";
import user_info from "../data/userdata";
import ScrollReveal from "./ui/ScrollReveal";

const CONTACT_LIMITS = {
  nameMin: 2,
  nameMax: 80,
  subjectMax: 120,
  messageMin: 10,
  messageMax: 2000,
};

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const name = formData.name.trim();
    const subject = formData.subject.trim();
    const message = formData.message.trim();

    if (name.length < CONTACT_LIMITS.nameMin) {
      setStatus(`Tên người gửi cần ít nhất ${CONTACT_LIMITS.nameMin} ký tự.`);
      return;
    }

    if (subject.length > CONTACT_LIMITS.subjectMax) {
      setStatus(`Tiêu đề không được vượt quá ${CONTACT_LIMITS.subjectMax} ký tự.`);
      return;
    }

    if (message.length < CONTACT_LIMITS.messageMin) {
      setStatus(`Nội dung tin nhắn cần ít nhất ${CONTACT_LIMITS.messageMin} ký tự.`);
      return;
    }

    setStatus("Đang gửi tin nhắn...");
    setIsLoading(true);

    const result = await sendEmail(formData);

    if (result.success) {
      setStatus("Cảm ơn bạn! Tin nhắn đã được gửi thành công. Mình sẽ phản hồi sớm.");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } else {
      setStatus(result.message || "Không thể gửi email lúc này. Bạn có thể gửi trực tiếp qua email cá nhân bên cạnh.");
    }
    setIsLoading(false);
  };

  return (
    <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-start">
      {/* Left Column: Direct channels (Privacy-cleaned) */}
      <div className="lg:col-span-5">
        <ScrollReveal delay={0}>
          <div className="space-y-6">
        <div className="space-y-3">
          <h2 className="font-display font-bold text-2xl text-[var(--color-text)]">
            Thông tin liên hệ
          </h2>
          <p className="text-sm text-[var(--color-subtext)] leading-relaxed">
            Mình luôn sẵn sàng trao đổi về cơ hội việc làm, dự án hợp tác hoặc bất kỳ câu hỏi kỹ thuật nào.
          </p>
        </div>

        {/* Channels */}
        <div className="space-y-3 font-mono text-xs">
          {/* Email */}
          <a
            href={`mailto:${user_info.main.email}`}
            className="card-surface p-4 rounded-xl flex items-center gap-3.5 group hover:border-[var(--color-accent)] transition-colors"
          >
            <div className="w-9 h-9 rounded-lg bg-[var(--color-accent-soft)] text-[var(--color-accent)] grid place-items-center text-base flex-shrink-0">
              <MdEmail />
            </div>
            <div className="min-w-0">
              <span className="text-[10px] uppercase text-[var(--color-subtext)] block">Email</span>
              <span className="text-[var(--color-text)] group-hover:text-[var(--color-accent)] transition-colors truncate block">
                {user_info.main.email}
              </span>
            </div>
          </a>

          {/* Location (Cleaned: Da Nang, Vietnam) */}
          <div className="card-surface p-4 rounded-xl flex items-center gap-3.5">
            <div className="w-9 h-9 rounded-lg bg-[var(--color-accent-soft)] text-[var(--color-accent)] grid place-items-center text-base flex-shrink-0">
              <MdLocationOn />
            </div>
            <div>
              <span className="text-[10px] uppercase text-[var(--color-subtext)] block">Location</span>
              <span className="text-[var(--color-text)] block">
                {user_info.main.location}
              </span>
            </div>
          </div>

          {/* GitHub */}
          <a
            href={user_info.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            className="card-surface p-4 rounded-xl flex items-center gap-3.5 group hover:border-[var(--color-accent)] transition-colors"
          >
            <div className="w-9 h-9 rounded-lg bg-[var(--color-accent-soft)] text-[var(--color-accent)] grid place-items-center text-base flex-shrink-0">
              <FaGithub />
            </div>
            <div className="min-w-0">
              <span className="text-[10px] uppercase text-[var(--color-subtext)] block">GitHub</span>
              <span className="text-[var(--color-text)] group-hover:text-[var(--color-accent)] transition-colors truncate block">
                github.com/datmnt-dev
              </span>
            </div>
          </a>

          {/* LinkedIn */}
          <a
            href={user_info.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="card-surface p-4 rounded-xl flex items-center gap-3.5 group hover:border-[var(--color-accent)] transition-colors"
          >
            <div className="w-9 h-9 rounded-lg bg-[var(--color-accent-soft)] text-[var(--color-accent)] grid place-items-center text-base flex-shrink-0">
              <FaLinkedin />
            </div>
            <div className="min-w-0">
              <span className="text-[10px] uppercase text-[var(--color-subtext)] block">LinkedIn</span>
              <span className="text-[var(--color-text)] group-hover:text-[var(--color-accent)] transition-colors truncate block">
                Mai Nguyễn Tiến Đạt
              </span>
            </div>
          </a>
        </div>
          </div>
        </ScrollReveal>
      </div>

      {/* Right Column: Clean Form */}
      <div className="lg:col-span-7">
        <ScrollReveal delay={90}>
          <form
          onSubmit={handleSubmit}
          className="p-6 sm:p-8 rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] space-y-5"
        >
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label htmlFor="name" className="text-xs font-mono text-[var(--color-subtext)] block">
                Họ và tên *
              </label>
              <input
                id="name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Nguyễn Văn A"
                required
                minLength={CONTACT_LIMITS.nameMin}
                maxLength={CONTACT_LIMITS.nameMax}
                className="w-full px-3.5 py-2.5 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] text-sm text-[var(--color-text)] placeholder:text-[var(--color-muted)] focus:outline-none focus:border-[var(--color-accent)] transition-colors"
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="email" className="text-xs font-mono text-[var(--color-subtext)] block">
                Email liên hệ *
              </label>
              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="email@example.com"
                required
                className="w-full px-3.5 py-2.5 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] text-sm text-[var(--color-text)] placeholder:text-[var(--color-muted)] focus:outline-none focus:border-[var(--color-accent)] transition-colors"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label htmlFor="subject" className="text-xs font-mono text-[var(--color-subtext)] block">
              Tiêu đề trao đổi
            </label>
            <input
              id="subject"
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="Trao đổi cơ hội việc làm / Hợp tác dự án"
              maxLength={CONTACT_LIMITS.subjectMax}
              className="w-full px-3.5 py-2.5 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] text-sm text-[var(--color-text)] placeholder:text-[var(--color-muted)] focus:outline-none focus:border-[var(--color-accent)] transition-colors"
            />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="message" className="text-xs font-mono text-[var(--color-subtext)] block">
              Nội dung tin nhắn *
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={5}
              placeholder="Chia sẻ ngắn gọn yêu cầu hoặc ý tưởng của bạn..."
              required
              minLength={CONTACT_LIMITS.messageMin}
              maxLength={CONTACT_LIMITS.messageMax}
              className="w-full px-3.5 py-2.5 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] text-sm text-[var(--color-text)] placeholder:text-[var(--color-muted)] focus:outline-none focus:border-[var(--color-accent)] transition-colors resize-none"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className="btn-primary w-full justify-center !py-2.5 !text-xs cursor-pointer disabled:opacity-50"
            >
              {isLoading ? (
                <span>Đang gửi...</span>
              ) : (
                <>
                  <MdSend />
                  <span>Gửi tin nhắn</span>
                </>
              )}
            </button>

            {status && (
              <p className="mt-3 text-center text-xs font-mono text-[var(--color-subtext)]">
                {status}
              </p>
            )}
          </div>
        </form>
        </ScrollReveal>
      </div>
    </div>
  );
};

export default Contact;
