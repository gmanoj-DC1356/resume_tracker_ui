// Static sample data used only to populate the UI template.
// Replace with real API responses once the backend endpoints are wired up.

import type {
  CandidateMatch,
  HistoryEntry,
  InterviewQuestion,
  QuestionLevel,
  ResumeDetail,
} from '@/types/domain';

export const SAMPLE_CANDIDATES: CandidateMatch[] = [
  {
    resumeId: 'r_104',
    candidateRef: 'CAND-0104',
    name: 'Candidate A',
    role: 'Data Engineer',
    yearsExperience: 8,
    score: 91,
    matchedSkills: ['Python', 'SQL', 'Spark', 'Azure'],
    missingSkills: [],
    summary:
      'Built Spark batch and streaming pipelines on Azure Databricks for commercial analytics.',
  },
  {
    resumeId: 'r_087',
    candidateRef: 'CAND-0087',
    name: 'Candidate B',
    role: 'Analytics Engineer',
    yearsExperience: 6,
    score: 84,
    matchedSkills: ['Python', 'Azure', 'SQL'],
    missingSkills: ['Spark'],
    summary: 'Designed ELT models and orchestration on Azure Data Factory.',
  },
  {
    resumeId: 'r_142',
    candidateRef: 'CAND-0142',
    name: 'Candidate C',
    role: 'Software Engineer',
    yearsExperience: 5,
    score: 73,
    matchedSkills: ['Python', 'SQL'],
    missingSkills: ['Spark', 'Azure'],
    summary: 'Backend services and reporting APIs in Python with SQL warehouses.',
  },
  {
    resumeId: 'r_019',
    candidateRef: 'CAND-0019',
    name: 'Candidate D',
    role: 'Data Analyst',
    yearsExperience: 4,
    score: 58,
    matchedSkills: ['SQL', 'Azure'],
    missingSkills: ['Python', 'Spark'],
    summary: 'Dashboards and ad-hoc analysis; started moving jobs to cloud.',
  },
];

export const SAMPLE_RESUME_DETAILS: Record<string, ResumeDetail> = {
  r_104: {
    resumeId: 'r_104',
    candidateRef: 'CAND-0104',
    name: 'Candidate A',
    role: 'Data Engineer',
    yearsExperience: 8,
    skills: ['Python', 'SQL', 'Spark', 'Azure'],
    summary:
      'Built Spark batch and streaming pipelines on Azure Databricks for commercial analytics.',
    experience: [
      { title: 'Lead Data Engineer', period: '2021 – present' },
      { title: 'Data Engineer', period: '2018 – 2021' },
    ],
    education: 'B.Tech, Computer Science (synthetic sample)',
  },
};

export const SAMPLE_QUESTIONS: Record<QuestionLevel, InterviewQuestion[]> = {
  low: [
    { text: 'Describe a data pipeline you built end-to-end.' },
    { text: 'How do you validate data quality in SQL?' },
    { text: 'What is the difference between batch and streaming?' },
  ],
  medium: [
    { text: 'How would you partition and tune a large Spark join?' },
    { text: 'Walk through handling schema evolution in a lake table.' },
    { text: 'How do you design idempotent pipeline retries?' },
  ],
  high: [
    {
      text: 'Design a multi-tenant streaming platform with exactly-once semantics on Azure.',
    },
    { text: 'How would you cut a 6h batch job to under 1h at 10x data growth?' },
    { text: 'Defend a lakehouse vs warehouse decision for regulated data.' },
  ],
};

export const SAMPLE_HISTORY: HistoryEntry[] = [
  { id: 'h_1', title: 'Senior Data Engineer – shortlist', type: 'match', createdAt: 'Today' },
  { id: 'h_2', title: 'ML Engineer – screening', type: 'match', createdAt: '2 days ago' },
  {
    id: 'h_3',
    title: 'Interview Qs – Candidate A',
    type: 'questions',
    createdAt: '3 days ago',
  },
  {
    id: 'h_4',
    title: 'Analytics Lead – shortlist',
    type: 'match',
    createdAt: '12 days ago',
  },
];
