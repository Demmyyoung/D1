"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import profile from "@/data/profile.json";

export default function Sidebar() {
  const pathname = usePathname();

  const navItems = [
    { label: "My Profile", href: "/" },
    { label: "My Photos", href: "/photos" },
    { label: "My Info", href: "/info" },
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

      {/* Sponsor Section */}
      <div className="fb-sidebar__section-title">Representation</div>
      <p className="fb-sidebar__text">
        {profile.agency}
      </p>

      <div className="fb-sidebar__section-title">Announcements</div>
      <p className="fb-sidebar__text">
        Currently open for editorial, campaign, and runway bookings. Get in touch for availability.
      </p>

      <ul className="fb-sidebar__links">
        <li>
          <a href={`mailto:${profile.contact}`}>✉ Book Me</a>
        </li>
      </ul>
    </aside>
  );
}
