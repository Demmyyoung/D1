"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

const tabs = [
  { label: "Wall", href: "/" },
  { label: "Info", href: "/info" },
  { label: "Photos", href: "/photos" },
];

export default function TabNav() {
  const pathname = usePathname();

  return (
    <div className="content-tabs">
      {tabs.map((tab) => {
        const isActive = pathname === tab.href;
        return (
          <Link
            key={tab.href}
            href={tab.href}
            className={`content-tabs__item ${isActive ? "content-tabs__item--active" : ""}`}
          >
            {tab.label}
            {isActive && (
              <motion.div
                className="content-tabs__indicator"
                layoutId="tab-indicator"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
          </Link>
        );
      })}
    </div>
  );
}
