"use client";

import Image from "next/image";

export default function WallPost({ photo, model, onImageClick }) {
  const isPolaroid = photo.postType === "Polaroid";

  return (
    <div className={`wall-post ${isPolaroid ? "wall-post--polaroid" : ""}`}>
      <div className="wall-post__header">
        <Image
          src={model.profilePhoto}
          alt={model.name}
          width={32}
          height={32}
          className="wall-post__avatar"
        />
        <div>
          <span className="wall-post__name">{model.name}</span>
          <span className="wall-post__verb"> added a new photo.</span>
          <div className="wall-post__date">{photo.date}</div>
        </div>
      </div>

      <div
        className="wall-post__image-wrap"
        onClick={() => photo.src && onImageClick(photo)}
      >
        {photo.src ? (
          <Image
            src={photo.src}
            alt={photo.caption}
            width={500}
            height={625}
            className="wall-post__image"
            style={{ width: "100%", height: "auto", maxWidth: isPolaroid ? "380px" : "420px" }}
          />
        ) : (
          <div 
            className="wall-post__image wall-post__image--placeholder"
            style={{ 
              width: "100%", 
              aspectRatio: "4/5", 
              background: "#eee", 
              display: "flex", 
              alignItems: "center", 
              justifyContent: "center",
              color: "#999",
              fontSize: "14px",
              border: "1px dashed #ccc"
            }}
          >
            Photo not yet uploaded
          </div>
        )}
        {isPolaroid && (
           <div className="wall-post__polaroid-footer">
             <div className="wall-post__polaroid-caption">{photo.caption}</div>
             <div className="wall-post__polaroid-date">{photo.date}</div>
           </div>
        )}
      </div>

      {!isPolaroid && photo.caption && (
        <div className="wall-post__caption">{photo.caption}</div>
      )}

      <div className="wall-post__actions">
        <button className="wall-post__action">Write a comment...</button>
        <button className="wall-post__action">Like</button>
      </div>

      <style jsx>{`
        .wall-post--polaroid .wall-post__image-wrap {
          background: #fff;
          padding: 12px 12px 40px 12px;
          border-width: 0;
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
          transform: rotate(-1deg);
          margin: 10px 0;
        }
        .wall-post__polaroid-footer {
          margin-top: 12px;
          font-family: "Courier New", Courier, monospace;
          color: #555;
          text-align: left;
        }
        .wall-post__polaroid-caption {
          font-size: 14px;
          font-weight: 600;
        }
        .wall-post__polaroid-date {
          font-size: 11px;
          opacity: 0.7;
          margin-top: 2px;
        }
      `}</style>
    </div>
  );
}
