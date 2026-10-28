// Each project is a carousel: slides[0] is the image shown in the collage, the rest are reached with the arrows.
// Titles are placeholders inferred from the images — edit here (or in the CMS later).

export type Slide = { src: string; w: number; h: number };

export type Project = {
  id: string;
  title: string;
  /** position in the collage (design px @1920, y from top of collage) */
  x: number;
  y: number;
  w: number;
  z: number;
  slides: Slide[];
};

export const projects: Project[] = [
  { id: "dove", title: "Dove", x: 1050, y: 83, w: 739, z: 12, slides: [{ src: "/img/dauphine-packs-1.png", w: 1920, h: 1080 }] },
  { id: "racing-flash", title: "Racing Flash", x: 290, y: 30, w: 598, z: 5, slides: [{ src: "/img/flash-page-1.png", w: 1440, h: 1800 }] },
  { id: "spotify-equal", title: "Spotify EQUAL", x: 114, y: 946, w: 629, z: 22, slides: [{ src: "/img/1746745547698-1.jpg", w: 1558, h: 1288 }] },
  { id: "alien-taco", title: "Alien Taco", x: 1042, y: 726, w: 530, z: 2, slides: [{ src: "/img/img-1141-1.jpg", w: 1760, h: 2200 }] },
  { id: "times-square", title: "Times Square", x: 306, y: 1645, w: 616, z: 4, slides: [{ src: "/img/11-1.png", w: 1500, h: 840 }] },
  { id: "cadillac-racing", title: "Cadillac Racing", x: 1195, y: 1676, w: 502, z: 26, slides: [{ src: "/img/02-1.png", w: 1440, h: 1800 }] },
  { id: "sonido-perpetuo", title: "Sonido Perpetuo", x: 216, y: 2148, w: 475, z: 13, slides: [{ src: "/img/projects/sonido-perpetuo-1.jpg", w: 1210, h: 1080 }] },
  { id: "cadillac-live", title: "Cadillac Live", x: 193, y: 2723, w: 833, z: 27, slides: [{ src: "/img/livestreamtrim-1.png", w: 640, h: 360 }] },
  { id: "adhoc-coffee", title: "ADHOC Coffee", x: 1136, y: 3392, w: 420, z: 7, slides: [{ src: "/img/photo34-31-1.jpg", w: 1272, h: 1895 }] },
  { id: "kfc", title: "KFC", x: 906, y: 4262, w: 753, z: 44, slides: [{ src: "/img/projects/kfc-1.png", w: 2085, h: 1236 }] },
];
