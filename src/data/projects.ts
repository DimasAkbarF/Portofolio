export type Project = {
  id: string;
  title: string;
  description: string;
  tags: string[];
  image: string;
  detailTarget: string;
};

export const projects: Project[] = [
 {
  id: 'Magisk',
  title: 'Gabut Remake',
  description:
    'Developed a shell-based Magisk module for MediaTek devices, focused on improving system responsiveness, runtime efficiency, and daily Android performance through lightweight system-level optimization.',
  tags: ['Shell'],
  image: '/assets/module.png',
  detailTarget: '#contact',
},
  {
    id: 'Tirtax',
    title: 'Kalkulator Pajak UMKM',
    description:
      'A clean and responsive web application for estimating UMKM final income tax at 0.5%. Built with React, Vite, and Tailwind CSS, featuring automatic calculation, Rupiah formatting, and smooth light/dark mode support',
    tags: ['Vite','Tailwind CSS','React','LocalStorage'],
    image: '/assets/pajakweb.png',
    detailTarget: '#contact',
  },
{
  id: 'Kernel',
  title: 'Phoneix-Next',
  description:
    'Developed and optimized a custom Android kernel for Redmi Note 9 (Merlinx), improving performance, power efficiency, and system stability while maintaining KernelSU support for AOSP Android 13–15.',
  tags: ['Android Kernel', 'KernelSU', 'AOSP', 'Linux', 'C#'],
  image: '/assets/Kernel.png',
  detailTarget: '#contact',
}

];
