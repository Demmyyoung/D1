"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header({ name = "Damilare" }) {
  const pathname = usePathname();

  const navLinks = [
    { label: "home", href: "/" },
    { label: "photos", href: "/photos" },
    { label: "info", href: "/info" },
    { label: "book me", href: "mailto:bookings@damilare.com" },
  ];

  return (
    <header className="fb-header">
      <div className="fb-header__inner">
        <Link href="/" className="fb-header__logo">
          [ theportfolio ]
        </Link>

        <nav className="fb-header__nav">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={pathname === link.href ? "active" : ""}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
