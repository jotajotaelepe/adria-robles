import { heroDesktop, heroMobile, HERO_DESKTOP, HERO_MOBILE } from "@/data/hero";
import Layer from "./Layer";
import styles from "./Hero.module.css";

/** The cardboard "AR" opening scene. Desktop and mobile are separate compositions from Figma. */
export default function Hero() {
  return (
    <section className={styles.hero} aria-label="Adria Robles">
      <div className={styles.desktop} style={{ aspectRatio: `${HERO_DESKTOP.w} / ${HERO_DESKTOP.h}` }}>
        {heroDesktop.map((it, i) => (
          <Layer key={it.id} item={it} frame={HERO_DESKTOP} draggable={i > 0} priority />
        ))}
      </div>
      <div className={styles.mobile} style={{ aspectRatio: `${HERO_MOBILE.w} / ${HERO_MOBILE.h}` }}>
        {heroMobile.map((it, i) => (
          <Layer key={it.id} item={it} frame={HERO_MOBILE} draggable={i > 0} priority />
        ))}
      </div>
    </section>
  );
}
