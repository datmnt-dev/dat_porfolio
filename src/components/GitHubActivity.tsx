import { FaCalendarCheck, FaCodeBranch, FaExternalLinkAlt, FaFire, FaGithub } from "react-icons/fa";
import {
  contributionDays,
  githubActivity,
  topGithubRepositories,
  type ContributionDay,
} from "../data/githubActivity";
import ScrollReveal from "./ui/ScrollReveal";
import SectionHeader from "./ui/SectionHeader";
import SpotlightCard from "./ui/SpotlightCard";

const numberFormatter = new Intl.NumberFormat("en-US");
const dateFormatter = new Intl.DateTimeFormat("vi-VN", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
  timeZone: "UTC",
});

const startOffset = new Date(`${githubActivity.startDate}T00:00:00Z`).getUTCDay();
const calendarCells: Array<ContributionDay | null> = [
  ...Array.from({ length: startOffset }, () => null),
  ...contributionDays,
];
const maximumMonthlyContributions = Math.max(
  ...githubActivity.monthly.map((month) => month.contributions)
);
const maximumRepositoryContributions = Math.max(
  ...topGithubRepositories.map((repository) => repository.contributions)
);

const metrics = [
  {
    label: "Contributions 2026",
    value: numberFormatter.format(githubActivity.totalContributions),
    icon: FaCodeBranch,
  },
  {
    label: "Ngày hoạt động",
    value: githubActivity.activeDays.toString(),
    icon: FaCalendarCheck,
  },
  {
    label: "Streak dài nhất",
    value: `${githubActivity.longestStreak} ngày`,
    icon: FaFire,
  },
  {
    label: "Best day · 21/07",
    value: githubActivity.bestDay.count.toString(),
    icon: FaGithub,
  },
];

const GitHubActivity = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 lg:px-8 py-20">
      <ScrollReveal>
        <SectionHeader
          eyebrow="GitHub footprint"
          title={
            <>
              Lịch sử build bằng <span className="text-gradient">dữ liệu thật</span>
            </>
          }
          description="Snapshot công khai đến 17/08/2026, tổng hợp contribution calendar và những repository tôi tham gia nhiều nhất."
          action={
            <a
              href={githubActivity.profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost !text-xs"
            >
              <FaGithub /> @{githubActivity.username}
              <FaExternalLinkAlt className="text-[10px]" />
            </a>
          }
        />
      </ScrollReveal>

      <div className="grid xl:grid-cols-[1.4fr_0.6fr] gap-5 items-stretch">
        <ScrollReveal className="min-w-0">
          <SpotlightCard className="github-activity-card p-5 sm:p-7 h-full min-w-0">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
              <div>
                <p className="font-code text-[10px] uppercase tracking-normal text-[var(--color-accent)]">
                  contribution calendar / 2026
                </p>
                <h3 className="mt-1 font-display font-bold text-xl sm:text-2xl">Nhịp làm việc theo ngày</h3>
              </div>
              <div className="font-code text-xs text-[var(--color-subtext)]">
                <span className="text-[var(--color-accent)] font-bold">
                  {numberFormatter.format(githubActivity.authoredCommits)}+
                </span>{" "}
                authored commits
              </div>
            </div>

            <div className="github-calendar-scroll mt-7 pb-2">
              <div className="github-calendar-content">
                <div className="github-month-labels" aria-hidden="true">
                  {githubActivity.monthly.map((month) => (
                    <span key={month.label}>{month.label}</span>
                  ))}
                </div>
                <div
                  className="github-contribution-grid"
                  role="img"
                  aria-label={`${numberFormatter.format(githubActivity.totalContributions)} contributions trên ${githubActivity.activeDays} ngày hoạt động trong năm 2026`}
                >
                  {calendarCells.map((day, index) =>
                    day ? (
                      <span
                        key={day.date}
                        className={`github-contribution-day level-${day.level}`}
                        title={`${dateFormatter.format(new Date(`${day.date}T00:00:00Z`))}: ${day.count} contributions`}
                        aria-hidden="true"
                      />
                    ) : (
                      <span key={`empty-${index}`} className="github-contribution-day is-empty" aria-hidden="true" />
                    )
                  )}
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 mt-3 text-[10px] font-code text-[var(--color-subtext)]">
              <span>
                Current streak: <strong className="text-[var(--color-text)]">{githubActivity.currentStreak} ngày</strong>
              </span>
              <div className="flex items-center gap-1.5" aria-label="Contribution intensity legend">
                <span>Ít</span>
                {[0, 1, 2, 3, 4].map((level) => (
                  <span key={level} className={`github-contribution-day level-${level}`} aria-hidden="true" />
                ))}
                <span>Nhiều</span>
              </div>
            </div>

            <div className="github-activity-metrics mt-7 grid grid-cols-2 lg:grid-cols-4 border-y border-[var(--color-border)]">
              {metrics.map(({ label, value, icon: Icon }) => (
                <div key={label} className="github-activity-metric py-4 px-3 sm:px-4">
                  <Icon className="text-[var(--color-accent)] text-sm" />
                  <div className="mt-2 font-display font-bold text-xl">{value}</div>
                  <div className="mt-1 text-[10px] font-code text-[var(--color-subtext)]">{label}</div>
                </div>
              ))}
            </div>

            <div className="mt-7">
              <div className="flex items-center justify-between gap-3 mb-4">
                <h4 className="font-code font-bold text-xs uppercase tracking-normal">Contribution velocity</h4>
                <span className="font-code text-[10px] text-[var(--color-subtext)]">Jan - Aug 2026</span>
              </div>
              <div className="github-month-bars">
                {githubActivity.monthly.map((month) => (
                  <div key={month.label} className="github-month-bar-item">
                    <div className="github-month-bar-track">
                      <span
                        className="github-month-bar-fill"
                        style={{ height: `${Math.max(6, (month.contributions / maximumMonthlyContributions) * 100)}%` }}
                      />
                    </div>
                    <span className="github-month-bar-value">{month.contributions}</span>
                    <span className="github-month-bar-label">{month.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </SpotlightCard>
        </ScrollReveal>

        <ScrollReveal delay={90} className="min-w-0">
          <SpotlightCard className="p-5 sm:p-7 h-full min-w-0">
            <div className="flex items-center justify-between gap-3 pb-5 border-b border-[var(--color-border)]">
              <div>
                <p className="font-code text-[10px] uppercase tracking-normal text-[var(--color-accent)]">
                  top public repositories
                </p>
                <h3 className="mt-1 font-display font-bold text-xl">Dự án đóng góp nhiều</h3>
              </div>
              <FaCodeBranch className="text-xl text-[var(--color-accent)]" />
            </div>

            <div className="divide-y divide-[var(--color-border)]">
              {topGithubRepositories.map((repository, index) => (
                <a
                  key={repository.name}
                  href={repository.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="github-repository-row group block py-5"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-code text-[10px] text-[var(--color-subtext)]">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <h4 className="font-display font-bold truncate group-hover:text-[var(--color-accent)] transition-colors">
                          {repository.name}
                        </h4>
                      </div>
                      <p className="mt-1 font-code text-[10px] text-[var(--color-subtext)]">
                        {repository.group} / {repository.stack}
                      </p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div className="font-display font-bold text-lg text-[var(--color-accent)]">
                        {repository.contributions}
                      </div>
                      <div className="font-code text-[9px] text-[var(--color-subtext)]">commits</div>
                    </div>
                  </div>
                  <div className="github-repository-track mt-3">
                    <span
                      className="github-repository-fill"
                      style={{ width: `${(repository.contributions / maximumRepositoryContributions) * 100}%` }}
                    />
                  </div>
                </a>
              ))}
            </div>

            <div className="mt-5 pt-5 border-t border-[var(--color-border)] font-code text-[10px] leading-relaxed text-[var(--color-subtext)]">
              Thống kê repository lấy từ contributor API trên nhánh mặc định. MyRoomie là collaboration private nên không cộng vào bảng public này.
            </div>
          </SpotlightCard>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default GitHubActivity;
