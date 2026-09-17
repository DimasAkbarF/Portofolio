export type Landmark = {
  id: string;
  label: string;
  tone: 'paper' | 'dark';
  num?: string;
};

export const landmarks: Landmark[] = [
  { id: 'top', label: 'Title', tone: 'paper' },
  { id: 'who', label: 'Who', tone: 'paper', num: '01' },
  { id: 'work', label: 'Work', tone: 'dark', num: '02' },
  { id: 'route', label: 'Route', tone: 'paper', num: '03' },
  { id: 'proof', label: 'Proof', tone: 'dark', num: '04' },
  { id: 'colophon', label: 'Colophon', tone: 'paper' },
];

export const chapters = landmarks.filter((l) => l.num);
