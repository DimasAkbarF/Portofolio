export function Colophon() {
  return (
    <footer id="colophon" className="colophon">
      <div className="sc-wrap">
        <span className="sc-label">Colophon</span>

        <div className="colophon__grid">
          <div className="colophon__cell">
            <h3>Set in</h3>
            <p>
              <b>Archivo</b> for display, <b>Newsreader</b> for prose.
            </p>
          </div>
          <div className="colophon__cell">
            <h3>Built with</h3>
            <p>
              React, TypeScript and Vite, with <b>scrollcraft</b> driving the scroll layer.
            </p>
          </div>
          <div className="colophon__cell">
            <h3>Edition</h3>
            <p>
              <b>Vol. 01</b> — 2026, Indonesia.
            </p>
          </div>
          <div className="colophon__cell">
            <h3>Inquiries</h3>
            <p>dimasakbr299@gmail.com</p>
          </div>
        </div>

        <p className="colophon__proof">
          <i aria-hidden="true" />
          <i aria-hidden="true" />
          <i aria-hidden="true" />
          <i aria-hidden="true" />
          Proof complete — © 2026 dimasakbar.xyz
        </p>
      </div>
    </footer>
  );
}
