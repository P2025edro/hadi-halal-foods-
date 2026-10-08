/**
 * Store sections. Copy describes what each aisle is for, not specific stock,
 * prices or guaranteed availability.
 */

export type ArtKey =
  | "fruit"
  | "vegetables"
  | "halal"
  | "asian"
  | "dairy"
  | "confectionery"
  | "newspapers"
  | "topups";

export type Category = {
  slug: string;
  name: string;
  art: ArtKey;
  tagline: string;
  summary: string;
  body: string[];
  lookFor: string[];
};

export const categories: Category[] = [
  {
    slug: "fruit",
    name: "Fruit",
    art: "fruit",
    tagline: "Colour for the fruit bowl",
    summary: "Everyday favourites and seasonal fruit for lunchboxes, breakfasts and snacking.",
    body: [
      "Our fruit section is where most visits start. It is set up for quick everyday top-ups as well as a bigger weekly shop.",
      "What is on the shelf changes with the seasons, so pop in to see what has arrived.",
    ],
    lookFor: ["Everyday staples like apples and bananas", "Citrus for cooking and juicing", "Seasonal fruit when it is available"],
  },
  {
    slug: "vegetables",
    name: "Vegetables",
    art: "vegetables",
    tagline: "The base of every good meal",
    summary: "Kitchen staples and fresh vegetables for home cooking, from weeknight dinners to family meals.",
    body: [
      "From onions and potatoes to leafy greens, the vegetable section covers the basics most recipes start with.",
      "Range varies through the year. If you are cooking something specific, ask in store.",
    ],
    lookFor: ["Onions, potatoes and root vegetables", "Fresh herbs and greens", "Peppers, tomatoes and cooking staples"],
  },
  {
    slug: "halal-food-and-meat",
    name: "Halal Food & Meat",
    art: "halal",
    tagline: "Halal choices for your table",
    summary: "A halal food selection for everyday cooking and family meals.",
    body: [
      "Halal food is at the heart of the shop. This section brings together halal products for home cooking.",
      "Please ask a member of staff about specific products and how they are sourced.",
    ],
    lookFor: ["Halal food for everyday cooking", "Ingredients for family meals", "Ask in store about specific products"],
  },
  {
    slug: "asian-groceries",
    name: "Asian Groceries",
    art: "asian",
    tagline: "Flavours from home",
    summary: "Rice, spices, lentils, sauces and pantry staples for cooking the dishes you love.",
    body: [
      "The Asian grocery aisles are stocked for real home cooking, with pantry staples that can be hard to find in a regular supermarket.",
      "Looking for something in particular? Let us know and we will tell you if we have it.",
    ],
    lookFor: ["Rice, flour and lentils", "Spices and spice blends", "Sauces, pickles and pantry staples"],
  },
  {
    slug: "dairy",
    name: "Dairy",
    art: "dairy",
    tagline: "Chilled everyday basics",
    summary: "Milk, yoghurt, butter and cheese from the chiller, ready for the week ahead.",
    body: [
      "Our chilled section covers the everyday dairy basics most households go through every week.",
      "Handy for a quick stop when you have run out of milk on the way home.",
    ],
    lookFor: ["Milk and cream", "Yoghurt and butter", "Cheese and chilled basics"],
  },
  {
    slug: "confectionery",
    name: "Confectionery",
    art: "confectionery",
    tagline: "Something sweet",
    summary: "Chocolate, sweets, biscuits and treats for sharing, gifting or a little pick-me-up.",
    body: [
      "Treats for the kids, biscuits for the tea break and sweets for sharing.",
      "A good spot for something small to bring when visiting friends and family.",
    ],
    lookFor: ["Chocolate and sweets", "Biscuits and snacks", "Treats for sharing"],
  },
  {
    slug: "newspapers-and-essentials",
    name: "Newspapers & Essentials",
    art: "newspapers",
    tagline: "The daily bits and pieces",
    summary: "Newspapers alongside household and everyday essentials, all in one stop.",
    body: [
      "Pick up a newspaper together with the household and personal essentials you need to keep the week running.",
      "It saves a separate trip for the small things.",
    ],
    lookFor: ["Newspapers", "Household cleaning basics", "Everyday personal essentials"],
  },
  {
    slug: "top-ups-and-convenience",
    name: "Top-Ups & Convenience",
    art: "topups",
    tagline: "Quick and close to home",
    summary: "Phone top-ups and convenience items for when you need something quickly.",
    body: [
      "A local shop is often the quickest way to sort the small things. Ask at the counter about top-ups.",
      "Grab drinks, snacks and everyday convenience items while you are here.",
    ],
    lookFor: ["Phone top-ups (ask at the counter)", "Drinks and snacks", "Grab-and-go convenience items"],
  },
];

export function getCategory(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}
