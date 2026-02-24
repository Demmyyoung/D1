"use client";

import Image from "next/image";

export default function PhotoGrid({ photos, onPhotoClick }) {
  return (
    <div className="photo-grid">
      {photos.map((photo) => (
        <div
          key={photo.id}
          className="photo-grid__item"
          onClick={() => onPhotoClick(photo)}
        >
          <Image
            src={photo.src}
            alt={photo.caption}
            width={300}
            height={300}
            className="photo-grid__img"
          />
        </div>
      ))}
    </div>
  );
}
