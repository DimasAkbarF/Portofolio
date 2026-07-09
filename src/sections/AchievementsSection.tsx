import { memo, useRef } from 'react';
import { TagLabel } from '@/components/TagLabel';
import { certificates, type Certificate } from '@/data/certificates';
import { useSectionReveal } from '@/hooks/use-section-reveal';

const CertificateCard = memo(function CertificateCard({
  certificate,
}: {
  certificate: Certificate;
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
      aria-labelledby="achievements-heading"
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

          <h2 id="achievements-heading" className="font-heading text-5xl font-semibold tracking-[-0.06em] text-white md:text-7xl lg:text-8xl">
            Certificate &
            <span className="block text-[#2563eb]">Award.</span>
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
