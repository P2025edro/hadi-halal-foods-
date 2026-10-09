"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { nav } from "@/config/site";
import { Logo } from "./Logo";
import { buttonClasses, Container, cx } from "./ui";

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
}

export function Header() {
  const pathname = usePathname() ?? "/";
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  const close = useCallback((returnFocus = true) => {
    setOpen(false);
    if (returnFocus) toggleRef.current?.focus();
  }, []);

  // Close the menu whenever the route changes.
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const panel = panelRef.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panel?.querySelector<HTMLElement>("a,button")?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        close();
        return;
      }
      if (e.key !== "Tab" || !panel) return;
      const focusables = [
        toggleRef.current,
        ...Array.from(panel.querySelectorAll<HTMLElement>("a[href],button:not([disabled])")),
      ].filter(Boolean) as HTMLElement[];
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (!first || !last) return;
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    const onResize = () => {
      if (window.matchMedia("(min-width: 1024px)").matches) close(false);
    };
    document.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [open, close]);

  return (
    <header
      className={cx(
        "sticky top-0 z-50 border-b bg-paper/95 backdrop-blur-sm transition-[border-color] duration-300",
        scrolled || open ? "border-line" : "border-transparent",
      )}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-[60] focus:bg-teal focus:px-4 focus:py-2 focus:font-semibold focus:text-paper"
      >
        Skip to content
      </a>
      <Container className="flex h-[76px] items-center justify-between gap-6">
        <Logo />

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-8">
            {nav.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cx(
                      "relative py-2 text-[0.975rem] font-medium transition-colors duration-200",
                      "after:absolute after:inset-x-0 after:-bottom-0.5 after:h-[2px] after:origin-left after:bg-orange after:transition-transform after:duration-300",
                      active ? "text-teal after:scale-x-100" : "text-muted after:scale-x-0 hover:text-teal",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <Link href="/contact#visit" className={buttonClasses("quiet", "min-h-11 px-5 max-sm:hidden")}>
            Visit us
          </Link>
          <button
            ref={toggleRef}
            type="button"
            className="-mr-2 inline-flex size-11 items-center justify-center text-teal lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X aria-hidden="true" className="size-6" /> : <Menu aria-hidden="true" className="size-6" />}
          </button>
        </div>
      </Container>

      <div id="mobile-menu" ref={panelRef} hidden={!open} className="h-[calc(100dvh-76px)] overflow-y-auto bg-paper lg:hidden">
        <Container className="flex h-full flex-col pb-8 pt-4">
          <nav aria-label="Mobile">
            <ul className="divide-y divide-line border-y border-line">
              {nav.map((item) => {
                const active = isActive(pathname, item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      onClick={() => setOpen(false)}
                      className={cx(
                        "flex min-h-14 items-center justify-between font-display text-[1.6rem] [font-variation-settings:'SOFT'_50,'opsz'_72]",
                        active ? "text-teal" : "text-teal/75 hover:text-teal",
                      )}
                    >
                      {item.label}
                      {active && <span aria-hidden="true" className="size-2 rounded-full bg-orange" />}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
          <Link href="/contact#visit" onClick={() => setOpen(false)} className={buttonClasses("quiet", "mt-8 w-full")}>
            Visit us
          </Link>
        </Container>
      </div>
    </header>
  );
}
