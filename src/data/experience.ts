export type TimelineItem = {
  category: string;
  title: string;
  role: string;
  period: string;
  description: string;
  tags: string[];
};

export const timelineItems: TimelineItem[] = [
  {
    category: 'Education',
    title: 'Universitas Pamulang',
    role: 'Informatics Engineering Student',
    period: '2024 — Present',
    description:
      'I am currently studying Informatics Engineering while continuously developing my skills in programming, databases, software development, and web technologies. I also build small personal projects to practice problem solving and improve my practical understanding of web development.',
    tags: ['Programming', 'Database', 'Web Development', 'Software Development'],
  },
  {
    category: 'Learning',
    title: 'Web Development Learning',
    role: 'Frontend Development',
    period: '2024 — Present',
    description:
      'I am learning how to build responsive websites using HTML, CSS, JavaScript, React, and Tailwind CSS, with a focus on clean layouts, UI structure, responsive design, and better user experience.',
    tags: ['HTML', 'CSS', 'JavaScript', 'React', 'Tailwind CSS'],
  },
  {
    category: 'Practice',
    title: 'Personal Projects',
    role: 'Practice & Exploration',
    period: '2025 — Present',
    description:
      'I build small personal projects to apply what I learn, improve my problem-solving skills, and understand the real process of creating modern web interfaces from layout to implementation.',
    tags: ['React', 'Vite', 'Tailwind', 'UI Design', 'Problem Solving'],
  },
  {
    category: 'Current Focus',
    title: 'Frontend Developer in Progress',
    role: 'Continuous Improvement',
    period: 'Now',
    description:
      'I am currently improving my frontend skills by learning better component structure, responsive design, clean code, UI consistency, accessibility, and basic backend integration.',
    tags: ['Frontend', 'Clean Code', 'Responsive Design', 'UI/UX', 'Backend Basics'],
  },
];
