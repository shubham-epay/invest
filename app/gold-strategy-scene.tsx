import './gold-strategy-scene.css';

/** Fictional editorial scene. Market Watch below provides actual provider data. */
export function GoldStrategyScene() {
  return <figure className="gold-strategy-scene">
    <div className="gold-strategy-frame">
      <img
        src="/brand/invest-gold-strategy.webp"
        width="1536"
        height="1024"
        alt="A fictional gold trader's workstation with market charts, a strategy being reviewed on paper and a small gold bar on the desk"
        fetchPriority="high"
        decoding="async"
      />
    </div>
    <figcaption><span>GOLD <span aria-hidden="true">/</span> A WORLD IN MOTION</span><span>Conceptual trading scene</span></figcaption>
  </figure>;
}
