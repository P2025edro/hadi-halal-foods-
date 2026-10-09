import type { PhotoKey } from "./images";

/**
 * Store sections. Copy describes what each section is for — not specific
 * stock, prices, brands or guaranteed availability.
 */
export type Category = {
  slug: string;
  name: string;
  photo: PhotoKey;
  /** Short line shown under the name on cards. */
  tagline: string;
  /** One or two sentences for the category index and page intro. */
  summary: string;
  body: string[];
  lookFor: string[];
};

export const categories: Category[] = [
  {
    slug: "fruit",
    name: "Fruit",
    photo: "fruit",
    tagline: "Everyday fruit and what’s in season",
    summary: "Fruit for the fruit bowl, lunchboxes and breakfast, with seasonal arrivals through the year.",
    body: [
      "Most visits start here. The fruit section covers the everyday basics, from apples and bananas to citrus for cooking and juicing.",
      "What’s on the shelf changes with the seasons, so it’s worth a look each time you’re in.",
    ],
    lookFor: ["Apples, bananas and other everyday fruit", "Lemons, limes and oranges", "Seasonal fruit when it’s available"],
  },
  {
    slug: "vegetables",
    name: "Vegetables",
    photo: "vegetables",
    tagline: "The base of most home cooking",
    summary: "Onions, potatoes, greens and the vegetables most recipes start with.",
    body: [
      "The vegetable section is built around what people cook every week: onions, garlic, potatoes, carrots, peppers and greens.",
      "Range varies through the year. If you need something specific for a dish, ask at the counter.",
    ],
    lookFor: ["Onions, garlic and potatoes", "Carrots, peppers and tomatoes", "Fresh herbs and leafy greens"],
  },
  {
    slug: "halal-food-and-meat",
    name: "Halal Food & Meat",
    photo: "halal",
    tagline: "Halal food for family meals",
    summary: "Halal food for everyday cooking, from weeknight dinners to bigger family meals.",
    body: [
      "Halal food is at the centre of the shop, and this section brings it together for home cooking.",
      "For questions about a particular product or how it’s sourced, please ask a member of staff in store.",
    ],
    lookFor: ["Halal food for everyday cooking", "Ingredients for family meals", "Ask in store about specific products"],
  },
  {
    slug: "asian-groceries",
    name: "Asian Groceries",
    photo: "asian",
    tagline: "Rice, pulses, spices and sauces",
    summary: "Rice, flour, lentils, spices and pantry staples for the dishes you cook at home.",
    body: [
      "The Asian grocery shelves are stocked for real home cooking, with staples that can be hard to find in a large supermarket.",
      "If you’re looking for a particular brand or ingredient, ask us and we’ll tell you if we have it.",
    ],
    lookFor: ["Rice, flour and lentils", "Whole and ground spices", "Sauces, pickles and pantry staples"],
  },
  {
    slug: "dairy",
    name: "Dairy",
    photo: "dairy",
    tagline: "Milk, yoghurt, butter and cheese",
    summary: "Chilled basics for the week: milk, yoghurt, butter and cheese.",
    body: [
      "The chiller covers the dairy most households go through every week.",
      "Handy when you’ve run out of milk on the way home.",
    ],
    lookFor: ["Milk and cream", "Yoghurt and butter", "Cheese and other chilled basics"],
  },
  {
    slug: "confectionery",
    name: "Confectionery",
    photo: "confectionery",
    tagline: "Chocolate, sweets and biscuits",
    summary: "Chocolate, sweets and biscuits for the tea break, the kids or a visit to family.",
    body: [
      "Biscuits for the tea break, sweets for the kids and chocolate for sharing.",
      "A good place to pick up something small when you’re visiting friends or family.",
    ],
    lookFor: ["Chocolate and sweets", "Biscuits and snacks", "Treats for sharing"],
  },
  {
    slug: "newspapers-and-essentials",
    name: "Newspapers & Essentials",
    photo: "newspapers",
    tagline: "The paper and the household basics",
    summary: "Newspapers alongside household and everyday essentials, in the same stop.",
    body: [
      "Pick up the paper with the household and personal basics that keep the week running.",
      "It saves a separate trip for the small things.",
    ],
    lookFor: ["Newspapers", "Household cleaning basics", "Everyday personal care"],
  },
  {
    slug: "top-ups-and-convenience",
    name: "Top-Ups & Convenience",
    photo: "topups",
    tagline: "Phone top-ups and quick essentials",
    summary: "Phone top-ups and grab-and-go items for when you need something quickly.",
    body: [
      "Ask at the counter about phone top-ups.",
      "Drinks, snacks and everyday convenience items are close to hand for a quick stop.",
    ],
    lookFor: ["Phone top-ups (ask at the counter)", "Drinks and snacks", "Grab-and-go items"],
  },
];

export function getCategory(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}
