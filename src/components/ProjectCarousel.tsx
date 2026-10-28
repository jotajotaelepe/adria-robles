"use client";

import { useEffect, useRef, useState } from "react";
import type { Project } from "@/data/projects";
import styles from "./ProjectCarousel.module.css";
import { useReveal } from "./useReveal";

type Props = { project: Project; frame: { w: number; h: number } };

const pct = (n: number) => `${n * 100}%`;

// The two arrows from Figma's squiggle.svg, split apart
const LeftArrow = () => (
  <svg viewBox="0 0 42 29" aria-hidden="true">
    <path
      fill="currentColor"
      d="M1.3912 14.7517L0.645672 14.0744L2.85779e-05 14.785L0.678956 15.4639L1.3912 14.7517ZM13.4226 28.2075C13.816 28.6009 14.4537 28.6009 14.8471 28.2075C15.2405 27.8142 15.2405 27.1764 14.8471 26.783L14.1349 27.4953L13.4226 28.2075ZM1.3912 14.7517V15.759H41.9695V14.7517V13.7444H1.3912V14.7517ZM1.3912 14.7517L0.678956 15.4639L13.4226 28.2075L14.1349 27.4953L14.8471 26.783L2.10344 14.0395L1.3912 14.7517ZM1.3912 14.7517L2.13672 15.429L14.8804 1.40228L14.1349 0.724954L13.3893 0.0476264L0.645672 14.0744L1.3912 14.7517Z"
    />
  </svg>
);
const RightArrow = () => (
  <svg viewBox="90 0 42 29" aria-hidden="true">
    <path
      fill="currentColor"
      d="M130.609 13.7507L131.354 14.428L132 13.7174L131.321 13.0385L130.609 13.7507ZM118.577 0.294892C118.184 -0.098467 117.546 -0.0984651 117.153 0.294897C116.76 0.688258 116.76 1.32602 117.153 1.71938L117.865 1.00714L118.577 0.294892ZM130.609 13.7507L130.609 12.7434L90.0305 12.7435L90.0305 13.7507L90.0305 14.758L130.609 14.758L130.609 13.7507ZM130.609 13.7507L131.321 13.0385L118.577 0.294892L117.865 1.00714L117.153 1.71938L129.897 14.463L130.609 13.7507ZM130.609 13.7507L129.863 13.0734L117.12 27.1001L117.865 27.7775L118.611 28.4548L131.354 14.428L130.609 13.7507Z"
    />
  </svg>
);

/** One project: its first image sits in the collage; title, arrows and counter go below. Each project is its own carousel. */
export default function ProjectCarousel({ project, frame }: Props) {
  const { id, title, x, y, w, z, slides } = project;
  const n = slides.length;
  const multi = n > 1;
  const [i, setI] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const swipe = useRef<number | null>(null);

  useReveal(ref, true, styles.in);

  // warm the neighbours so slides swap instantly
  useEffect(() => {
    if (!multi) return;
    for (const k of [i + 1, i - 1]) {
      const img = new Image();
      img.src = slides[(k + n) % n].src;
    }
  }, [i, multi, n, slides]);

  const go = (d: number) => setI((v) => (v + d + n) % n);
  const first = slides[0];
  const cur = slides[i];

  return (
    <article
      ref={ref}
      className={styles.project}
      style={
        {
          left: pct(x / frame.w),
          top: pct(y / frame.h),
          width: pct(w / frame.w),
          "--z": z,
          "--mw": `${Math.min(92, Math.max(40, (w / 1920) * 220))}%`,
          "--xr": Math.min(1, Math.max(0, x / (1920 - w))),
          "--r": `${(((x * 13 + y * 7) % 9) - 4) * 0.6}deg`,
        } as React.CSSProperties
      }
    >
      <div
        className={`${styles.frame} ${multi ? styles.clickable : ""}`}
        style={{ aspectRatio: `${first.w} / ${first.h}` }}
        onClick={multi ? () => go(1) : undefined}
        onPointerDown={(e) => (swipe.current = e.clientX)}
        onPointerUp={(e) => {
          if (swipe.current !== null && multi && Math.abs(e.clientX - swipe.current) > 48) {
            go(e.clientX < swipe.current ? 1 : -1);
            e.preventDefault();
          }
          swipe.current = null;
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          key={cur.src}
          className={styles.slide}
          src={cur.src}
          alt={`${title}, image ${i + 1} of ${n}`}
          width={cur.w}
          height={cur.h}
          draggable={false}
          loading="lazy"
          decoding="async"
        />
      </div>

      <div className={styles.caption}>
        <h2 className={styles.title}>{title}</h2>
        <div className={styles.controls} data-project={id}>
          <button type="button" onClick={() => go(-1)} disabled={!multi} aria-label={`Previous image of ${title}`}>
            <LeftArrow />
          </button>
          <span className={styles.count} aria-live="polite">
            {i + 1}/{n}
          </span>
          <button type="button" onClick={() => go(1)} disabled={!multi} aria-label={`Next image of ${title}`}>
            <RightArrow />
          </button>
        </div>
      </div>
    </article>
  );
}
