"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ChevronDown, Menu, Phone } from "lucide-react";
import { business } from "@/config/business";
import { mainNav, servicesMenu } from "@/config/navigation";
import { Logo } from "@/components/Logo";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { CallButton } from "@/components/PrimaryCTA";
import { cn } from "@/lib/utils";

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  const path = href.split("#")[0];
  return pathname === path || pathname.startsWith(`${path}/`);
}

function ServicesDropdown({ active }: { active: boolean }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div
      ref={ref}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onBlur={(e) => {
        if (!ref.current?.contains(e.relatedTarget as Node)) setOpen(false);
      }}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-controls="services-menu"
        onClick={() => setOpen((o) => !o)}
        className={cn(
          "relative inline-flex min-h-11 items-center gap-1 px-2 font-semibold text-ink",
          active && "after:absolute after:inset-x-2 after:bottom-1 after:h-1 after:rounded-full after:bg-brand",
        )}
      >
        Services
        <ChevronDown aria-hidden className={cn("size-4 transition-transform", open && "rotate-180")} />
      </button>
      <ul
        id="services-menu"
        hidden={!open}
        className="absolute left-0 top-full z-50 min-w-64 rounded-xl border-2 border-ink bg-paper p-2 shadow-[0_6px_0_0_#111]"
      >
        {servicesMenu.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              onClick={() => setOpen(false)}
              className="block rounded-lg px-3 py-2.5 font-semibold hover:bg-cream"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b-2 border-ink/90 bg-paper/95 backdrop-blur supports-[backdrop-filter]:bg-paper/85">
      <div className="mx-auto flex h-[4.25rem] max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:h-20 lg:px-8">
        <Logo compact className="lg:hidden" />
        <Logo className="hidden lg:inline-flex" />

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-1 xl:gap-3">
            {mainNav.map((item) =>
              item.href === "/services" ? (
                <li key={item.href}>
                  <ServicesDropdown active={isActive(pathname, "/services")} />
                </li>
              ) : (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive(pathname, item.href) ? "page" : undefined}
                    className={cn(
                      "relative inline-flex min-h-11 items-center px-2 font-semibold text-ink hover:text-ink/75",
                      "aria-[current=page]:after:absolute aria-[current=page]:after:inset-x-2 aria-[current=page]:after:bottom-1 aria-[current=page]:after:h-1 aria-[current=page]:after:rounded-full aria-[current=page]:after:bg-brand",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              ),
            )}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden items-center gap-4 lg:flex">
            <span aria-hidden className="h-9 w-0.5 bg-ink" />
            <CallButton size="md" label={business.phone.display} />
          </div>
          {/* Compact persistent call button on mobile/tablet */}
          <a
            href={business.phone.href}
            className="inline-flex min-h-11 items-center gap-1.5 rounded-xl border-2 border-ink bg-brand px-3 font-display text-sm font-bold italic text-ink lg:hidden"
          >
            <Phone aria-hidden className="size-4" fill="currentColor" strokeWidth={1.5} />
            <span>Call Now</span>
            <span className="sr-only">{business.phone.display}</span>
          </a>
          <Sheet>
            <SheetTrigger className="inline-flex size-11 items-center justify-center rounded-lg border-2 border-ink lg:hidden">
              <Menu aria-hidden className="size-6" />
              <span className="sr-only">Open menu</span>
            </SheetTrigger>
            <SheetContent>
              <SheetTitle className="font-heading text-2xl">Menu</SheetTitle>
              <SheetDescription className="sr-only">Site navigation and call options</SheetDescription>
              <nav aria-label="Mobile" className="mt-6">
                <ul className="flex flex-col gap-1">
                  {[...mainNav.slice(0, 1), ...servicesMenu, ...mainNav.slice(3)].map((item) => (
                    <li key={item.href + item.label}>
                      <SheetClose asChild>
                        <Link
                          href={item.href}
                          aria-current={pathname === item.href ? "page" : undefined}
                          className="flex min-h-12 items-center rounded-lg px-3 text-lg font-semibold hover:bg-cream aria-[current=page]:bg-cream"
                        >
                          {item.label}
                        </Link>
                      </SheetClose>
                    </li>
                  ))}
                </ul>
              </nav>
              <div className="mt-auto pt-6">
                <p className="mb-2 text-sm font-semibold">Locked out? Call any time — day or night.</p>
                <CallButton showNumber size="lg" className="w-full" />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
