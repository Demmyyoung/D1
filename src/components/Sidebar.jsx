"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar({ model, baseUrl = "" }) {
  const pathname = usePathname();

  const navItems = [
    { label: "My Profile", href: baseUrl || "/" },
    { label: "My Photos", href: `${baseUrl}/photos` },
    { label: "My Info", href: `${baseUrl}/info` },
  ];

  return (
    <aside className="fb-sidebar">
      {/* Quick Search */}
      <div className="fb-sidebar__search">
        <input type="text" placeholder="search" />
        <button>Go</button>
      </div>

      {/* Navigation */}
      <ul className="fb-sidebar__nav">
        {navItems.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className={pathname === item.href ? "active" : ""}
            >
              {item.label}
              {pathname === item.href ? " [ edit ]" : ""}
            </Link>
          </li>
        ))}
      </ul>

      {/* Representation */}
      <div className="fb-sidebar__section-title">Representation</div>
      <p className="fb-sidebar__text">{model.agency}</p>

      <div className="fb-sidebar__section-title">Announcements</div>
      <p className="fb-sidebar__text">
        Currently open for editorial, campaign, and runway bookings. Get in
        touch for availability.
      </p>

      <ul className="fb-sidebar__links">
        <li>
          <a href={`mailto:${model.contact}`}>✉ Book Me</a>
        </li>
        <li>
          <Link href="/">← Back to Talent Gallery</Link>
        </li>
      </ul>
    </aside>
  );
}
