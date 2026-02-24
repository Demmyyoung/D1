"use client";

import { useState } from "react";
import TabNav from "@/components/TabNav";
import PhotoGrid from "@/components/PhotoGrid";
import Lightbox from "@/components/Lightbox";
import photos, { getAlbums } from "@/data/albums";
import profile from "@/data/profile.json";

export default function PhotosPage() {
  const [lightboxPhoto, setLightboxPhoto] = useState(null);
  const albums = getAlbums();

  return (
    <>
      <TabNav />

      <div className="fb-box">
        <div className="fb-box__header">
          Photos of {profile.name}
          <span className="fb-box__header-edit">{photos.length} photos</span>
        </div>
        <div className="fb-box__body">
          {Object.entries(albums).map(([albumName, albumPhotos]) => (
            <div key={albumName} className="album-section">
              <div className="album-header">
                <span>{albumName}</span>
                <span className="album-header__count">
                  {albumPhotos.length} photos
                </span>
              </div>
              <PhotoGrid photos={albumPhotos} onPhotoClick={setLightboxPhoto} />
            </div>
          ))}
        </div>
      </div>

      {lightboxPhoto && (
        <Lightbox
          photos={photos}
          currentPhoto={lightboxPhoto}
          onClose={() => setLightboxPhoto(null)}
          onNavigate={setLightboxPhoto}
        />
      )}
    </>
  );
}
