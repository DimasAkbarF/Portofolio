import { bottomSkills, topSkills } from '@/data/skills';

export function WhoChapter() {
  return (
    <section
      id="who"
      className="chapter"
      data-sc-act="flow"
      aria-labelledby="who-title"
    >
      <div className="sc-wrap">
        <header className="chapter-head">
          <span className="chapter-head__index" data-sc-parallax="1.1" aria-hidden="true">
            01
          </span>
          <div>
            <span className="sc-label chapter-head__kicker">Chapter one</span>
            <h2
              id="who-title"
              className="sc-display sc-display--lg chapter-head__title"
              data-sc-in
            >
              Who
            </h2>
          </div>
        </header>

        <div className="who-grid">
          <figure className="who-portrait" data-sc-parallax="0.5">
            <img
              data-sc-reveal="up"
              src="/assets/About.webp"
              srcSet="/assets/About-400.webp 400w, /assets/About-600.webp 600w, /assets/About.webp 899w"
              sizes="(max-width: 860px) 86vw, 34vw"
              alt="Portrait of Dimas Akbar, freelance web developer behind dimasakbar.xyz"
              width={899}
              height={1280}
              loading="lazy"
              decoding="async"
            />
            <figcaption>Dimas Akbar — dimasakbar.xyz</figcaption>
          </figure>

          <div className="who-prose">
            <p data-sc-in>
              Dimas Akbar is a freelance web developer and Informatics Engineering student at Universitas Pamulang, Indonesia.
            </p>
            <p data-sc-in>
              I work in React, TypeScript and Tailwind, and I lean on animation only when it
              carries meaning — a reveal should explain structure, not decorate it.{' '}
              <a className="footnote-ref" href="#who-note">
                1
              </a>
            </p>
            <p data-sc-in>
              Outside the browser I work on Android at the system level: shell modules and a
              custom kernel for a device I happen to own. That work taught me the same
              lesson as the web, from the other direction — every optimisation costs
              something, and the bill arrives on a real device.
            </p>

            <p className="who-note" id="who-note" data-sc-in>
              <span className="footnote-ref">1.</span> Motion is a language for hierarchy
              and continuity. When it does neither, it is noise with a frame budget.
            </p>

            <div className="skills-index" data-sc-in data-sc-stagger="45">
              <h3>In the kit</h3>
              <ul>
                {[
                  ...topSkills.map((skill) => ({ name: skill.name, tier: 'core' })),
                  ...bottomSkills.map((skill) => ({ name: skill.name, tier: 'working' })),
                ].map((skill) => (
                  <li key={skill.name}>
                    <span>{skill.name}</span>
                    <span>{skill.tier}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
