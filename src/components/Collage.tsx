import { collage, COLLAGE_W, COLLAGE_H } from "@/data/collage";
import { projects } from "@/data/projects";
import FrogHunt from "./FrogHunt";
import Layer from "./Layer";
import ProjectCarousel from "./ProjectCarousel";
import styles from "./Collage.module.css";

const frame = { w: COLLAGE_W, h: COLLAGE_H };

// Stickers/props and projects share one canvas; sorted top-to-bottom so the phone column reads in order.
const entries = [
  ...collage.map((item) => ({ kind: "layer" as const, item, x: item.x, y: item.y })),
  ...projects.map((project) => ({ kind: "project" as const, project, x: project.x, y: project.y })),
].sort((a, b) => a.y - b.y || a.x - b.x);

/** Projects scattered across the page. Absolute canvas on desktop, a staggered column on phones. */
export default function Collage() {
  return (
    <section className={styles.collage} id="projects" aria-label="Selected work">
      <div className={styles.canvas} style={{ aspectRatio: `${COLLAGE_W} / ${COLLAGE_H}` }}>
        {entries.map((e) =>
          e.kind === "project" ? (
            <ProjectCarousel key={e.project.id} project={e.project} frame={frame} />
          ) : (
            <Layer key={e.item.id} item={e.item} frame={frame} flow reveal={e.item.kind === "img"} />
          ),
        )}
        <FrogHunt />
      </div>
    </section>
  );
}
