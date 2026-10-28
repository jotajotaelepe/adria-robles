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
  /** extra space (design px) before the caption, when another photo overlaps the bottom of the image */
  captionGap?: number;
  slides: Slide[];
};

export const projects: Project[] = [
  { id: "dove", title: "Dove", x: 1050, y: 83, w: 739, z: 12, slides: [{ src: "/img/dauphine-packs-1.png", w: 1920, h: 1080 }, { src: "/img/projects/Dove/02.png", w: 387, h: 689 }, { src: "/img/projects/Dove/03.png", w: 551, h: 689 }, { src: "/img/projects/Dove/04.png", w: 387, h: 689 }] },
  { id: "racing-flash", title: "Racing Flash", x: 290, y: 30, w: 598, z: 5, slides: [{ src: "/img/flash-page-1.png", w: 1440, h: 1800 }, { src: "/img/projects/Racing%20Flash/02.png", w: 545, h: 682 }, { src: "/img/projects/Racing%20Flash/03.png", w: 546, h: 682 }, { src: "/img/projects/Racing%20Flash/04.png", w: 546, h: 682 }, { src: "/img/projects/Racing%20Flash/05.png", w: 545, h: 682 }, { src: "/img/projects/Racing%20Flash/06.png", w: 546, h: 683 }, { src: "/img/projects/Racing%20Flash/07.png", w: 546, h: 682 }, { src: "/img/projects/Racing%20Flash/08.png", w: 546, h: 682 }, { src: "/img/projects/Racing%20Flash/09.png", w: 546, h: 682 }] },
  { id: "spotify-equal", title: "Spotify EQUAL", x: 114, y: 946, w: 629, z: 22, slides: [{ src: "/img/1746745547698-1.jpg", w: 1558, h: 1288 }, { src: "/img/projects/Spotify/02.png", w: 285, h: 512 }] },
  { id: "alien-taco", title: "Alien Taco", x: 1042, y: 726, w: 530, z: 2, slides: [{ src: "/img/img-1141-1.jpg", w: 1760, h: 2200 }, { src: "/img/projects/Alien%20Taco/02.png", w: 757, h: 555 }, { src: "/img/projects/Alien%20Taco/03.png", w: 963, h: 555 }, { src: "/img/projects/Alien%20Taco/04.png", w: 555, h: 555 }, { src: "/img/projects/Alien%20Taco/05.png", w: 948, h: 546 }, { src: "/img/projects/Alien%20Taco/06.png", w: 529, h: 529 }, { src: "/img/projects/Alien%20Taco/07.png", w: 378, h: 524 }, { src: "/img/projects/Alien%20Taco/08.png", w: 524, h: 1109 }, { src: "/img/projects/Alien%20Taco/09.png", w: 820, h: 615 }, { src: "/img/projects/Alien%20Taco/10.png", w: 445, h: 617 }, { src: "/img/projects/Alien%20Taco/11.png", w: 514, h: 516 }, { src: "/img/projects/Alien%20Taco/12.png", w: 244, h: 434 }, { src: "/img/projects/Alien%20Taco/13.png", w: 418, h: 522 }, { src: "/img/projects/Alien%20Taco/14.png", w: 466, h: 583 }, { src: "/img/projects/Alien%20Taco/15.png", w: 960, h: 960 }, { src: "/img/projects/Alien%20Taco/16.png", w: 1000, h: 750 }, { src: "/img/projects/Alien%20Taco/17.png", w: 747, h: 934 }] },
  { id: "times-square", title: "Times Square", x: 306, y: 1645, w: 616, z: 4, slides: [{ src: "/img/11-1.png", w: 1500, h: 840 }] },
  { id: "cadillac-racing", title: "Cadillac Racing", x: 1195, y: 1676, w: 502, z: 26, slides: [{ src: "/img/projects/Cadillac/01.png", w: 542, h: 677 }, { src: "/img/projects/Cadillac/02.png", w: 541, h: 677 }, { src: "/img/projects/Cadillac/03.png", w: 542, h: 677 }, { src: "/img/projects/Cadillac/04.png", w: 542, h: 677 }, { src: "/img/projects/Cadillac/05.png", w: 541, h: 677 }] },
  { id: "sonido-perpetuo", title: "Sonido Perpetuo", x: 216, y: 2148, w: 475, z: 13, slides: [{ src: "/img/projects/Sonido%20Perpetuo/01.png", w: 636, h: 424 }, { src: "/img/projects/Sonido%20Perpetuo/02.png", w: 738, h: 441 }, { src: "/img/projects/Sonido%20Perpetuo/03.png", w: 859, h: 483 }, { src: "/img/projects/Sonido%20Perpetuo/04.png", w: 519, h: 519 }, { src: "/img/projects/Sonido%20Perpetuo/05.png", w: 737, h: 492 }, { src: "/img/projects/Sonido%20Perpetuo/06.png", w: 772, h: 516 }, { src: "/img/projects/Sonido%20Perpetuo/07.png", w: 550, h: 550 }, { src: "/img/projects/Sonido%20Perpetuo/08.png", w: 764, h: 511 }, { src: "/img/projects/Sonido%20Perpetuo/09.png", w: 759, h: 506 }] },
  { id: "cadillac-live", title: "Cadillac Live", x: 193, y: 2723, w: 833, z: 27, slides: [{ src: "/img/livestreamtrim-1.png", w: 640, h: 360 }] },
  { id: "adhoc-coffee", title: "ADHOC Coffee", x: 1192, y: 3304, w: 545, z: 6, slides: [{ src: "/img/screen-shot-2021-07-09-at-6-25-19-pm-upscayl-4x-.png", w: 2196, h: 2200 }, { src: "/img/projects/ADHOC/02.png", w: 598, h: 600 }, { src: "/img/projects/ADHOC/03.png", w: 599, h: 752 }, { src: "/img/projects/ADHOC/04.png", w: 597, h: 596 }, { src: "/img/projects/ADHOC/05.png", w: 754, h: 754 }, { src: "/img/projects/ADHOC/06.png", w: 689, h: 691 }, { src: "/img/projects/ADHOC/07.png", w: 691, h: 691 }] },
  { id: "kfc", title: "KFC", x: 906, y: 4262, w: 753, z: 44, slides: [{ src: "/img/projects/KFC/01.png", w: 484, h: 424 }, { src: "/img/projects/KFC/02.png", w: 655, h: 493 }, { src: "/img/projects/KFC/03.png", w: 563, h: 479 }, { src: "/img/projects/KFC/04.png", w: 500, h: 500 }, { src: "/img/projects/KFC/05.png", w: 317, h: 280 }, { src: "/img/projects/KFC/06.png", w: 886, h: 498 }] },
];
