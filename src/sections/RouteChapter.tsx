import { certificates } from '@/data/certificates';
import { timelineItems } from '@/data/experience';

export function RouteChapter() {
  return (
    <section
      id="route"
      className="chapter"
      data-sc-act="flow"
      aria-labelledby="route-title"
    >
      <div className="sc-wrap">
        <header className="chapter-head">
          <span className="chapter-head__index" data-sc-parallax="1.1" aria-hidden="true">
            03
          </span>
          <div>
            <span className="sc-label chapter-head__kicker">Chapter three</span>
            <h2
              id="route-title"
              className="sc-display sc-display--lg chapter-head__title"
              data-sc-in
            >
              Route
            </h2>
          </div>
        </header>

        <div className="route-grid">
          <aside className="route-aside">
            <p className="sc-body" data-sc-in>
              A short record of where the work has come from. No internship line, no
              invented client list — study, practice, and the projects that actually
              happened.
            </p>
          </aside>

          <div className="route-rule" data-sc-in data-sc-stagger="80">
            {timelineItems.map((item) => (
              <article className="route-item" key={item.title}>
                <div className="route-item__meta">
                  <span>{item.category}</span>
                  <span>{item.period}</span>
                </div>
                <h3 className="sc-display route-item__title">{item.title}</h3>
                <p className="route-item__role">{item.role}</p>
                <p>{item.description}</p>
                <ul className="route-item__tags">
                  {item.tags.map((tag) => (
                    <li key={tag}>{tag}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </div>

      <div className="sc-wrap certs">
        <div className="certs__head">
          <h3 className="sc-label">Coursework &amp; certificates</h3>
          <p className="sc-label">
            <span data-sc-count="0 5">5</span> on file
          </p>
        </div>
        <div className="certs__strip" data-sc-in data-sc-stagger="70">
          {certificates.map((cert) => (
            <figure className="cert" key={cert.image}>
              <img src={cert.image} alt={cert.alt} loading="lazy" decoding="async" />
              <figcaption>
                <h3>{cert.title}</h3>
                <p>{cert.issuer}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
