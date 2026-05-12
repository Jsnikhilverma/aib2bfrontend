import corporateImg from "@/assets/cat-corporate.jpg";
import photoImg from "@/assets/cat-photo.jpg";
import hamperImg from "@/assets/cat-hamper.jpg";
import drinkwareImg from "@/assets/cat-drinkware.jpg";
import stationeryImg from "@/assets/cat-stationery.jpg";
import awardsImg from "@/assets/cat-awards.jpg";

export const WHATSAPP_NUMBER = "919876543210"; // +91 98765 43210
export const BRAND = "Photofinite";
export const TAGLINE = "Premium Corporate Gifts & Personalized Photo Products";

export type Category = {
  slug: string;
  name: string;
  description: string;
  image: string;
};

export const categories: Category[] = [
  {
    slug: "corporate-gifting",
    name: "Corporate Gifting",
    description: "Curated gift sets for clients, employees & partners.",
    image: corporateImg,
  },
  {
    slug: "photo-personalization",
    name: "Photo Personalization",
    description: "Frames, albums & prints with your favorite memories.",
    image: photoImg,
  },
  {
    slug: "festive-hampers",
    name: "Festive Hampers",
    description: "Diwali, New Year & celebration gift hampers.",
    image: hamperImg,
  },
  {
    slug: "drinkware",
    name: "Drinkware",
    description: "Personalized mugs, bottles & sippers.",
    image: drinkwareImg,
  },
  {
    slug: "stationery",
    name: "Stationery & Diaries",
    description: "Branded notebooks, planners & pen sets.",
    image: stationeryImg,
  },
  {
    slug: "awards-trophies",
    name: "Awards & Trophies",
    description: "Recognition pieces crafted in crystal & wood.",
    image: awardsImg,
  },
];

export type Product = {
  slug: string;
  name: string;
  category: string; // category slug
  price: string;
  moq: number;
  shortDescription: string;
  description: string;
  specs: { label: string; value: string }[];
  image: string;
  featured?: boolean;
};

export const products: Product[] = [
  {
    slug: "emerald-signature-gift-box",
    name: "Emerald Signature Gift Box",
    category: "corporate-gifting",
    price: "₹1,499",
    moq: 25,
    shortDescription: "Premium emerald gift box with gold ribbon — perfect for executive gifting.",
    description:
      "Our flagship signature gift box, hand-finished in deep emerald with a gold satin ribbon. Customizable interiors — we can curate it with chocolates, dry fruits, gourmet jars, branded merchandise, or any combination you prefer. Comes with optional foil-stamped logo on the lid.",
    specs: [
      { label: "Box Size", value: "10 x 8 x 4 inches" },
      { label: "Material", value: "Rigid board with linen finish" },
      { label: "Customization", value: "Logo foil stamping, custom interiors" },
      { label: "Lead Time", value: "7–10 working days" },
    ],
    image: corporateImg,
    featured: true,
  },
  {
    slug: "wooden-photo-frame",
    name: "Heritage Wooden Photo Frame",
    category: "photo-personalization",
    price: "₹599",
    moq: 10,
    shortDescription: "Solid teak photo frame with custom engraving and your photo printed on premium paper.",
    description:
      "A timeless teak wood frame, hand-finished and ready to display your most cherished memory. Includes high-resolution photo printing on archival matte paper, plus an engraved caption of your choice on the base.",
    specs: [
      { label: "Frame Size", value: "8 x 10 inches" },
      { label: "Material", value: "Solid teak wood" },
      { label: "Print", value: "Archival matte, fade-resistant" },
      { label: "Personalization", value: "Engraved caption (up to 30 chars)" },
    ],
    image: photoImg,
    featured: true,
  },
  {
    slug: "diwali-celebration-hamper",
    name: "Diwali Celebration Hamper",
    category: "festive-hampers",
    price: "₹2,299",
    moq: 20,
    shortDescription: "Festive hamper with gourmet chocolates, dry fruits, candles & artisanal treats.",
    description:
      "A thoughtfully curated festive hamper — Belgian chocolates, premium dry fruits in glass jars, a hand-poured soy candle, and traditional sweets. Presented in a wicker basket with silk ribbon. Custom branded card included.",
    specs: [
      { label: "Contents", value: "8 curated items" },
      { label: "Packaging", value: "Wicker basket with silk wrap" },
      { label: "Customization", value: "Branded greeting card" },
      { label: "Lead Time", value: "10–14 working days" },
    ],
    image: hamperImg,
    featured: true,
  },
  {
    slug: "personalized-photo-mug",
    name: "Personalized Photo Mug",
    category: "drinkware",
    price: "₹249",
    moq: 50,
    shortDescription: "Premium ceramic mug with full-wrap photo printing — dishwasher safe.",
    description:
      "350ml premium white ceramic mug with full-wrap sublimation printing. Use any photograph, design, or brand artwork. Dishwasher and microwave safe. Ships in protective gift box.",
    specs: [
      { label: "Capacity", value: "350 ml" },
      { label: "Material", value: "AAA-grade ceramic" },
      { label: "Print", value: "Full-wrap sublimation" },
      { label: "MOQ", value: "50 units" },
    ],
    image: drinkwareImg,
  },
  {
    slug: "executive-leather-diary",
    name: "Executive Leather Diary",
    category: "stationery",
    price: "₹899",
    moq: 25,
    shortDescription: "Genuine leather A5 diary with brass pen — debossed with your logo.",
    description:
      "A5 hardbound diary in genuine tan leather with a magnetic flap closure. 240 ruled pages on 100gsm ivory paper. Includes a matching brass pen and gift box. Logo debossing or foil-stamping available.",
    specs: [
      { label: "Size", value: "A5 (5.8 x 8.3 in)" },
      { label: "Pages", value: "240, 100gsm ivory" },
      { label: "Cover", value: "Genuine leather" },
      { label: "Branding", value: "Deboss or gold foil" },
    ],
    image: stationeryImg,
  },
  {
    slug: "crystal-pinnacle-award",
    name: "Crystal Pinnacle Award",
    category: "awards-trophies",
    price: "₹1,899",
    moq: 5,
    shortDescription: "Optical crystal trophy with custom engraving — for milestones that deserve more.",
    description:
      "A precision-cut optical crystal trophy mounted on a polished black wood base with engraved brass plate. Perfect for annual awards, milestone recognition, and partner appreciation events.",
    specs: [
      { label: "Height", value: "9 inches" },
      { label: "Material", value: "Optical crystal + black wood" },
      { label: "Engraving", value: "Brass plate, up to 4 lines" },
      { label: "Lead Time", value: "10–12 working days" },
    ],
    image: awardsImg,
    featured: true,
  },
];

export const getCategory = (slug: string) => categories.find((c) => c.slug === slug);
export const getProduct = (slug: string) => products.find((p) => p.slug === slug);
export const getProductsByCategory = (slug: string) =>
  products.filter((p) => p.category === slug);

export const buildWhatsAppLink = (message: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
