"use client";

import { useEffect, useState } from "react";
import styles from "./LocalTime.module.css";

// Adria splits her time between Sonora and Mexico City; click the widget to flip between them.
const PLACES = [
  { name: "Sonora, MX", tz: "America/Hermosillo", lat: 29.07, lon: -110.96 },
  { name: "Mexico City", tz: "America/Mexico_City", lat: 19.43, lon: -99.13 },
] as const;

type Weather = { temp: number; code: number };

// WMO weather codes → plain words
function describe(code: number) {
  if (code === 0) return "clear skies";
  if (code <= 2) return "partly cloudy";
  if (code === 3) return "cloudy";
  if (code <= 48) return "foggy";
  if (code <= 57) return "drizzle";
  if (code <= 67) return "rain";
  if (code <= 77) return "snow";
  if (code <= 82) return "showers";
  return "thunderstorms";
}

export default function LocalTime() {
  const [now, setNow] = useState<Date | null>(null);
  const [i, setI] = useState(0);
  const [weather, setWeather] = useState<(Weather | null)[]>([null, null]);

  useEffect(() => {
    setNow(new Date());
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const ctrl = new AbortController();
    PLACES.forEach((p, idx) => {
      fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${p.lat}&longitude=${p.lon}&current=temperature_2m,weather_code`,
        { signal: ctrl.signal },
      )
        .then((r) => (r.ok ? r.json() : Promise.reject()))
        .then((j) => {
          const c = j.current;
          setWeather((w) => w.map((x, k) => (k === idx ? { temp: Math.round(c.temperature_2m), code: c.weather_code } : x)));
        })
        .catch(() => {});
    });
    return () => ctrl.abort();
  }, []);

  if (!now) return <div className={styles.widget} aria-hidden="true" />;

  const place = PLACES[i];
  const w = weather[i];
  const time = new Intl.DateTimeFormat("en-US", {
    timeZone: place.tz,
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
  }).format(now);

  return (
    <button
      type="button"
      className={styles.widget}
      onClick={() => setI((v) => (v + 1) % PLACES.length)}
      title="Click to switch city"
    >
      <span>{place.name}</span>
      <span className={styles.sep}>·</span>
      <span className={styles.time}>{time}</span>
      {w && (
        <>
          <span className={styles.sep}>·</span>
          <span>
            {w.temp}°C, <em>{describe(w.code)}</em>
          </span>
        </>
      )}
    </button>
  );
}
