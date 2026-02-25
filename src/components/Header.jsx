"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  const navLinks = [
    { label: "talent", href: "/" },
  ];

  return (
    <header className="fb-header">
      <div className="fb-header__inner">
        <Link href="/" className="fb-header__logo">
          [ thearchive ]
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
