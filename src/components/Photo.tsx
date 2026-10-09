import Image from "next/image";
import { photos, type PhotoAsset, type PhotoKey } from "@/config/images";
import { cx } from "./ui";

/**
 * Art-directed photo: fills its frame (the caller sets the frame's aspect ratio
 * or height) and crops around a focal point chosen per photo.
 */
export function Photo({
  name,
  sizes,
  className,
  imgClassName,
  priority,
  focus,
}: {
  name: PhotoKey;
  sizes: string;
  className?: string;
  imgClassName?: string;
  priority?: boolean;
  /** Override the photo's default focal point, e.g. "30% 60%". */
  focus?: string;
}) {
  const p: PhotoAsset = photos[name];
  return (
    <div className={cx("photo", className?.includes("absolute") ? undefined : "relative", className)}>
      <Image
        src={p.src}
        alt={p.alt}
        fill
        sizes={sizes}
        priority={priority}
        quality={78}
        className={cx("object-cover", imgClassName)}
        style={{ objectPosition: focus ?? p.focus ?? "50% 50%" }}
      />
    </div>
  );
}
