import React, { useState, FormEvent, useContext } from "react";
import { AppContext } from "../context/AppContext";
import type { AppContextType } from "../types/AppContext";
import { FaSquareXTwitter, FaLinkedin, FaFacebook, FaInstagram, FaPhone } from "react-icons/fa6";
import { MdEmail, MdLocationOn, MdPhone, MdTerminal, MdSend } from "react-icons/md";
import { FaTerminal } from "react-icons/fa";
import { sendEmail } from "../services/emailService";
import user_info from "../data/userdata";

type ContactMode = "gui" | "cli";

const Contact: React.FC = () => {
  const { theme } = useContext<AppContextType>(AppContext);
  const [activeTab, setActiveTab] = useState<ContactMode>("gui");

  // GUI Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [guiStatus, setGuiStatus] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // CLI Wizard State
  const [cliStep, setCliStep] = useState(0); // 0: Idle, 1: Name, 2: Email, 3: Subject, 4: Message, 5: Confirm, 6: Sending, 7: Success
  const [cliInput, setCliInput] = useState("");
  const [cliLogs, setCliLogs] = useState<string[]>([
    "Interactive Contact wizard initiated.",
    "Type 'contact --send' to begin messaging Tien Dat via terminal.",
    "tiendat@portfolio:~$ "
  ]);
  const [cliData, setCliData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  // Handle GUI inputs
  const handleGuiChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleGuiSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setGuiStatus("Sending...");
    setIsLoading(true);

    const result = await sendEmail(formData);

    if (result.success) {
      setGuiStatus("✅ Message sent successfully!");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } else {
      setGuiStatus("❌ Failed to send message. Please check connection.");
    }
    setIsLoading(false);
  };

  // Handle CLI wizard commands
  const appendCliLog = (input: string, output: string[]) => {
    setCliLogs((prev) => [
      ...prev.slice(0, -1),
      `tiendat@portfolio:~$ ${input}`,
      ...output,
      "tiendat@portfolio:~$ "
    ]);
  };

  const handleCliSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const inputVal = cliInput.trim();
    if (!inputVal && cliStep === 0) return;

    if (cliStep === 0) {
      if (inputVal === "contact --send") {
        setCliStep(1);
        setCliLogs((prev) => [
          ...prev.slice(0, -1),
          `tiendat@portfolio:~$ ${inputVal}`,
          "? Nhập tên của bạn: ",
          "tiendat@portfolio:~$ "
        ]);
      } else if (inputVal === "clear") {
        setCliLogs(["tiendat@portfolio:~$ "]);
      } else if (inputVal === "help") {
        appendCliLog(inputVal, [
          "Commands:",
          "  contact --send    Start the messaging wizard",
          "  clear             Clear terminal screen",
          "  exit              Switch back to graphical GUI mode"
        ]);
      } else if (inputVal === "exit") {
        setActiveTab("gui");
      } else {
        appendCliLog(inputVal, [`bash: command not found: ${inputVal}`]);
      }
      setCliInput("");
      return;
    }

    // Step-by-step wizard
    if (cliStep === 1) {
      setCliData((prev) => ({ ...prev, name: inputVal }));
      setCliStep(2);
      setCliLogs((prev) => [
        ...prev.slice(0, -1),
        `tiendat@portfolio:~$ ${inputVal}`,
        `  Name set: ${inputVal}`,
        "? Nhập email của bạn: ",
        "tiendat@portfolio:~$ "
      ]);
    } else if (cliStep === 2) {
      if (!inputVal.includes("@")) {
        setCliLogs((prev) => [
          ...prev.slice(0, -1),
          `tiendat@portfolio:~$ ${inputVal}`,
          "❌ Email không hợp lệ. Vui lòng nhập lại email: ",
          "tiendat@portfolio:~$ "
        ]);
        setCliInput("");
        return;
      }
      setCliData((prev) => ({ ...prev, email: inputVal }));
      setCliStep(3);
      setCliLogs((prev) => [
        ...prev.slice(0, -1),
        `tiendat@portfolio:~$ ${inputVal}`,
        `  Email set: ${inputVal}`,
        "? Nhập tiêu đề liên hệ: ",
        "tiendat@portfolio:~$ "
      ]);
    } else if (cliStep === 3) {
      setCliData((prev) => ({ ...prev, subject: inputVal }));
      setCliStep(4);
      setCliLogs((prev) => [
        ...prev.slice(0, -1),
        `tiendat@portfolio:~$ ${inputVal}`,
        `  Subject set: ${inputVal}`,
        "? Nhập nội dung tin nhắn của bạn: ",
        "tiendat@portfolio:~$ "
      ]);
    } else if (cliStep === 4) {
      const finalData = { ...cliData, message: inputVal };
      setCliData(finalData);
      setCliStep(5);
      setCliLogs((prev) => [
        ...prev.slice(0, -1),
        `tiendat@portfolio:~$ ${inputVal}`,
        `  Message set: ${inputVal}`,
        "",
        "SUMMARY OF MESSAGE:",
        `  From: ${finalData.name} <${finalData.email}>`,
        `  Subject: ${finalData.subject}`,
        `  Message: ${finalData.message}`,
        "",
        "? Gửi tin nhắn này? (y/n): ",
        "tiendat@portfolio:~$ "
      ]);
    } else if (cliStep === 5) {
      const choice = inputVal.toLowerCase();
      if (choice === "y" || choice === "yes") {
        setCliStep(6);
        setCliLogs((prev) => [
          ...prev.slice(0, -1),
          `tiendat@portfolio:~$ ${inputVal}`,
          "Connecting to SMTP relay server...",
          "Sending message payload...",
          "tiendat@portfolio:~$ "
        ]);

        // Send Email API
        const result = await sendEmail(cliData);

        if (result.success) {
          setCliStep(0);
          setCliLogs((prev) => [
            ...prev.slice(0, -1),
            "✅ Gửi tin nhắn thành công! Cảm ơn bạn.",
            "tiendat@portfolio:~$ "
          ]);
        } else {
          setCliStep(0);
          setCliLogs((prev) => [
            ...prev.slice(0, -1),
            "❌ Lỗi: Gửi tin nhắn thất bại. Vui lòng thử lại.",
            "tiendat@portfolio:~$ "
          ]);
        }
      } else {
        setCliStep(0);
        setCliLogs((prev) => [
          ...prev.slice(0, -1),
          `tiendat@portfolio:~$ ${inputVal}`,
          "Wizard cancelled.",
          "tiendat@portfolio:~$ "
        ]);
      }
      setCliData({ name: "", email: "", subject: "", message: "" });
    }
    setCliInput("");
  };

  const handleShortcutClick = (cmd: string) => {
    if (cliStep === 0) {
      handleCommand(cmd);
    } else if (cliStep === 5) {
      setCliInput(cmd);
      // Directly trigger flow next ticks
      setTimeout(() => {
        setCliLogs((prev) => [
          ...prev.slice(0, -1),
          `tiendat@portfolio:~$ ${cmd}`,
          "Connecting to SMTP relay server...",
          "Sending message payload...",
          "tiendat@portfolio:~$ "
        ]);
        sendEmail(cliData).then((result) => {
          setCliStep(0);
          if (result.success) {
            setCliLogs((prev) => [
              ...prev.slice(0, -1),
              "✅ Gửi tin nhắn thành công! Cảm ơn bạn.",
              "tiendat@portfolio:~$ "
            ]);
          } else {
            setCliLogs((prev) => [
              ...prev.slice(0, -1),
              "❌ Lỗi: Gửi tin nhắn thất bại.",
              "tiendat@portfolio:~$ "
            ]);
          }
        });
      }, 50);
    }
  };

  return (
    <section
      id="contact"
      className="py-16 px-4 md:px-8 lg:px-16 bg-[var(--color-bg)] transition-colors duration-500"
    >
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md border border-[var(--color-border)] bg-[var(--color-bg-component)] font-mono text-[10px] text-[var(--color-accent)] mb-4 select-none shadow-sm">
            <FaTerminal className="text-xs" />
            <span>tiendat@portfolio:~$ mail --compose --to=dat</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-code font-bold text-[var(--color-text)]">
            Send Me A <span className="text-[var(--color-accent)]">Message</span>
          </h2>
          <p className="mt-3 text-xs sm:text-sm text-[var(--color-subtext)] max-w-2xl mx-auto font-sans font-light">
            {user_info.contact.description}
          </p>
        </div>

        {/* Unified Layout: Side-by-side Contact Info and Form */}
        <div className="grid lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Direct Contact Info cards */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-6">
            
            {/* Info Cards */}
            <div className="space-y-4">
              
              {/* Email */}
              <a
                href={`mailto:${user_info.main.email}`}
                className="flex items-center gap-4 p-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-component)] hover:border-[var(--color-accent)] transition-all duration-300 group"
              >
                <div className="w-10 h-10 rounded-lg bg-[var(--color-accent)] bg-opacity-10 text-[var(--color-accent)] flex items-center justify-center text-lg flex-shrink-0 group-hover:scale-105 transition-transform">
                  <MdEmail />
                </div>
                <div className="min-w-0">
                  <span className="font-mono text-[9px] text-zinc-400 dark:text-zinc-500 uppercase block">EMAIL ADDRESS</span>
                  <span className="font-code text-xs text-[var(--color-text)] truncate block hover:text-[var(--color-accent)]">
                    {user_info.main.email}
                  </span>
                </div>
              </a>

              {/* Phone */}
              {user_info.main.phone && (
                <a
                  href={`tel:${user_info.main.phone}`}
                  className="flex items-center gap-4 p-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-component)] hover:border-[var(--color-accent)] transition-all duration-300 group"
                >
                  <div className="w-10 h-10 rounded-lg bg-[var(--color-accent)] bg-opacity-10 text-[var(--color-accent)] flex items-center justify-center text-lg flex-shrink-0 group-hover:scale-105 transition-transform">
                    <MdPhone />
                  </div>
                  <div className="min-w-0">
                    <span className="font-mono text-[9px] text-zinc-400 dark:text-zinc-500 uppercase block">PHONE NUMBER</span>
                    <span className="font-code text-xs text-[var(--color-text)] truncate block hover:text-[var(--color-accent)]">
                      {user_info.main.phone}
                    </span>
                  </div>
                </a>
              )}

              {/* Location */}
              {user_info.main.address && (
                <div className="flex items-center gap-4 p-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-component)]">
                  <div className="w-10 h-10 rounded-lg bg-[var(--color-accent)] bg-opacity-10 text-[var(--color-accent)] flex items-center justify-center text-lg flex-shrink-0">
                    <MdLocationOn />
                  </div>
                  <div className="min-w-0">
                    <span className="font-mono text-[9px] text-zinc-400 dark:text-zinc-500 uppercase block">LOCATION</span>
                    <span className="font-code text-xs text-[var(--color-text)] block">
                      {user_info.main.address}
                    </span>
                  </div>
                </div>
              )}

            </div>

            {/* Socials section */}
            <div className="p-5 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-component)]">
              <span className="font-mono text-[10px] text-[var(--color-subtext)] uppercase tracking-wider block mb-4">CONNECT & FOLLOW</span>
              <div className="flex gap-3">
                <a
                  href={user_info.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg border border-[var(--color-border)] bg-[var(--color-card)] hover:bg-[var(--color-accent)] hover:text-white hover:border-[var(--color-accent)] flex items-center justify-center text-[var(--color-text)] transition-all duration-300"
                  title="GitHub"
                >
                  <FaSquareXTwitter size={18} />
                </a>
                <a
                  href={user_info.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg border border-[var(--color-border)] bg-[var(--color-card)] hover:bg-[var(--color-accent)] hover:text-white hover:border-[var(--color-accent)] flex items-center justify-center text-[var(--color-text)] transition-all duration-300"
                  title="LinkedIn"
                >
                  <FaLinkedin size={18} />
                </a>
                <a
                  href={user_info.socials.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg border border-[var(--color-border)] bg-[var(--color-card)] hover:bg-[var(--color-accent)] hover:text-white hover:border-[var(--color-accent)] flex items-center justify-center text-[var(--color-text)] transition-all duration-300"
                  title="Facebook"
                >
                  <FaFacebook size={18} />
                </a>
                <a
                  href={user_info.socials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg border border-[var(--color-border)] bg-[var(--color-card)] hover:bg-[var(--color-accent)] hover:text-white hover:border-[var(--color-accent)] flex items-center justify-center text-[var(--color-text)] transition-all duration-300"
                  title="Instagram"
                >
                  <FaInstagram size={18} />
                </a>
              </div>
            </div>

          </div>

          {/* Right Column: Dual CLI/GUI Form panel */}
          <div className="lg:col-span-7 flex flex-col min-h-[420px]">
            <div className="editor-window flex-1 flex flex-col border border-zinc-800 bg-[#0d1117] text-[#c9d1d9] rounded-xl shadow-2xl relative overflow-hidden">
              
              {/* Form Tab bar */}
              <div className="flex bg-[#161b22] border-b border-[#21262d] select-none">
                <button
                  onClick={() => setActiveTab("gui")}
                  className={`px-4 py-2 border-r border-[#21262d] font-mono text-[10px] flex items-center gap-1.5 cursor-pointer transition-colors ${
                    activeTab === "gui"
                      ? "bg-[#0d1117] text-white border-t border-t-[var(--color-accent)]"
                      : "text-[#8b949e] hover:bg-[#0d1117] hover:text-white"
                  }`}
                >
                  <MdSend className="text-xs text-sky-500" />
                  <span>Graphical GUI Form</span>
                </button>
                <button
                  onClick={() => setActiveTab("cli")}
                  className={`px-4 py-2 border-r border-[#21262d] font-mono text-[10px] flex items-center gap-1.5 cursor-pointer transition-colors ${
                    activeTab === "cli"
                      ? "bg-[#0d1117] text-white border-t border-t-[var(--color-accent)]"
                      : "text-[#8b949e] hover:bg-[#0d1117] hover:text-white"
                  }`}
                >
                  <MdTerminal className="text-xs text-emerald-500" />
                  <span>Terminal CLI wizard</span>
                </button>
              </div>

              {/* GUI Form Rendering */}
              {activeTab === "gui" && (
                <form onSubmit={handleGuiSubmit} className="flex-1 p-6 space-y-4 flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleGuiChange}
                          placeholder="Your Name"
                          required
                          className="w-full p-2.5 rounded-lg border border-[#21262d] bg-[#070b12] text-xs font-mono text-white placeholder:text-zinc-600 focus:outline-none focus:ring-1 focus:ring-[var(--color-accent)] focus:border-transparent transition-all"
                        />
                      </div>
                      <div>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleGuiChange}
                          placeholder="Your Email"
                          required
                          className="w-full p-2.5 rounded-lg border border-[#21262d] bg-[#070b12] text-xs font-mono text-white placeholder:text-zinc-600 focus:outline-none focus:ring-1 focus:ring-[var(--color-accent)] focus:border-transparent transition-all"
                        />
                      </div>
                    </div>
                    <div>
                      <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleGuiChange}
                        placeholder="Subject"
                        className="w-full p-2.5 rounded-lg border border-[#21262d] bg-[#070b12] text-xs font-mono text-white placeholder:text-zinc-600 focus:outline-none focus:ring-1 focus:ring-[var(--color-accent)] focus:border-transparent transition-all"
                      />
                    </div>
                    <div>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleGuiChange}
                        rows={4}
                        placeholder="Write your message here..."
                        required
                        className="w-full p-2.5 rounded-lg border border-[#21262d] bg-[#070b12] text-xs font-mono text-white placeholder:text-zinc-600 focus:outline-none focus:ring-1 focus:ring-[var(--color-accent)] focus:border-transparent transition-all resize-none"
                      />
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full py-2.5 rounded-lg bg-[var(--color-accent)] hover:opacity-95 text-white font-mono text-xs font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-[var(--color-accent-glow)]"
                    >
                      {isLoading ? (
                        <>
                          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                          <span>Sending...</span>
                        </>
                      ) : (
                        <>
                          <MdSend className="text-sm" />
                          <span>./send-email.sh</span>
                        </>
                      )}
                    </button>
                    {guiStatus && (
                      <p className={`mt-3 text-center text-[10px] font-mono ${guiStatus.includes("✅") ? "text-green-400" : "text-red-400"}`}>
                        {guiStatus}
                      </p>
                    )}
                  </div>
                </form>
              )}

              {/* CLI Form Rendering */}
              {activeTab === "cli" && (
                <div className="flex-1 p-4 bg-[#05070c] flex flex-col justify-between font-mono text-[10px]">
                  
                  {/* CLI Output Logs */}
                  <div className="flex-grow overflow-y-auto mb-4 custom-scrollbar max-h-56">
                    {cliLogs.map((log, idx) => (
                      <div key={idx} className="leading-5">
                        {log.startsWith("tiendat@portfolio:~$") ? (
                          <span>
                            <span className="text-cyan-400 font-bold">tiendat@portfolio:~$</span>{" "}
                            <span className="text-white">{log.substring(21)}</span>
                          </span>
                        ) : log.startsWith("?") ? (
                          <span className="text-yellow-400 font-semibold">{log}</span>
                        ) : log.startsWith("✅") || log.startsWith("  Name set") || log.startsWith("  Email set") || log.startsWith("  Subject set") || log.startsWith("  Message set") ? (
                          <span className="text-green-400">{log}</span>
                        ) : (
                          <span className="text-zinc-400">{log}</span>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Quick CLI actions */}
                  <div className="space-y-3">
                    <div className="flex gap-2 flex-wrap">
                      {cliStep === 0 && (
                        <>
                          <button
                            type="button"
                            onClick={() => handleShortcutClick("contact --send")}
                            className="px-2 py-0.5 rounded border border-zinc-700 bg-zinc-800 text-[8px] text-zinc-400 hover:text-white cursor-pointer"
                          >
                            [Start wizard]
                          </button>
                          <button
                            type="button"
                            onClick={() => handleShortcutClick("help")}
                            className="px-2 py-0.5 rounded border border-zinc-700 bg-zinc-800 text-[8px] text-zinc-400 hover:text-white cursor-pointer"
                          >
                            [Help]
                          </button>
                        </>
                      )}
                      {cliStep === 5 && (
                        <>
                          <button
                            type="button"
                            onClick={() => handleShortcutClick("y")}
                            className="px-2 py-0.5 rounded border border-green-700 bg-green-950 text-[8px] text-green-400 hover:text-green-200 cursor-pointer"
                          >
                            [y] Send Message
                          </button>
                          <button
                            type="button"
                            onClick={() => handleShortcutClick("n")}
                            className="px-2 py-0.5 rounded border border-red-700 bg-red-950 text-[8px] text-red-400 hover:text-red-200 cursor-pointer"
                          >
                            [n] Cancel
                          </button>
                        </>
                      )}
                    </div>

                    {/* Input Console Bar */}
                    <form onSubmit={handleCliSubmit} className="border-t border-[#21262d] pt-2 flex items-center">
                      <span className="text-cyan-400 font-bold mr-1.5 select-none">tiendat@portfolio:~$</span>
                      <input
                        type="text"
                        value={cliInput}
                        onChange={(e) => setCliInput(e.target.value)}
                        placeholder={
                          cliStep === 0
                            ? "type contact --send or exit..."
                            : cliStep === 5
                              ? "type y or n..."
                              : "type your answer..."
                        }
                        className="flex-grow py-1 text-[10px] bg-transparent text-white border-none outline-none placeholder:text-zinc-700 font-mono"
                      />
                    </form>
                  </div>

                </div>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default Contact;
