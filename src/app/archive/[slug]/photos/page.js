"use client";

import { useState, useEffect } from "react";
import { use } from "react";
import TabNav from "@/components/TabNav";
import PhotoGrid from "@/components/PhotoGrid";
import Lightbox from "@/components/Lightbox";
import { sanityClient } from "@/sanity/client";
import { urlFor } from "@/sanity/image";
import {
  getModelBySlug as getModelBySlugQuery,
  getModelPosts,
} from "@/sanity/queries";

export default function ArchivePhotos({ params }) {
  const { slug } = use(params);
  const [model, setModel] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lightboxPhoto, setLightboxPhoto] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const modelData = await sanityClient.fetch(getModelBySlugQuery, { slug });
      if (modelData) {
        const postsData = await sanityClient.fetch(getModelPosts, {
          modelId: modelData._id,
        });
        setModel(modelData);
        setPosts(postsData || []);
      }
      setLoading(false);
    }
    fetchData();
  }, [slug]);

  if (loading) {
    return (
      <div className="fb-box">
        <div className="fb-box__body" style={{ padding: "20px", textAlign: "center" }}>
          Loading photos...
        </div>
      </div>
    );
  }

  if (!model) return null;

  const baseUrl = `/archive/${slug}`;

  // Transform posts to photo format compatible with PhotoGrid + Lightbox
  const photos = posts.map((post) => ({
    id: post._id,
    src: post.image ? urlFor(post.image).width(800).url() : null,
    caption: post.caption || "",
    date: post.timestamp
      ? new Date(post.timestamp).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      : "",
    album: post.album || "Uncategorized",
  }));

  // Group photos by album
  const albums = {};
  photos.forEach((photo) => {
    if (!albums[photo.album]) {
      albums[photo.album] = [];
    }
    albums[photo.album].push(photo);
  });

  return (
    <>
      <TabNav baseUrl={baseUrl} />

      <div className="fb-box">
        <div className="fb-box__header">
          Photos of {model.name}
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
