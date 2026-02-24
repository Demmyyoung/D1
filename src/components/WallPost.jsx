"use client";

import Image from "next/image";
import profile from "@/data/profile.json";

export default function WallPost({ photo, onImageClick }) {
  return (
    <div className="wall-post">
      <div className="wall-post__header">
        <Image
          src="/photos/IMG_4290.jpg"
          alt={profile.name}
          width={32}
          height={32}
          className="wall-post__avatar"
        />
        <div>
          <span className="wall-post__name">{profile.name}</span>
          <span className="wall-post__verb"> added a new photo.</span>
          <div className="wall-post__date">{photo.date}</div>
        </div>
      </div>

      <div
        className="wall-post__image-wrap"
        onClick={() => onImageClick(photo)}
      >
        <Image
          src={photo.src}
          alt={photo.caption}
          width={500}
          height={625}
          className="wall-post__image"
          style={{ width: "100%", height: "auto", maxWidth: "420px" }}
        />
      </div>

      {photo.caption && (
        <div className="wall-post__caption">{photo.caption}</div>
      )}

      <div className="wall-post__actions">
        <button className="wall-post__action">Write a comment...</button>
        <button className="wall-post__action">Like</button>
      </div>
    </div>
  );
}
