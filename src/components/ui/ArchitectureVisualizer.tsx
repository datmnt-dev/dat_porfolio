import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaServer,
  FaDatabase,
  FaCode,
  FaNetworkWired,
  FaArrowRight,
  FaCheckCircle,
  FaBolt,
  FaShieldAlt,
  FaLayerGroup,
  FaCopy,
} from "react-icons/fa";

interface ArchitectureNode {
  id: string;
  name: string;
  category: "client" | "gateway" | "backend" | "data";
  categoryLabel: string;
  tagline: string;
  description: string;
  pattern: string;
  projectSlug?: string;
  projectName?: string;
  specs: { label: string; value: string }[];
  codeSnippet: {
    language: string;
    filename: string;
    code: string;
  };
}

const ARCHITECTURE_NODES: ArchitectureNode[] = [
  {
    id: "react19",
    name: "React 19 & TypeScript",
    category: "client",
    categoryLabel: "Client Tier",
    tagline: "High-performance SPA with concurrent rendering",
    description:
      "Tầng giao diện SPA sử dụng React 19 kết hợp TypeScript nghiêm ngặt, Vite bundler và Tailwind CSS cho tốc độ render tối ưu, tách biệt component tái sử dụng và responsive mượt mà.",
    pattern: "Component-Driven Architecture & Custom Hooks",
    projectSlug: "myroomie",
    projectName: "MyRoomie",
    specs: [
      { label: "Rendering", value: "Client SPA / Vite 7" },
      { label: "State Pattern", value: "React Context & Custom Hooks" },
      { label: "Type Safety", value: "Strict TypeScript ~5.9" },
    ],
    codeSnippet: {
      language: "typescript",
      filename: "useRealtimeRoom.ts",
      code: `// React 19 Custom Hook for Realtime Room Chat
export const useRealtimeRoom = (roomId: string) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const hubRef = useRef<HubConnection | null>(null);

  useEffect(() => {
    const hub = new HubConnectionBuilder()
      .withUrl(\`/hubs/room?roomId=\${roomId}\`)
      .withAutomaticReconnect()
      .build();

    hub.on("ReceiveMessage", (msg: ChatMessage) => {
      setMessages((prev) => [...prev, msg]);
    });

    hub.start().catch(console.error);
    return () => { hub.stop(); };
  }, [roomId]);

  return { messages };
};`,
    },
  },
  {
    id: "signalr",
    name: "SignalR & Gateway Hub",
    category: "gateway",
    categoryLabel: "Realtime Gateway",
    tagline: "Bi-directional WebSocket streaming & JWT validation",
    description:
      "Cổng giao tiếp thời gian thực SignalR Hub hỗ trợ duplex communication giữa client và backend. Xử lý heartbeat, quản lý room channels và tích hợp xác thực JWT bảo vệ luồng dữ liệu.",
    pattern: "WebSocket Duplex Hub & Channel Multiplexing",
    projectSlug: "myroomie",
    projectName: "MyRoomie",
    specs: [
      { label: "Protocol", value: "WebSocket / Long Polling Fallback" },
      { label: "Latency", value: "< 25ms avg" },
      { label: "Auth", value: "Bearer Token in Query/Header" },
    ],
    codeSnippet: {
      language: "csharp",
      filename: "RoomChatHub.cs",
      code: `[Authorize]
public class RoomChatHub : Hub
{
    private readonly IChatService _chatService;
    public RoomChatHub(IChatService chatService) => _chatService = chatService;

    public async Task JoinRoom(string roomId)
    {
        await Groups.AddToGroupAsync(Context.ConnectionId, roomId);
        await Clients.Group(roomId).SendAsync("UserJoined", Context.UserIdentifier);
    }

    public async Task SendMessage(string roomId, string content)
    {
        var msg = await _chatService.SaveMessageAsync(roomId, Context.UserIdentifier, content);
        await Clients.Group(roomId).SendAsync("ReceiveMessage", msg);
    }
}`,
    },
  },
  {
    id: "dotnet8",
    name: "ASP.NET Core 8 & Clean Arch",
    category: "backend",
    categoryLabel: "Core Backend",
    tagline: "High-throughput RESTful services & business logic",
    description:
      "Dịch vụ backend xây dựng trên .NET 8 (C#) áp dụng Clean Architecture, tách biệt rõ Domain, Application, Infrastructure và Presentation, đảm bảo API dễ mở rộng và dễ bảo trì.",
    pattern: "Clean Architecture + CQRS / Repository Pattern",
    projectSlug: "myroomie",
    projectName: "MyRoomie",
    specs: [
      { label: "Framework", value: "ASP.NET Core .NET 8" },
      { label: "Architecture", value: "Clean Architecture (Layers)" },
      { label: "Documentation", value: "Swagger / OpenAPI 3.0" },
    ],
    codeSnippet: {
      language: "csharp",
      filename: "BookingService.cs",
      code: `// Application Layer: Booking Command Handler
public class CreateBookingCommandHandler : IRequestHandler<CreateBookingCommand, BookingResult>
{
    private readonly IBookingRepository _bookingRepo;
    private readonly INotificationService _notifier;

    public async Task<BookingResult> Handle(CreateBookingCommand request, CancellationToken ct)
    {
        var booking = Booking.Create(request.TenantId, request.RoomId, request.CheckInDate);
        await _bookingRepo.AddAsync(booking, ct);
        await _notifier.SendBookingAlertAsync(booking.LandlordId, booking.Id);
        return BookingResult.Success(booking.Id);
    }
}`,
    },
  },
  {
    id: "springboot",
    name: "Spring Boot & JWT Auth",
    category: "backend",
    categoryLabel: "Core Backend",
    tagline: "Enterprise Grade Java Backend with 166 GitHub commits",
    description:
      "Hệ thống backend của nền tảng tuyển dụng JobFinder, xử lý luồng xác thực đa vai trò (Job Seeker / Employer / Admin), quản lý tin tuyển dụng và tìm kiếm thông minh.",
    pattern: "Layered MVC + Spring Security + JWT Filters",
    projectSlug: "jobfinder",
    projectName: "JobFinder",
    specs: [
      { label: "Engine", value: "Java Spring Boot 3" },
      { label: "Security", value: "Spring Security 6 + JWT RBAC" },
      { label: "Team Footprint", value: "166 GitHub Commits" },
    ],
    codeSnippet: {
      language: "java",
      filename: "JwtAuthenticationFilter.java",
      code: `@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {
    @Autowired private JwtTokenProvider tokenProvider;
    @Autowired private CustomUserDetailsService userDetailsService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, 
                                    HttpServletResponse response, 
                                    FilterChain filterChain) throws ServletException, IOException {
        String jwt = getJwtFromRequest(request);
        if (StringUtils.hasText(jwt) && tokenProvider.validateToken(jwt)) {
            String username = tokenProvider.getUsernameFromJWT(jwt);
            UserDetails userDetails = userDetailsService.loadUserByUsername(username);
            UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken(
                userDetails, null, userDetails.getAuthorities()
            );
            SecurityContextHolder.getContext().setAuthentication(auth);
        }
        filterChain.doFilter(request, response);
    }
}`,
    },
  },
  {
    id: "database",
    name: "PostgreSQL & Cloud Firestore",
    category: "data",
    categoryLabel: "Persistence & Cloud",
    tagline: "Hybrid ACID transactions & NoSQL realtime listener",
    description:
      "Kết hợp cơ sở dữ liệu quan hệ (PostgreSQL / SQL Server) cho dữ liệu có cấu trúc cao (tài khoản, hóa đơn, booking) và NoSQL (Cloud Firestore) cho các thực thể realtime phản hồi tức thì.",
    pattern: "Polyglot Persistence + Database Indexing",
    projectSlug: "myroomie",
    projectName: "MyRoomie & JobFinder",
    specs: [
      { label: "Relational", value: "PostgreSQL / SQL Server" },
      { label: "Realtime NoSQL", value: "Google Cloud Firestore" },
      { label: "ORM", value: "Entity Framework Core / JPA" },
    ],
    codeSnippet: {
      language: "sql",
      filename: "schema_sample.sql",
      code: `-- Relational Schema with Foreign Keys & B-Tree Indexes
CREATE TABLE bookings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id VARCHAR(64) NOT NULL,
    room_id UUID NOT NULL REFERENCES rooms(id) ON DELETE RESTRICT,
    status VARCHAR(20) DEFAULT 'PENDING' CHECK (status IN ('PENDING', 'CONFIRMED', 'CANCELLED')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_bookings_tenant ON bookings(tenant_id);
CREATE INDEX idx_bookings_status ON bookings(status);`,
    },
  },
];

const categoryIcons = {
  client: <FaCode className="text-cyan-400" />,
  gateway: <FaNetworkWired className="text-purple-400" />,
  backend: <FaServer className="text-emerald-400" />,
  data: <FaDatabase className="text-amber-400" />,
};

const ArchitectureVisualizer: React.FC = () => {
  const [activeNodeId, setActiveNodeId] = useState<string>("signalr");
  const [activeTab, setActiveTab] = useState<"code" | "specs">("code");
  const [copied, setCopied] = useState(false);

  const activeNode =
    ARCHITECTURE_NODES.find((n) => n.id === activeNodeId) || ARCHITECTURE_NODES[0];

  const handleCopyCode = () => {
    navigator.clipboard.writeText(activeNode.codeSnippet.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="architecture" className="max-w-7xl mx-auto px-4 lg:px-8 py-20">
      {/* Section Title */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full text-[11px] font-code bg-[var(--color-accent-soft)] text-[var(--color-accent)] border border-[rgba(var(--color-accent-rgb),0.2)] mb-3">
            <span className="w-2 h-2 rounded-full bg-[var(--color-accent)] animate-pulse" />
            Vercel-Style System Flow
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-[var(--color-text)] tracking-tight">
            Kiến trúc Hệ thống & <span className="text-gradient">Engineering Flow</span>
          </h2>
          <p className="mt-2 text-sm sm:text-base text-[var(--color-subtext)] max-w-2xl">
            Khám phá kiến trúc Full-stack end-to-end tôi thiết kế và triển khai: từ React 19 ở Client qua Realtime SignalR Gateway đến .NET 8 / Spring Boot và cơ sở dữ liệu.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start md:self-end text-xs font-code text-[var(--color-subtext)]">
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
          <span>Interactive Click-to-Inspect</span>
        </div>
      </div>

      {/* Main Container - IDE Window Style */}
      <div className="ide-window overflow-hidden">
        {/* Titlebar */}
        <div className="ide-titlebar">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-green-500/80 inline-block" />
            <span className="ml-2 text-xs text-[var(--color-subtext)] hidden sm:inline">
              arch-visualizer: ~/architecture/fullstack-pipeline.flow
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-[10px] text-emerald-400 font-mono hidden md:inline">
              ● All Systems Operational
            </span>
            <div className="ide-badge text-[10px]">
              <FaBolt className="text-[9px]" /> Fullstack Engine
            </div>
          </div>
        </div>

        {/* Content Layout */}
        <div className="grid lg:grid-cols-12 gap-0">
          {/* Left: Architecture Diagram Nodes Flow (7 cols) */}
          <div className="lg:col-span-7 p-6 sm:p-8 border-b lg:border-b-0 lg:border-r border-[var(--ide-border)] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="text-xs font-code text-[var(--color-subtext)] uppercase tracking-wider">
                  Data Pipeline / Select a Node
                </span>
                <span className="text-xs text-[var(--color-accent)] font-code">
                  Active: {activeNode.name}
                </span>
              </div>

              {/* Connected Flow Cards */}
              <div className="space-y-4">
                {ARCHITECTURE_NODES.map((node, index) => {
                  const isActive = node.id === activeNodeId;
                  return (
                    <div key={node.id} className="relative">
                      {/* Vertical connector line */}
                      {index < ARCHITECTURE_NODES.length - 1 && (
                        <div
                          className="absolute left-6 top-14 w-0.5 h-6 z-0"
                          style={{
                            background: isActive
                              ? "var(--color-accent)"
                              : "var(--ide-border)",
                            opacity: isActive ? 0.8 : 0.4,
                          }}
                        />
                      )}

                      <button
                        onClick={() => setActiveNodeId(node.id)}
                        className={`w-full text-left p-4 rounded-xl transition-all relative z-10 flex items-center justify-between border ${
                          isActive
                            ? "border-[var(--color-accent)] bg-[rgba(var(--color-accent-rgb),0.07)] shadow-lg shadow-[rgba(var(--color-accent-rgb),0.1)] translate-x-1"
                            : "border-[var(--ide-border)] bg-[var(--color-bg-component)]/50 hover:bg-[var(--color-bg-component)] hover:border-[var(--color-subtext)]/30"
                        }`}
                      >
                        <div className="flex items-center gap-3.5 min-w-0">
                          <div
                            className={`w-10 h-10 rounded-xl grid place-items-center text-lg flex-shrink-0 transition-transform ${
                              isActive
                                ? "scale-110 shadow-md ring-2 ring-[var(--color-accent)] bg-[var(--color-card)]"
                                : "bg-[var(--color-card)] opacity-80"
                            }`}
                          >
                            {categoryIcons[node.category]}
                          </div>

                          <div className="min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="text-[10px] font-code uppercase tracking-wider text-[var(--color-subtext)]">
                                {node.categoryLabel}
                              </span>
                              {node.projectName && (
                                <span className="text-[9px] font-code px-1.5 py-0.2 rounded bg-white/5 border border-white/10 text-[var(--color-accent)] truncate">
                                  {node.projectName}
                                </span>
                              )}
                            </div>
                            <h4
                              className={`font-display font-bold text-sm sm:text-base truncate ${
                                isActive
                                  ? "text-[var(--color-accent)]"
                                  : "text-[var(--color-text)]"
                              }`}
                            >
                              {node.name}
                            </h4>
                            <p className="text-xs text-[var(--color-subtext)] line-clamp-1">
                              {node.tagline}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 flex-shrink-0 ml-2">
                          {isActive ? (
                            <span className="w-2.5 h-2.5 rounded-full bg-[var(--color-accent)] animate-ping" />
                          ) : (
                            <FaArrowRight className="text-xs text-[var(--color-subtext)] opacity-40" />
                          )}
                        </div>
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Architecture Summary Footer */}
            <div className="mt-8 pt-5 border-t border-[var(--ide-border)] flex flex-wrap items-center justify-between gap-3 text-xs font-code text-[var(--color-subtext)]">
              <div className="flex items-center gap-2">
                <FaShieldAlt className="text-[var(--color-accent)]" />
                <span>Zero-trust JWT / Realtime Duplex / Clean Code</span>
              </div>
              <span className="text-[11px] text-[var(--color-accent)]">
                End-to-End Type Safety
              </span>
            </div>
          </div>

          {/* Right: Node Inspector & Code Spec (5 cols) */}
          <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between bg-[var(--ide-surface)]">
            <div>
              {/* Header Info */}
              <div className="flex items-center justify-between pb-4 border-b border-[var(--ide-border)]">
                <div>
                  <span className="text-[10px] font-code text-[var(--color-accent)] uppercase">
                    Node Inspector
                  </span>
                  <h3 className="font-display font-bold text-lg text-[var(--color-text)]">
                    {activeNode.name}
                  </h3>
                </div>

                {activeNode.projectSlug && (
                  <Link
                    to={`/projects/${activeNode.projectSlug}`}
                    className="inline-flex items-center gap-1.5 text-xs text-[var(--color-accent)] hover:underline font-code"
                  >
                    <span>View Project</span>
                    <FaArrowRight className="text-[10px]" />
                  </Link>
                )}
              </div>

              {/* Description & Pattern */}
              <div className="mt-4 space-y-3">
                <p className="text-xs sm:text-sm text-[var(--color-subtext)] leading-relaxed">
                  {activeNode.description}
                </p>

                <div className="p-3 rounded-xl border border-[var(--ide-border)] bg-[var(--color-card)]/60">
                  <div className="text-[10px] uppercase font-code text-[var(--color-subtext)] flex items-center gap-1.5">
                    <FaLayerGroup className="text-[var(--color-accent)]" /> Design Pattern
                  </div>
                  <div className="text-xs font-semibold text-[var(--color-text)] mt-1 font-mono">
                    {activeNode.pattern}
                  </div>
                </div>
              </div>

              {/* Tab Switcher: Code vs Specs */}
              <div className="mt-5">
                <div className="flex items-center justify-between border-b border-[var(--ide-border)] pb-2 mb-3">
                  <div className="flex gap-2">
                    <button
                      onClick={() => setActiveTab("code")}
                      className={`text-xs font-code pb-1 px-2 border-b-2 transition-all ${
                        activeTab === "code"
                          ? "border-[var(--color-accent)] text-[var(--color-accent)] font-bold"
                          : "border-transparent text-[var(--color-subtext)] hover:text-[var(--color-text)]"
                      }`}
                    >
                      Code Contract
                    </button>
                    <button
                      onClick={() => setActiveTab("specs")}
                      className={`text-xs font-code pb-1 px-2 border-b-2 transition-all ${
                        activeTab === "specs"
                          ? "border-[var(--color-accent)] text-[var(--color-accent)] font-bold"
                          : "border-transparent text-[var(--color-subtext)] hover:text-[var(--color-text)]"
                      }`}
                    >
                      Technical Specs
                    </button>
                  </div>

                  {activeTab === "code" && (
                    <button
                      onClick={handleCopyCode}
                      className="text-[11px] font-code text-[var(--color-subtext)] hover:text-[var(--color-accent)] flex items-center gap-1 transition"
                      title="Copy code"
                    >
                      <FaCopy className="text-[10px]" />
                      <span>{copied ? "Copied!" : "Copy"}</span>
                    </button>
                  )}
                </div>

                {/* Tab 1: Code snippet */}
                {activeTab === "code" && (
                  <div className="relative">
                    <div className="text-[10px] font-code text-[var(--color-subtext)] mb-1 px-1 flex items-center justify-between">
                      <span>📄 {activeNode.codeSnippet.filename}</span>
                      <span className="uppercase text-[9px] text-[var(--color-accent)]">
                        {activeNode.codeSnippet.language}
                      </span>
                    </div>
                    <pre className="ide-code-block max-h-64 custom-scrollbar text-[11px] leading-snug">
                      <code>{activeNode.codeSnippet.code}</code>
                    </pre>
                  </div>
                )}

                {/* Tab 2: Specs */}
                {activeTab === "specs" && (
                  <div className="space-y-2 mt-2">
                    {activeNode.specs.map((spec, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between p-2.5 rounded-lg border border-[var(--ide-border)] bg-[var(--color-card)]/50 text-xs font-mono"
                      >
                        <span className="text-[var(--color-subtext)]">{spec.label}</span>
                        <span className="text-[var(--color-text)] font-semibold">
                          {spec.value}
                        </span>
                      </div>
                    ))}
                    <div className="p-3 rounded-lg bg-[rgba(var(--color-accent-rgb),0.05)] border border-[rgba(var(--color-accent-rgb),0.2)] text-[11px] text-[var(--color-subtext)] font-mono flex items-center gap-2 mt-3">
                      <FaCheckCircle className="text-emerald-400 flex-shrink-0" />
                      <span>Verified in production / Git test suite passing</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Bottom Project Link */}
            <div className="mt-6 pt-4 border-t border-[var(--ide-border)]">
              <Link
                to="/projects"
                className="w-full py-2.5 px-4 rounded-xl border border-[var(--color-accent)] text-[var(--color-accent)] hover:bg-[var(--color-accent)] hover:text-white transition-all text-xs font-code flex items-center justify-center gap-2"
              >
                <span>Khám phá toàn bộ {ARCHITECTURE_NODES.length} dự án & kiến trúc</span>
                <FaArrowRight className="text-[10px]" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ArchitectureVisualizer;
