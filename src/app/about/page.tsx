import type { Metadata } from "next";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import styles from "./about.module.css";

export const metadata: Metadata = { title: "About — Adria Robles" };

export default function About() {
  return (
    <>
      <Header title="¡Hola, Hello!" titleHref="/" />
      <main className={styles.page}>
        <div className={styles.copy}>
          <p>
            Welcome to my site! Here, you&rsquo;ll find a curated collection of creative systems, brands, and things I
            make&mdash;spanning commercial projects, UI design, and event installations. Each piece reflects my creative
            process, offering insight into the ideas that drive me and the results they inspire.
          </p>
          <p>
            With 18+ years of experience as a Graphic Designer and Creative Art Director, I lead end-to-end campaigns for
            global brands like Cadillac, Dove, and Spotify. Splitting my time between the state of Sonora in northern
            Mexico and Mexico City, I operate at the intersection of technology and creative leadership. I actively
            integrate AI craft and generative systems into my workflow to shape new visual languages, all while mentoring
            teams and building cultures that push the boundaries of design.
          </p>
          <p>
            I remain a hands-on maker, bringing a tactile, human perspective to every project. Color, textures, and
            thoughtful design anchor my work, fueled by my lifelong inspirations: food, street markets, object curation,
            playlists, and 35mm film.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
