/**
 * Licensed stock photography used across the site.
 *
 * None of these photographs show Hadi Halal Foods Grocery ltd. They are
 * illustrative food images under open licences (CC0, public domain or CC BY),
 * credited on /credits. Files live in /public/images/photos.
 *
 * To replace a photo, drop a new file in /public/images/photos, update its
 * entry below (size, alt text, credit), and every page using it updates.
 */

export type Licence = "CC0" | "Public domain" | "CC BY 2.0" | "CC BY 4.0";

export type PhotoAsset = {
  src: string;
  width: number;
  height: number;
  alt: string;
  /** CSS object-position focal point used when the photo is cropped. */
  focus?: string;
  credit: {
    title: string;
    author: string;
    source: "Wikimedia Commons" | "StockSnap";
    url: string;
    licence: Licence;
    licenceUrl?: string;
  };
};

const CC0 = "https://creativecommons.org/publicdomain/zero/1.0/";
const BY2 = "https://creativecommons.org/licenses/by/2.0/";
const BY4 = "https://creativecommons.org/licenses/by/4.0/";

const commons = (file: string) => `https://commons.wikimedia.org/wiki/File:${encodeURIComponent(file)}`;
const stocksnap = (id: string) => `https://stocksnap.io/photo/${id}`;

export const library = {
  onionsGarlicCrate: {
    src: "/images/photos/onions-garlic-crate.jpg",
    width: 2400,
    height: 1597,
    alt: "Hands sorting onions and garlic in a wooden crate",
    focus: "45% 55%",
    credit: {
      title: "Sorting fresh garlic and onions in a wooden crate",
      author: "Shixart1985",
      source: "Wikimedia Commons",
      url: commons("Sorting fresh garlic and onions in a wooden crate.jpg"),
      licence: "CC BY 2.0",
      licenceUrl: BY2,
    },
  },
  redPeppersCrate: {
    src: "/images/photos/red-peppers-crate.jpg",
    width: 1600,
    height: 2400,
    alt: "Red peppers piled in a wooden crate",
    focus: "50% 55%",
    credit: {
      title: "Fresh red peppers in a wooden crate",
      author: "Shixart1985",
      source: "Wikimedia Commons",
      url: commons("Fresh red peppers in a wooden crate.jpg"),
      licence: "CC BY 2.0",
      licenceUrl: BY2,
    },
  },
  vineTomatoes: {
    src: "/images/photos/vine-tomatoes.jpg",
    width: 2400,
    height: 1346,
    alt: "Small tomatoes on the vine",
    credit: {
      title: "Grape tomatoes on the vine at Ljubljana Central Market",
      author: "domdomegg",
      source: "Wikimedia Commons",
      url: commons("Grape tomatoes on the vine at Ljubljana Central Market.JPG"),
      licence: "CC BY 4.0",
      licenceUrl: BY4,
    },
  },
  aubergines: {
    src: "/images/photos/aubergines.jpg",
    width: 2400,
    height: 1350,
    alt: "Striped and purple aubergines stacked on a produce table",
    focus: "40% 50%",
    credit: {
      title: "USDA Farmers Market on the National Mall, 2023 (13)",
      author: "U.S. Department of Agriculture",
      source: "Wikimedia Commons",
      url: commons(
        "The USDA Farmers Market on the National Mall during the 2023 market season is the Department’s own “living laboratory” for farmers market operations across the country - 13.jpg",
      ),
      licence: "Public domain",
    },
  },
  onionsMarket: {
    src: "/images/photos/onions-market.jpg",
    width: 2400,
    height: 1351,
    alt: "Red and white onions in a produce crate",
    credit: {
      title: "USDA Farmers Market on the National Mall, 2023 (14)",
      author: "U.S. Department of Agriculture",
      source: "Wikimedia Commons",
      url: commons(
        "The USDA Farmers Market on the National Mall during the 2023 market season is the Department’s own “living laboratory” for farmers market operations across the country - 14.jpg",
      ),
      licence: "Public domain",
    },
  },
  clementinesBowl: {
    src: "/images/photos/clementines-bowl.jpg",
    width: 2400,
    height: 1594,
    alt: "Clementines with leaves in a wooden bowl",
    focus: "55% 45%",
    credit: {
      title: "Clémentines",
      author: "Frédérique Voisin-Demery",
      source: "Wikimedia Commons",
      url: commons("Clémentines (15900625349).jpg"),
      licence: "CC BY 2.0",
      licenceUrl: BY2,
    },
  },
  leeks: {
    src: "/images/photos/leeks.jpg",
    width: 1600,
    height: 2400,
    alt: "A bundle of fresh leeks",
    credit: {
      title: "Leeks, Harbourside Market, Wellington",
      author: "Daderot",
      source: "Wikimedia Commons",
      url: commons("Leeks - Harbourside Market, Wellington, New Zealand - DSC09771.jpg"),
      licence: "CC0",
      licenceUrl: CC0,
    },
  },
  grainSacks: {
    src: "/images/photos/grain-sacks.jpg",
    width: 960,
    height: 639,
    alt: "Open sacks of lentils, beans, grains and seeds",
    credit: { title: "Beans Legumes", author: "Paul Morris", source: "StockSnap", url: stocksnap("U2OWEI2S84"), licence: "CC0", licenceUrl: CC0 },
  },
  cookies: {
    src: "/images/photos/cookies.jpg",
    width: 960,
    height: 640,
    alt: "A stack of chocolate chip cookies",
    credit: { title: "Cookies", author: "StockSnap contributor", source: "StockSnap", url: stocksnap("8GDGE8GXMT"), licence: "CC0", licenceUrl: CC0 },
  },
  newspaper: {
    src: "/images/photos/newspaper.jpg",
    width: 960,
    height: 640,
    alt: "A folded newspaper next to a cup of coffee on a wooden table",
    focus: "60% 60%",
    credit: { title: "Still Items", author: "Markus Spiske", source: "StockSnap", url: stocksnap("91SCNRRD25"), licence: "CC0", licenceUrl: CC0 },
  },
  lemons: {
    src: "/images/photos/lemons.jpg",
    width: 960,
    height: 638,
    alt: "Whole and halved lemons on a white cloth",
    credit: { title: "Lemons Fruits", author: "StockSnap contributor", source: "StockSnap", url: stocksnap("W28QPZPAK6"), licence: "CC0", licenceUrl: CC0 },
  },
  appleBasket: {
    src: "/images/photos/apple-basket.jpg",
    width: 2400,
    height: 1600,
    alt: "Apples and citrus with rosemary in a woven basket",
    credit: {
      title: "Fresh fruits in a woven basket on a wooden table",
      author: "Shixart1985",
      source: "Wikimedia Commons",
      url: commons("Fresh fruits in a woven basket on a wooden table.jpg"),
      licence: "CC BY 2.0",
      licenceUrl: BY2,
    },
  },
  tomatoCarrotBasket: {
    src: "/images/photos/tomato-carrot-basket.jpg",
    width: 2400,
    height: 1602,
    alt: "Red and green tomatoes and carrots in a basket",
    credit: {
      title: "Colorful vegetables in nature closeup",
      author: "Nenad Stojkovic",
      source: "Wikimedia Commons",
      url: commons("Colorful vegetables in nature closeup. Healthy concept.jpg"),
      licence: "CC BY 2.0",
      licenceUrl: BY2,
    },
  },
  rawSteakSlate: {
    src: "/images/photos/raw-steak-slate.jpg",
    width: 2400,
    height: 1600,
    alt: "A raw cut of meat on a slate board with peppercorns and mint",
    focus: "40% 55%",
    credit: {
      title: "Fresh cut of meat on slate board with spices and herbs",
      author: "Shixart1985",
      source: "Wikimedia Commons",
      url: commons("Fresh cut of meat on slate board with spices and herbs.jpg"),
      licence: "CC BY 2.0",
      licenceUrl: BY2,
    },
  },
  pantryShelves: {
    src: "/images/photos/pantry-shelves.jpg",
    width: 2400,
    height: 1597,
    alt: "A hand reaching for a jar on wooden shelves of spices and dry goods",
    focus: "55% 45%",
    credit: {
      title: "Person reaches for a jar on a wooden shelf",
      author: "Shixart1985",
      source: "Wikimedia Commons",
      url: commons("Person reaches for a jar on a wooden shelf filled with various containers in a kitchen or pantry setting.jpg"),
      licence: "CC BY 2.0",
      licenceUrl: BY2,
    },
  },
  pantryHand: {
    src: "/images/photos/pantry-hand.jpg",
    width: 2400,
    height: 1597,
    alt: "Hands taking a jar of spice from a pantry shelf",
    focus: "45% 55%",
    credit: {
      title: "Person picks up a jar from a shelf in a kitchen",
      author: "Shixart1985",
      source: "Wikimedia Commons",
      url: commons("Person picks up a jar from a shelf in a kitchen during the daytime while organizing food items and ingredients.jpg"),
      licence: "CC BY 2.0",
      licenceUrl: BY2,
    },
  },
  grainBowl: {
    src: "/images/photos/grain-bowl.jpg",
    width: 1597,
    height: 2400,
    alt: "A hand dropping grains into a bowl on a kitchen counter",
    credit: {
      title: "Hand holding grains over a bowl in a kitchen",
      author: "Shixart1985",
      source: "Wikimedia Commons",
      url: commons("Hand holding grains over a bowl in a kitchen filled with various ingredients and cooking tools.jpg"),
      licence: "CC BY 2.0",
      licenceUrl: BY2,
    },
  },
  milkJugs: {
    src: "/images/photos/milk-jugs.jpg",
    width: 1597,
    height: 2400,
    alt: "Glass jugs of milk on a counter",
    focus: "50% 65%",
    credit: {
      title: "Milk is displayed in glass pitchers at a cafe counter",
      author: "Shixart1985",
      source: "Wikimedia Commons",
      url: commons("Milk is displayed in glass pitchers at a cafe counter.jpg"),
      licence: "CC BY 2.0",
      licenceUrl: BY2,
    },
  },
  phoneHands: {
    src: "/images/photos/phone-hands.jpg",
    width: 2400,
    height: 1600,
    alt: "Hands holding a mobile phone",
    focus: "65% 55%",
    credit: {
      title: "Person sitting indoors using a phone",
      author: "Shixart1985",
      source: "Wikimedia Commons",
      url: commons("Person sitting indoors using a phone while resting on a sofa in a casual setting closeup.jpg"),
      licence: "CC BY 2.0",
      licenceUrl: BY2,
    },
  },
  pepperBasket: {
    src: "/images/photos/pepper-basket.jpg",
    width: 2400,
    height: 1602,
    alt: "A woven basket of red and green peppers on a wooden table",
    credit: {
      title: "A woven basket filled with an assortment of colorful vegetables",
      author: "Shixart1985",
      source: "Wikimedia Commons",
      url: commons("A woven basket filled with an assortment of colorful vegetables.jpg"),
      licence: "CC BY 2.0",
      licenceUrl: BY2,
    },
  },
} satisfies Record<string, PhotoAsset>;

/** Where each photo is used. Pages refer to these roles, not to files. */
export const photos = {
  hero: library.onionsGarlicCrate,
  editorial: library.pepperBasket,
  visit: library.onionsMarket,
  contact: library.vineTomatoes,
  notFound: library.lemons,
  aboutTall: library.redPeppersCrate,
  aboutStrip1: library.leeks,
  aboutStrip2: library.grainBowl,
  aboutStrip3: library.vineTomatoes,
  // Home "what's in store" mosaic
  produce: library.aubergines,
  pantry: library.pantryHand,
  fruitBowl: library.clementinesBowl,
  pulses: library.grainSacks,
  // Categories
  fruit: library.appleBasket,
  vegetables: library.tomatoCarrotBasket,
  halal: library.rawSteakSlate,
  asian: library.pantryShelves,
  dairy: library.milkJugs,
  confectionery: library.cookies,
  newspapers: library.newspaper,
  topups: library.phoneHands,
} satisfies Record<string, PhotoAsset>;

export type PhotoKey = keyof typeof photos;

/** Every distinct photo in use, for the credits page. */
export const photosInUse: PhotoAsset[] = Array.from(new Set(Object.values(photos)));
