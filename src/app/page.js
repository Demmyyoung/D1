"use client";

import { useState } from "react";
import Image from "next/image";
import TabNav from "@/components/TabNav";
import WallPost from "@/components/WallPost";
import Lightbox from "@/components/Lightbox";
import photos from "@/data/albums";
import profile from "@/data/profile.json";

export default function WallPage() {
  const [lightboxPhoto, setLightboxPhoto] = useState(null);

  return (
    <>
      {/* Profile Top Section — Picture + Info (like the screenshot) */}
      <div className="profile-top" style={{ marginBottom: "8px" }}>
        {/* Picture Box */}
        <div className="fb-box">
          <div className="fb-box__header">
            Picture
            <span className="fb-box__header-edit">[ edit ]</span>
          </div>
          <div className="fb-box__body profile-pic-section">
            <div className="profile-pic-section__image-wrap">
              <Image
                src="/photos/IMG_4290.jpg"
                alt={profile.name}
                width={200}
                height={250}
                className="profile-pic-section__image"
                priority
              />
            </div>
            <ul className="profile-pic-section__links">
              <li>
                <a href="/photos">View My Photos</a>
              </li>
              <li>
                <a href="/info">View My Info</a>
              </li>
              <li>
                <a href={`mailto:${profile.contact}`}>Book Me</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Information Box */}
        <div className="fb-box">
          <div className="fb-box__header">
            Information
            <span className="fb-box__header-edit">[ edit ]</span>
          </div>
          <div className="fb-box__body">
            <div className="info-table__section-title">Account Info:</div>
            <div className="info-table__row">
              <span className="info-table__label">Name:</span>
              <span className="info-table__value">{profile.name}</span>
            </div>
            <div className="info-table__row">
              <span className="info-table__label">Member Since:</span>
              <span className="info-table__value">{profile.joined}</span>
            </div>

            <div
              className="info-table__section-title"
              style={{ marginTop: "10px" }}
            >
              Basic Info:
            </div>
            <div className="info-table__row">
              <span className="info-table__label">Agency:</span>
              <span className="info-table__value">{profile.agency}</span>
            </div>
            <div className="info-table__row">
              <span className="info-table__label">Location:</span>
              <span className="info-table__value">{profile.location}</span>
            </div>
            <div className="info-table__row">
              <span className="info-table__label">Height:</span>
              <span className="info-table__value">{profile.stats.height}</span>
            </div>

            <div
              className="info-table__section-title"
              style={{ marginTop: "10px" }}
            >
              Contact Info:
            </div>
            <div className="info-table__row">
              <span className="info-table__label">Email:</span>
              <span className="info-table__value">
                <a href={`mailto:${profile.contact}`}>{profile.contact}</a>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs + Wall */}
      <TabNav />
      <div className="fb-box">
        <div className="fb-box__header">
          The Wall
          <span className="fb-box__header-edit">{photos.length} posts</span>
        </div>
        <div className="fb-box__body">
          <div className="wall-intro">
            Displaying {photos.length} wall posts.
          </div>
          {photos.map((photo) => (
            <WallPost
              key={photo.id}
              photo={photo}
              onImageClick={setLightboxPhoto}
            />
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
