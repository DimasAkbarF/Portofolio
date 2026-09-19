export function TitlePage() {
  return (
    <section id="top" className="title-page" aria-labelledby="title-name">
      <div className="sc-wrap">
        <h1 id="title-name" className="sc-display title-page__name">
          Dimas <i>Akbar</i>
        </h1>

        <p className="title-page__role">
          Web developer — <em>React, TypeScript and Tailwind</em>, built to
          survive a real screen.
        </p>

        <div className="title-page__bottom">
          <p className="sc-lede">
            I am an Informatics Engineering student who ships interfaces for the web. I
            care about the part that usually gets skipped: what happens to the layout on a
            slow connection, a small phone and a thumb that does not aim well.
          </p>

          <dl className="title-page__grid">
            <div>
              <dt>Based</dt>
              <dd>Indonesia</dd>
            </div>
            <div>
              <dt>Study</dt>
              <dd>Universitas Pamulang</dd>
            </div>
            <div>
              <dt>Studying since</dt>
              <dd>
                <span data-sc-count="0 2024">2024</span>
              </dd>
            </div>
            <div>
              <dt>Tools in use</dt>
              <dd>
                <span data-sc-count="0 12">12</span>
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}
