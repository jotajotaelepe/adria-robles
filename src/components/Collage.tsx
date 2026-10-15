import { collage, COLLAGE_W, COLLAGE_H } from "@/data/collage";
import Layer from "./Layer";
import styles from "./Collage.module.css";

/** Projects scattered across the page. Absolute canvas on desktop, a staggered column on phones. */
export default function Collage() {
  return (
    <section className={styles.collage} id="projects" aria-label="Selected work">
      <div className={styles.canvas} style={{ aspectRatio: `${COLLAGE_W} / ${COLLAGE_H}` }}>
        {collage.map((it) => (
          <Layer key={it.id} item={it} frame={{ w: COLLAGE_W, h: COLLAGE_H }} flow reveal={it.kind === "img"} />
        ))}
      </div>
    </section>
  );
}
