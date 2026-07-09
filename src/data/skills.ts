import type { SimpleIcon } from 'simple-icons';
import {


  siGit,
  siGithub,
  siJavascript,

  siMongodb,
  siMysql,
  siNextdotjs,
  siNodedotjs,
  siPostgresql,
  siReact,
  siTailwindcss,
  siTypescript,
  siVite,
} from 'simple-icons/icons';

export type Skill = {
  name: string;
  icon: SimpleIcon;
  color: string;
};

export const topSkills: Skill[] = [
  { name: 'JavaScript', icon: siJavascript, color: '#F7DF1E' },
  { name: 'TypeScript', icon: siTypescript, color: '#3178C6' },
  { name: 'ReactJS', icon: siReact, color: '#61DAFB' },
  { name: 'Next.js', icon: siNextdotjs, color: '#FFFFFF' },
  { name: 'PostgreSQL', icon: siPostgresql, color: '#4169E1' },
  { name: 'Tailwind CSS', icon: siTailwindcss, color: '#06B6D4' },

];

export const bottomSkills: Skill[] = [
  { name: 'Git', icon: siGit, color: '#F05032' },
  { name: 'MySQL', icon: siMysql, color: '#4479A1' },
  { name: 'Node.js', icon: siNodedotjs, color: '#5FA04E' },
  { name: 'MongoDB', icon: siMongodb, color: '#47A248' },
  { name: 'GitHub', icon: siGithub, color: '#FFFFFF' },
  { name: 'Vite', icon: siVite, color: '#646CFF' },
];
