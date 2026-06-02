import { memo, useRef } from 'react';
import { TagLabel } from '@/components/TagLabel';
import { useSectionReveal } from '@/hooks/use-section-reveal';
import certJava from '@/assets/certificates/ai-gallery.webp';
import certWeb from '@/assets/certificates/ai1-gallery.webp';
import certJavascript from '@/assets/certificates/dasarai-gallery.webp';
import certGdg from '@/assets/certificates/gdg-gallery.webp';
import certPython from '@/assets/certificates/python-gallery.webp';

const certificates = [
  {
    title: 'Belajar Dasar Pemrograman JavaScript',
    issuer: 'Dicoding Indonesia',
    image: certJavascript,
    alt: 'Belajar Dasar Pemrograman JavaScript certificate from Dicoding Indonesia',
  },
  {
    title: 'Belajar Pemrograman Java',
    issuer: 'Dicoding Indonesia',
    image: certJava,
    alt: 'Belajar Pemrograman Java certificate from Dicoding Indonesia',
  },
  {
    title: 'Dasar Pemrograman Web',
    issuer: 'Dicoding Indonesia',
    image: certWeb,
    alt: 'Dasar Pemrograman Web certificate from Dicoding Indonesia',
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

const CertificateCard = memo(function CertificateCard({
  certificate,
}: {
  certificate: (typeof certificates)[0];
}) {
  return (
    <article data-section-reveal className="certificate-card group">
      <div className="certificate-image-frame">
        <img
          src={certificate.image}
          alt={certificate.alt}
          width={1200}
          height={848}
          loading="lazy"
          decoding="async"
          className="certificate-image"
        />
      </div>

      <div className="px-4 py-4">
        <h3 className="text-sm font-semibold leading-6 text-white">
          {certificate.title}
        </h3>
        <p className="mt-1 text-xs text-zinc-500">{certificate.issuer}</p>
      </div>
    </article>
  );
});

export function AchievementsSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  useSectionReveal(sectionRef);

  return (
    <section
      id="achievements"
      ref={sectionRef}
      aria-label="Sertifikat dan Penghargaan"
      className="relative overflow-hidden bg-black px-6 py-24 text-white md:py-32"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-px w-[80%] -translate-x-1/2 bg-gradient-to-r from-transparent via-white/15 to-transparent" />
        <div className="absolute right-0 top-24 h-72 w-72 rounded-full bg-white/[0.025] blur-3xl" />
        <div className="absolute bottom-20 left-0 h-72 w-72 rounded-full bg-white/[0.018] blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl">
        <div data-section-reveal className="mx-auto mb-14 flex max-w-3xl flex-col items-center text-center md:mb-16">
          <TagLabel text="CERTIFICATIONS" className="mb-5 text-zinc-500" />

          <h2 className="font-heading text-5xl font-semibold tracking-[-0.06em] text-white md:text-7xl lg:text-8xl">
            Sertifikat &
            <span className="block text-[#2563eb]">Penghargaan.</span>
          </h2>

          <p className="mt-6 max-w-2xl text-sm leading-7 text-zinc-400 md:text-base">
            Beberapa sertifikat dan pencapaian yang mendukung perjalanan saya
            di bidang teknologi.
          </p>
        </div>

        <div className="mx-auto grid max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7">
          {certificates.map((certificate) => (
            <CertificateCard key={certificate.title} certificate={certificate} />
          ))}
        </div>
      </div>
    </section>
  );
}
