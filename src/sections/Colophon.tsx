const imprint = [
  { term: 'Edition', detail: 'First, 2026' },
  { term: 'Author', detail: 'Dimas Akbar' },
  { term: 'Place', detail: 'Indonesia' },
];

export function Colophon() {
  return (
    <footer id="colophon" className="colophon">
      <div className="sc-wrap">
        <div className="colophon__runhead">
          <h2 className="sc-label">Colophon</h2>
          <span className="colophon__leader" aria-hidden="true" />
        </div>

        <div className="colophon__spread">
          <p className="colophon__note">
            Set in <b>Archivo</b> for display and <b>Newsreader</b> for prose.
            Built with React, TypeScript and Vite. The scroll layer is written by
            hand, one animation frame at a time, with no scroll library behind it.
            The whole book ships as one static document: no analytics, no cookies,
            no third-party scripts.
          </p>

          <dl className="colophon__record">
            {imprint.map((row) => (
              <div key={row.term}>
                <dt>{row.term}</dt>
                <dd>{row.detail}</dd>
              </div>
            ))}
            <div>
              <dt>Write to</dt>
              <dd>
                <a className="colophon__mail" href="mailto:dimasakbr299@gmail.com">
                  dimasakbr299@gmail.com
                </a>
              </dd>
            </div>
          </dl>
        </div>

        <div className="colophon__foot">
          <p className="colophon__imprint">
            <span className="colophon__mark" aria-hidden="true">
              DA
            </span>
            <span>© 2026 Dimas Akbar</span>
            <a href="https://dimasakbar.xyz/">dimasakbar.xyz</a>
          </p>

          <a className="colophon__up" href="#top">
            <span aria-hidden="true">↑</span>
            Title page
          </a>
        </div>
      </div>
    </footer>
  );
}
