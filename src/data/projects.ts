export type Project = {
  id: string;
  title: string;
  description: string;
  tags: string[];
  image: string;
  srcSet: string;
  links?: {
    live?: string;
    source?: string;
  };
  detailTarget: string;
};

export const projects: Project[] = [
  {
    id: 'TechFix',
    title: 'TechFix Software',
    description:
      'A professional Android technical-service platform with a human consultation layer, built with Next.js 15 App Router, TypeScript and Tailwind CSS v4: nine service guides, real-time search, an accessible FAQ, JSON-LD and a PWA manifest on its own domain.',
    tags: ['Next.js', 'TypeScript', 'Tailwind CSS', 'SEO'],
    image: '/assets/Tech.webp',
    srcSet: '/assets/Tech-400.webp 400w, /assets/Tech-800.webp 1280w',
    links: {
      live: 'https://techfixsoftware.my.id/',
      source: 'https://github.com/DimasAkbarF/techfixsoftware',
    },
    detailTarget: '#proof',
  },
  {
    id: 'Tirtax',
    title: 'Kalkulator Pajak UMKM',
    description:
      'A clean and responsive web application for estimating UMKM final income tax at 0.5%. Built with React, Vite, and Tailwind CSS, featuring automatic calculation, Rupiah formatting, and smooth light/dark mode support',
    tags: ['Vite', 'Tailwind CSS', 'React', 'LocalStorage'],
    image: '/assets/pajakweb.webp',
    srcSet: '/assets/pajakweb-400.webp 400w, /assets/pajakweb-800.webp 800w, /assets/pajakweb.webp 1600w',
    links: {
      live: 'https://kalkulator-pajak-umkm.vercel.app/',
      source: 'https://github.com/DimasAkbarF/KalkulatorPajak',
    },
    detailTarget: '#proof',
  },
  {
    id: 'Magisk',
    title: 'Gabut Remake',
    description:
      'Developed a shell-based Magisk module for MediaTek devices, focused on improving system responsiveness, runtime efficiency, and daily Android performance through lightweight system-level optimization.',
    tags: ['Shell'],
    image: '/assets/module.webp',
    srcSet: '/assets/module-400.webp 400w, /assets/module-800.webp 800w, /assets/module.webp 1600w',
    detailTarget: '#proof',
  },
  {
    id: 'Kernel',
    title: 'Phoneix-Next',
    description:
      'Developed and optimized a custom Android kernel for Redmi Note 9 (Merlinx), improving performance, power efficiency, and system stability while maintaining KernelSU support for AOSP Android 13–15.',
    tags: ['Android Kernel', 'KernelSU', 'AOSP', 'Linux', 'C#'],
    image: '/assets/Kernel.webp',
    srcSet: '/assets/Kernel-400.webp 400w, /assets/Kernel-800.webp 800w, /assets/Kernel.webp 1600w',
    detailTarget: '#proof',
  },
  {
    id: 'MyCash',
    title: 'MyCash',
    description:
      'A web billing and payment portal with two separate product areas, Admin and User. Admins manage accounts and invoices; users view their bills, pay by QRIS (including partial installments), upload proof of payment, and track verification status. Built with Next.js 16 App Router, Supabase (Auth, Postgres, Storage, Row Level Security), TypeScript and Tailwind CSS v4, with role-based access control, server actions and Zod validation.',
    tags: ['Next.js', 'Supabase', 'TypeScript', 'Tailwind CSS'],
    image: '/assets/MyCash.webp',
    srcSet: '/assets/MyCash-400.webp 400w, /assets/MyCash-800.webp 800w, /assets/MyCash.webp 1672w',
    links: {
      live: 'https://mycash-delta.vercel.app',
      source: 'https://github.com/DimasAkbarF/MyC4sh',
    },
    detailTarget: '#proof',
  },
];
