import certJava from '@/assets/certificates/ai-gallery.webp';
import certWeb from '@/assets/certificates/ai1-gallery.webp';
import certJavascript from '@/assets/certificates/dasarai-gallery.webp';
import certGdg from '@/assets/certificates/gdg-gallery.webp';
import certPython from '@/assets/certificates/python-gallery.webp';

export type Certificate = {
  title: string;
  issuer: string;
  image: string;
  alt: string;
};

export const certificates: Certificate[] = [
  {
    title: 'Belajar Dasar Ai',
    issuer: 'Dicoding Indonesia',
    image: certJavascript,
    alt: 'Belajar Dasar Ai certificate from Dicoding Indonesia',
  },
  {
    title: 'Belajar Dasar Ai',
    issuer: 'Universitas Pamulang',
    image: certJava,
    alt: 'Belajar Dasar Ai certificate from Universitas Pamulang Indonesia',
  },
  {
    title: 'WorkShop',
    issuer: 'Universitas Pamulang',
    image: certWeb,
    alt: 'Workshop certificate from Universitas Pamulang Indonesia',
  },
  {
    title: 'Google Developer Groups Event',
    issuer: 'GDG Indonesia',
    image: certGdg,
    alt: 'Google Developer Groups event certificate',
  },
  {
    title: 'Python Development',
    issuer: 'Python Academy',
    image: certPython,
    alt: 'Python Development certificate',
  },
];
