"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

export default function TabNav({ baseUrl = "" }) {
  const pathname = usePathname();

  const tabs = [
    { label: "Wall", href: baseUrl || "/" },
    { label: "Info", href: `${baseUrl}/info` },
    { label: "Photos", href: `${baseUrl}/photos` },
  ];

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
