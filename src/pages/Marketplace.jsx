const markets = [
  {
    url: "https://www.ikea.com/",
    category: "FURNITURE",
    title: "Scandinavian Living",
    image: "market-one",
  },

  {
    url: "https://www.wayfair.com/",
    category:
      "FURNITURE + DECOR",
    title: "Layered Interiors",
    image: "market-two",
  },

  {
    url: "https://www.potterybarn.com/",
    category: "HOME DECOR",
    title: "Warm & Timeless",
    image: "market-three",
  },

  {
    url: "https://www.etsy.com/",
    category:
      "ART + HANDMADE",
    title: "Objects With Soul",
    image: "market-four",
  },
];

export default function Marketplace() {
  return (
    <section
      className="marketplace"
      id="marketplace"
    >
      <div className="section-heading">
        <p className="eyebrow">
          07 · MARKETPLACE
        </p>

        <h2>
          Find pieces worth
          <i> bringing home.</i>
        </h2>

        <p>
          Explore furniture, lighting and
          decorative pieces from popular design
          marketplaces.
        </p>
      </div>

      <div className="market-grid">
        {markets.map((market) => (
          <a
            key={market.title}
            href={market.url}
            target="_blank"
            rel="noreferrer"
            className="market-card"
          >
            <div
              className={`market-image ${market.image}`}
            />

            <div className="market-info">
              <div>
                <small>
                  {market.category}
                </small>

                <h3>
                  {market.title}
                </h3>
              </div>

              <span>↗</span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}