"use client";

import Image from "next/image";

export default function PhotoGrid({ photos, onPhotoClick }) {
  return (
    <div className="photo-grid">
      {photos.map((photo) => (
        <div
          key={photo.id}
          className="photo-grid__item"
          onClick={() => photo.src && onPhotoClick(photo)}
        >
          {photo.src ? (
            <Image
              src={photo.src}
              alt={photo.caption}
              width={300}
              height={300}
              className="photo-grid__img"
            />
          ) : (
            <div 
              style={{
                width: "100%", 
                height: "100%", 
                background: "#eee", 
                display: "flex", 
                alignItems: "center", 
                justifyContent: "center",
                textAlign: "center",
                fontSize: "11px",
                color: "#aaa",
                padding: "4px"
              }}
            >
              Missing Image
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
