/**
 * Approved, CURRENT photographs of the shop.
 *
 * Add a photo only when:
 *  - the business has approved it,
 *  - it shows the shop as it is today, and
 *  - it does not show any former business name or signage.
 *
 * Put files in /public/images/shop/ and list them here. The homepage shop
 * section and the Gallery page appear/populate automatically.
 *
 * Example:
 * { src: "/images/shop/aisle-fruit.jpg", alt: "Fresh fruit display inside the shop", width: 1600, height: 1067 }
 */

export type ShopPhoto = {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
};

export const shopPhotos: ShopPhoto[] = [];
