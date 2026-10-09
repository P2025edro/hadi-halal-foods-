"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";
import type { ShopPhoto } from "@/config/photos";

export function Gallery({ photos }: { photos: ShopPhoto[] }) {
  const [index, setIndex] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const openerRef = useRef<HTMLButtonElement | null>(null);
  const count = photos.length;

  const openAt = (i: number, el: HTMLButtonElement) => {
    openerRef.current = el;
    setIndex(i);
  };
  const close = useCallback(() => setIndex(null), []);
  const step = useCallback(
    (dir: 1 | -1) => setIndex((i) => (i === null ? i : (i + dir + count) % count)),
    [count],
  );

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (index !== null && !dialog.open) {
      dialog.showModal();
    } else if (index === null && dialog.open) {
      dialog.close();
      openerRef.current?.focus();
    }
  }, [index]);

  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [index, step]);

  const current = index !== null ? photos[index] : null;

  return (
    <>
      <ul className="columns-1 gap-4 sm:columns-2 lg:columns-3 [&>li]:mb-4">
        {photos.map((photo, i) => (
          <li key={photo.src} className="break-inside-avoid">
            <figure>
              <button
                type="button"
                onClick={(e) => openAt(i, e.currentTarget)}
                className="group relative block w-full overflow-hidden bg-stone"
                aria-label={`View larger: ${photo.alt}`}
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  width={photo.width}
                  height={photo.height}
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="h-auto w-full transition-[scale] duration-500 ease-[var(--ease-out-soft)] group-hover:scale-[1.03]"
                />
                <span
                  aria-hidden="true"
                  className="absolute right-3 top-3 inline-flex size-9 items-center justify-center rounded-[3px] bg-white/90 text-ink opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100"
                >
                  <Expand className="size-4" />
                </span>
              </button>
              {photo.caption && <figcaption className="mt-2 text-sm text-muted">{photo.caption}</figcaption>}
            </figure>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialogRef}
        aria-label="Photo viewer"
        onClose={close}
        onClick={(e) => {
          if (e.target === e.currentTarget) close();
        }}
        className="m-auto h-dvh max-h-none w-screen max-w-none bg-transparent p-0 backdrop:bg-teal-900/90 backdrop:backdrop-blur-sm"
      >
        {current && (
          <div className="flex h-full flex-col items-center justify-center gap-4 p-4 sm:p-10" onClick={(e) => e.target === e.currentTarget && close()}>
            <div className="relative flex max-h-[78dvh] w-full max-w-5xl items-center justify-center">
              <Image
                key={current.src}
                src={current.src}
                alt={current.alt}
                width={current.width}
                height={current.height}
                sizes="(min-width: 1024px) 1024px, 100vw"
                className="h-auto max-h-[78dvh] w-auto max-w-full object-contain"
              />
            </div>
            <p className="max-w-2xl text-center text-white/85" aria-live="polite">
              {current.caption || current.alt}
              {count > 1 && (
                <span className="ml-2 text-white/60">
                  ({(index ?? 0) + 1} of {count})
                </span>
              )}
            </p>
            <button
              type="button"
              onClick={close}
              className="absolute right-4 top-4 inline-flex size-12 items-center justify-center rounded-[3px] bg-white/10 text-white transition-colors hover:bg-white/20"
              aria-label="Close photo viewer"
            >
              <X aria-hidden="true" className="size-6" />
            </button>
            {count > 1 && (
              <>
                <button
                  type="button"
                  onClick={() => step(-1)}
                  className="absolute left-3 top-1/2 inline-flex size-12 -translate-y-1/2 items-center justify-center rounded-[3px] bg-white/10 text-white transition-colors hover:bg-white/20"
                  aria-label="Previous photo"
                >
                  <ChevronLeft aria-hidden="true" className="size-6" />
                </button>
                <button
                  type="button"
                  onClick={() => step(1)}
                  className="absolute right-3 top-1/2 inline-flex size-12 -translate-y-1/2 items-center justify-center rounded-[3px] bg-white/10 text-white transition-colors hover:bg-white/20"
                  aria-label="Next photo"
                >
                  <ChevronRight aria-hidden="true" className="size-6" />
                </button>
              </>
            )}
          </div>
        )}
      </dialog>
    </>
  );
}
