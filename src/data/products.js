import rangeDining from "../assets/range-dining.png";
import rangeLiving from "../assets/range-living.png";
import rangeBedroom from "../assets/range-bedroom.png";

import room1 from "../assets/room-1.png";
import room2 from "../assets/room-2.png";

import galleryShelf from "../assets/gallery-shelf.png";
import galleryChair from "../assets/gallery-chair.png";
import galleryDesk from "../assets/gallery-desk.png";
import galleryStools from "../assets/gallery-stools.png";
import galleryDining from "../assets/gallery-dining.png";
import galleryBed from "../assets/gallery-bed.png";
import galleryVase from "../assets/gallery-vase.png";
import galleryTable from "../assets/gallery-table.png";
import galleryKitchen from "../assets/gallery-kitchen.png";

// Temporary hero picture. Change it when you export hero.png from Figma.
export const heroImage = "https://picsum.photos/id/1067/1920/900";

export const ranges = [
  { id: 1, name: "Dining", image: rangeDining },
  { id: 2, name: "Living", image: rangeLiving },
  { id: 3, name: "Bedroom", image: rangeBedroom },
];

// Cards 3 and 4 use temporary pictures. Change them when you export room-3.png and room-4.png.
export const rooms = [
  { id: 1, type: "Bed Room", title: "Inner Peace", image: room1 },
  { id: 2, type: "Living Room", title: "Calm Corner", image: room2 },
  { id: 3, type: "Dining Room", title: "Warm Table", image: galleryDining },
  { id: 4, type: "Bed Room", title: "Soft Light", image: galleryBed },
];

// Each inner list is one column of the gallery
export const galleryColumns = [
  [
    { name: "shelf", src: galleryShelf, alt: "Shelf with plants" },
    { name: "chair", src: galleryChair, alt: "Yellow armchair" },
  ],
  [
    { name: "desk", src: galleryDesk, alt: "Desk with laptop" },
    { name: "stools", src: galleryStools, alt: "Stools with vase" },
  ],
  [{ name: "dining", src: galleryDining, alt: "Dining room" }],
  [
    { name: "bed", src: galleryBed, alt: "Bed with bench" },
    { name: "vase", src: galleryVase, alt: "Frame and vase" },
  ],
  [
    { name: "table", src: galleryTable, alt: "Brick wall and table" },
    { name: "kitchen", src: galleryKitchen, alt: "Kitchen wall" },
  ],
];