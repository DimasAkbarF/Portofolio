export function ProofChapter() {
  return (
    <section
      id="proof"
      className="chapter plate-dark"
      data-sc-act="flow"
      aria-labelledby="proof-title"
    >
      <div className="sc-wrap proof">
        <header className="chapter-head">
          <span className="chapter-head__index" data-sc-parallax="1.1" aria-hidden="true">
            04
          </span>
          <div>
            <span className="sc-label chapter-head__kicker">Chapter four</span>
            <h2
              id="proof-title"
              className="sc-display sc-display--lg chapter-head__title"
              data-sc-in
            >
              Proof
            </h2>
          </div>
        </header>

        <p className="sc-label proof__eyebrow" data-sc-in>
          Closing statement
        </p>

        <p
          className="sc-display proof__line"
          data-sc-cue="0.2"
          data-sc-kinetic="lines"
        >
          Let us build the next one properly.
        </p>

        <div className="proof__row">
          <div>
            <span className="sc-label">Write to</span>
            <br />
            <a
              className="proof__mail"
              href="mailto:dimasakbr299@gmail.com"
              data-sc-magnet="0.25"
            >
              dimasakbr299@gmail.com
            </a>
          </div>

          <ul className="proof__socials" data-sc-in data-sc-stagger="70">
            <li>
              <a
                href="https://github.com/DimasAkbarF"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
            </li>
            <li>
              <a
                href="https://www.instagram.com/dimasakbr29"
                target="_blank"
                rel="noopener noreferrer"
              >
                Instagram
              </a>
            </li>
            <li>
              <a href="https://dimasakbar.xyz/">dimasakbar.xyz</a>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
