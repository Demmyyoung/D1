"use client";

import { useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function Lightbox({ photos, currentPhoto, onClose, onNavigate }) {
  const currentIndex = photos.findIndex((p) => p.id === currentPhoto?.id);

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft" && currentIndex > 0) {
        onNavigate(photos[currentIndex - 1]);
      }
      if (e.key === "ArrowRight" && currentIndex < photos.length - 1) {
        onNavigate(photos[currentIndex + 1]);
      }
    },
    [currentIndex, photos, onClose, onNavigate]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [handleKeyDown]);

  if (!currentPhoto) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="lightbox-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={onClose}
      >
        <button className="lightbox-close" onClick={onClose}>
          ✕
        </button>

        {currentIndex > 0 && (
          <button
            className="lightbox-nav lightbox-prev"
            onClick={(e) => {
              e.stopPropagation();
              onNavigate(photos[currentIndex - 1]);
            }}
          >
            ‹
          </button>
        )}

        <motion.div
          className="lightbox-content"
          onClick={(e) => e.stopPropagation()}
          key={currentPhoto.id}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
        >
          <Image
            src={currentPhoto.src}
            alt={currentPhoto.caption}
            width={1200}
            height={1600}
            className="lightbox-image"
            style={{ width: "auto", height: "auto", maxWidth: "90vw", maxHeight: "85vh" }}
            priority
          />
          {currentPhoto.caption && (
            <div className="lightbox-caption">{currentPhoto.caption}</div>
          )}
        </motion.div>

        {currentIndex < photos.length - 1 && (
          <button
            className="lightbox-nav lightbox-next"
            onClick={(e) => {
              e.stopPropagation();
              onNavigate(photos[currentIndex + 1]);
            }}
          >
            ›
          </button>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
