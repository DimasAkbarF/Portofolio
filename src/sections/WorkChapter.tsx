import { projects } from '@/data/projects';

const discipline: Record<string, string> = {
  TechFix: 'Web platform',
  Magisk: 'Magisk module',
  Tirtax: 'Web application',
  Kernel: 'Android kernel',
  MyCash: 'Billing platform',
};

const alt: Record<string, string> = {
  TechFix: 'TechFix Software Android technical-service platform',
  Magisk: 'Gabut Remake Magisk module artwork',
  Tirtax: 'Kalkulator Pajak UMKM web application',
  Kernel: 'Phoneix-Next custom Android kernel artwork',
  MyCash: 'MyCash web billing and payment portal',
};

export function WorkChapter() {
  return (
    <section
      id="work"
      className="chapter plate-dark"
      data-sc-act="pan"
      data-sc-span="2.5"
      aria-labelledby="work-title"
    >
      <div className="sc-stage work-stage" data-sc-stage>
        <header className="work-head">
          <span className="chapter-head__index" data-sc-parallax="0.7" aria-hidden="true">
            02
          </span>
          <div>
            <span className="sc-label chapter-head__kicker">Chapter two</span>
            <h2
              id="work-title"
              className="sc-display sc-display--lg chapter-head__title"
              data-sc-cue="0.08"
              data-sc-kinetic="lines"
            >
              Work
            </h2>
          </div>
          <p className="work-head__count">
            Selected — <span data-sc-count="0 5">5</span> of 05
          </p>
        </header>

        <div className="work-rail" data-sc-pan="0.35">
          {projects.map((project, i) => (
            <article
              className="plate"
              key={project.id}
              data-sc-tilt="5"
              data-sc-spotlight
            >
              <figure className="plate__figure">
                <span className="plate__index" aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <img
                  src={project.image}
                  srcSet={project.srcSet}
                  sizes="(max-width: 860px) 86vw, 40rem"
                  alt={alt[project.id] ?? project.title}
                  data-sc-parallax="0.35"
                  loading="lazy"
                  decoding="async"
                />
              </figure>

              <div className="plate__body">
                <span className="plate__role">
                  {discipline[project.id] ?? project.tags[0]}
                </span>
                <h3 className="sc-display plate__title">{project.title}</h3>
                <p className="plate__text">{project.description}</p>
                <ul className="plate__tags">
                  {project.tags.map((tag) => (
                    <li key={tag}>{tag}</li>
                  ))}
                </ul>
              </div>

              {project.links?.live || project.links?.source ? (
                <div className="plate__links">
                  {project.links.live && (
                    <a
                      className="plate__link"
                      href={project.links.live}
                      target="_blank"
                      rel="noreferrer noopener"
                      aria-label={`Visit ${project.title} live site`}
                    >
                      Visit site
                    </a>
                  )}
                  {project.links.source && (
                    <a
                      className="plate__link"
                      href={project.links.source}
                      target="_blank"
                      rel="noreferrer noopener"
                      aria-label={`Open ${project.title} source code on GitHub`}
                    >
                      Source
                    </a>
                  )}
                </div>
              ) : (
                <a className="plate__link" href={project.detailTarget}>
                  Enquire about this
                </a>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
