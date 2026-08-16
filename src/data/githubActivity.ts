export interface ContributionDay {
  date: string;
  count: number;
  level: number;
}

export interface GithubRepositoryActivity {
  name: string;
  group: string;
  contributions: number;
  stack: string;
  url: string;
}

const contributionCounts =
  "0.0.0.0.0.0.1.0.0.0.0.0.0.0.0.0.0.0.3.0.0.0.0.0.0.0.0.0.5.2.0.0.0.2.0.4.5.0.0.0.0.1.0.0.0.0.0.0.0.0.0.0.0.9.0.0.2.0.0.0.0.0.0.9.2.0.0.2.1.1.1.a.5.0.4.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.18.a.2.0.0.3.9.7.1.1a.6.0.0.0.0.0.0.0.0.0.0.0.0.0.2.e.0.0.2.0.3.0.2.19.a.13.1.16.e.13.0.0.4.0.4.5.0.6.15.f.0.2.0.0.1.8.a.7.3.5.7.0.4.4.3.a.3.5.0.10.4.0.8.8.4.0.6.22.23.19.c.10.a.9.6.7.8.9.16.5.0.0.19.5.12.27.16.2e.1d.4d.12.0.2c.0.e.1a.8.14.12.0.7.9.4.a.3.3.6.4.c.0.3.0.4.0.b.9.2"
    .split(".")
    .map((value) => Number.parseInt(value, 16));

const contributionLevels =
  "0000001000000000001000000000110001011000010000000000010010000001100111111010000000000000000000000000002110011112100000000000001100101012111211001011012101001111111011111101101110122211111111210021132324103012121011111111101010111";

const startDate = new Date("2026-01-01T00:00:00Z");

export const contributionDays: ContributionDay[] = contributionCounts.map((count, index) => {
  const date = new Date(startDate);
  date.setUTCDate(startDate.getUTCDate() + index);

  return {
    date: date.toISOString().slice(0, 10),
    count,
    level: Number(contributionLevels[index] ?? 0),
  };
});

export const githubActivity = {
  username: "datmnt-dev",
  profileUrl: "https://github.com/datmnt-dev",
  snapshotDate: "2026-08-17",
  startDate: "2026-01-01",
  totalContributions: 1157,
  authoredCommits: 1028,
  activeDays: 108,
  currentStreak: 3,
  longestStreak: 14,
  bestDay: {
    date: "2026-07-21",
    count: 77,
  },
  publicRepositories: 21,
  monthly: [
    { label: "Thg 1", contributions: 11 },
    { label: "Thg 2", contributions: 23 },
    { label: "Thg 3", contributions: 35 },
    { label: "Thg 4", contributions: 88 },
    { label: "Thg 5", contributions: 173 },
    { label: "Thg 6", contributions: 202 },
    { label: "Thg 7", contributions: 538 },
    { label: "Thg 8", contributions: 87 },
  ],
};

export const topGithubRepositories: GithubRepositoryActivity[] = [
  {
    name: "ThreadLearn",
    group: "ThreadLearn",
    contributions: 235,
    stack: "Next.js + NestJS",
    url: "https://github.com/ThreadLearn/ThreadLearn_WEB_FE",
  },
  {
    name: "AgriLink Vietnam",
    group: "AgriLinkVN",
    contributions: 208,
    stack: "Next.js + NestJS",
    url: "https://github.com/AgriLinkVN/agrilink-backend",
  },
  {
    name: "Music Web Platform",
    group: "datmnt-dev",
    contributions: 173,
    stack: "React + Node + FastAPI",
    url: "https://github.com/datmnt-dev/Music_Web_FE",
  },
  {
    name: "JobFinder",
    group: "SWPGr",
    contributions: 166,
    stack: "React + Spring Boot",
    url: "https://github.com/SWPGr/fe-jobfinder",
  },
  {
    name: "Portfolio",
    group: "datmnt-dev",
    contributions: 64,
    stack: "React + TypeScript",
    url: "https://github.com/datmnt-dev/dat_porfolio",
  },
];
