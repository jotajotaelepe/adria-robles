import { collage, COLLAGE_W, COLLAGE_H } from "@/data/collage";
import { projects } from "@/data/projects";
import FrogHunt from "./FrogHunt";
import Layer from "./Layer";
import ProjectCarousel from "./ProjectCarousel";
import styles from "./Collage.module.css";

const frame = { w: COLLAGE_W, h: COLLAGE_H };

// How each loose piece behaves on a phone. Anything not listed (photos) flows as-is.
const MOBILE: Record<string, "sticker" | "tape" | "hide"> = {
  // glass/plastic overlays and the scribble ring only make sense stacked on a photo
  "6:265": "hide",
  "6:266": "hide",
  "6:262": "hide",
  // tape that holds the next photo
  "6:145": "tape",
  "6:147": "tape",
  // small stickers
  "6:259": "sticker",
  "9:292": "sticker",
  "51:50": "sticker",
  "6:263": "sticker",
  "6:235": "sticker",
  "6:261": "sticker",
  "6:248": "sticker",
  "6:252": "sticker",
  "6:249": "sticker",
  "28:212": "sticker",
};

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
            <Layer key={e.item.id} item={e.item} frame={frame} flow reveal={e.item.kind === "img"} mobile={MOBILE[e.item.id]} />
          ),
        )}
        <FrogHunt />
      </div>
    </section>
  );
}
