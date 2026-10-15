"use client";

import { useEffect, useState } from "react";
import styles from "./FrogHunt.module.css";

// Where the frogs hide, as % of the collage canvas, plus size (design px @1920) and tilt.
const FROGS = [
  { x: 2.5, y: 5, s: 70, r: -14 },
  { x: 92, y: 13, s: 64, r: 18 },
  { x: 46, y: 25, s: 58, r: -6 },
  { x: 6, y: 39, s: 76, r: 10 },
  { x: 89, y: 53, s: 66, r: -20 },
  { x: 51, y: 67, s: 60, r: 8 },
  { x: 3, y: 83, s: 72, r: -10 },
  { x: 86, y: 94, s: 68, r: 14 },
] as const;

const KEY = "ar-frogs-found";
const CONFETTI = ["#fde459", "#bee8ff", "#8846cb", "#6bbf59", "#ff7fa8"];

/** Eight frogs are hiding in the collage; click them all. Progress is remembered in the browser. */
export default function FrogHunt() {
  const [found, setFound] = useState<number[]>([]);
  const [ready, setReady] = useState(false);
  const [party, setParty] = useState(false);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(KEY) ?? "[]");
      if (Array.isArray(saved)) setFound(saved.filter((n) => Number.isInteger(n)));
    } catch {}
    setReady(true);
  }, []);

  const save = (next: number[]) => {
    setFound(next);
    try {
      localStorage.setItem(KEY, JSON.stringify(next));
    } catch {}
  };

  const collect = (i: number) => {
    if (found.includes(i)) return;
    const next = [...found, i];
    save(next);
    if (next.length === FROGS.length) {
      setParty(true);
      setTimeout(() => setParty(false), 3500);
    }
  };

  const done = found.length === FROGS.length;

  return (
    <>
      <div className={styles.field} aria-hidden={!ready}>
        {ready &&
          FROGS.map((f, i) =>
            found.includes(i) ? null : (
              <button
                key={i}
                type="button"
                className={styles.frog}
                style={
                  {
                    left: `${f.x}%`,
                    top: `${f.y}%`,
                    "--s": f.s,
                    "--r": `${f.r}deg`,
                  } as React.CSSProperties
                }
                onClick={() => collect(i)}
                aria-label={`Hidden frog ${i + 1} of ${FROGS.length}. Collect it`}
              >
                <span className={styles.sprite}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/img/ranita-1.png" alt="" draggable={false} />
                </span>
              </button>
            ),
          )}
      </div>

      {ready && (
        <div className={styles.hud} role="status" aria-live="polite">
          {done ? (
            <>
              You found them all!{" "}
              <button type="button" className={styles.again} onClick={() => save([])}>
                play again
              </button>
            </>
          ) : (
            <>
              Find the frogs! <b>{found.length}/{FROGS.length}</b>
            </>
          )}
        </div>
      )}

      {party && (
        <div className={styles.confetti} aria-hidden="true">
          {Array.from({ length: 48 }, (_, i) => {
            const a = (i / 48) * Math.PI * 2 + (i % 3) * 0.3;
            const d = 160 + ((i * 53) % 260);
            return (
              <i
                key={i}
                style={
                  {
                    "--dx": `${Math.cos(a) * d}px`,
                    "--dy": `${Math.sin(a) * d - 80}px`,
                    "--rot": `${(i * 47) % 360}deg`,
                    background: CONFETTI[i % CONFETTI.length],
                    animationDelay: `${(i % 6) * 30}ms`,
                  } as React.CSSProperties
                }
              />
            );
          })}
        </div>
      )}
    </>
  );
}
