"use client";

import Image from "next/image";
import { useRef } from "react";
import type { CollageItem } from "@/data/collage";
import styles from "./Layer.module.css";
import { useReveal } from "./useReveal";

type Props = {
  item: CollageItem;
  /** design-frame size the item's x/y/w/h are measured against */
  frame: { w: number; h: number };
  draggable?: boolean;
  priority?: boolean;
  /** below 768px, drop out of the absolute canvas and stack in a column */
  flow?: boolean;
  /** fade/rise into place the first time it scrolls into view */
  reveal?: boolean;
};

const pct = (n: number) => `${n * 100}%`;

/** One Figma layer, positioned as a percentage of its frame so the whole composition scales. */
export default function Layer({ item, frame, draggable, priority, flow, reveal }: Props) {
  const { x, y, w, h, z, crop, src, label, kind } = item;
  const ref = useRef<HTMLDivElement>(null);
  const drag = useRef<{ sx: number; sy: number; ox: number; oy: number } | null>(null);

  useReveal(ref, !!reveal, styles.in);

  const onDown = (e: React.PointerEvent) => {
    if (!draggable || !ref.current) return;
    const cur = ref.current.dataset;
    drag.current = { sx: e.clientX, sy: e.clientY, ox: Number(cur.dx ?? 0), oy: Number(cur.dy ?? 0) };
    ref.current.setPointerCapture(e.pointerId);
    ref.current.classList.add(styles.grabbing);
  };
  const onMove = (e: React.PointerEvent) => {
    const d = drag.current;
    if (!d || !ref.current) return;
    const dx = d.ox + e.clientX - d.sx;
    const dy = d.oy + e.clientY - d.sy;
    ref.current.dataset.dx = String(dx);
    ref.current.dataset.dy = String(dy);
    ref.current.style.setProperty("--dx", `${dx}px`);
    ref.current.style.setProperty("--dy", `${dy}px`);
  };
  const onUp = () => {
    drag.current = null;
    ref.current?.classList.remove(styles.grabbing);
  };

  // Rendered width of the picture itself, so the browser downloads a size that matches
  const shown = crop ? crop[0] : 1;
  const desktopVw = Math.min(100, ((w * shown) / frame.w) * 100);
  const mobileVw = frame.w === 1080 ? Math.min(150, ((w * shown) / 1080) * 100) : Math.min(92, Math.max(26, (w / 1920) * 220)) * 0.9 * shown;
  const sizes = `(max-width: 767px) ${Math.ceil(mobileVw)}vw, ${Math.ceil(desktopVw)}vw`;
  const isSvg = src.endsWith(".svg");
  const picture = (
    <Image
      src={src}
      alt={kind === "arrows" ? "" : label}
      fill
      sizes={sizes}
      unoptimized={isSvg}
      draggable={false}
      // a sticker or hero image in view loads right away; everything else waits until it's near the screen
      loading="lazy"
      fetchPriority={priority ? "high" : "auto"}
      decoding="async"
    />
  );

  return (
    <div
      ref={ref}
      className={[styles.layer, kind === "arrows" && styles.arrows, draggable && styles.draggable, flow && styles.flow, reveal && styles.reveal]
        .filter(Boolean)
        .join(" ")}
      style={
        {
          left: pct(x / frame.w),
          top: pct(y / frame.h),
          width: pct(w / frame.w),
          height: pct(h / frame.h),
          zIndex: z,
          "--mw": `${Math.min(92, Math.max(26, (w / 1920) * 220))}%`,
          "--xr": Math.min(1, Math.max(0, x / (1920 - w))),
          "--ar": `${w} / ${h}`,
          "--r": `${(((x * 13 + y * 7) % 9) - 4) * 0.6}deg`,
          "--d": `${-((x + y) % 7)}s`,
        } as React.CSSProperties
      }
      onPointerDown={onDown}
      onPointerMove={onMove}
      onPointerUp={onUp}
      onPointerCancel={onUp}
    >
      {crop ? (
        <span
          className={styles.crop}
          style={{ width: pct(crop[0]), height: pct(crop[1]), left: pct(crop[2]), top: pct(crop[3]) }}
        >
          {picture}
        </span>
      ) : (
        picture
      )}
    </div>
  );
}
