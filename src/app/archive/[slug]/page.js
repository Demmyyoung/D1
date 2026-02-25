"use client";

import { useState, useEffect } from "react";
import { use } from "react";
import Image from "next/image";
import TabNav from "@/components/TabNav";
import WallPost from "@/components/WallPost";
import Lightbox from "@/components/Lightbox";
import { sanityClient } from "@/sanity/client";
import { urlFor } from "@/sanity/image";
import {
  getModelBySlug as getModelBySlugQuery,
  getModelPosts,
} from "@/sanity/queries";

export default function ArchiveWall({ params }) {
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
          Loading wall...
        </div>
      </div>
    );
  }

  if (!model) return null;

  const baseUrl = `/archive/${slug}`;

  // Build profile image URL
  const profileImageUrl = model.profileImage
    ? urlFor(model.profileImage).width(400).height(500).url()
    : null;

  const profileAvatarUrl = model.profileImage
    ? urlFor(model.profileImage).width(64).height(64).url()
    : null;

  // Transform posts for Lightbox compatibility
  const lightboxPhotos = posts.map((post) => ({
    id: post._id,
    src: post.image ? urlFor(post.image).width(1200).url() : null,
    caption: post.caption || "",
    date: post.timestamp
      ? new Date(post.timestamp).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      : "",
  }));

  return (
    <>
      {/* Profile Top Section — Picture + Info */}
      <div className="profile-top" style={{ marginBottom: "8px" }}>
        {/* Picture Box */}
        <div className="fb-box">
          <div className="fb-box__header">
            Picture
            <span className="fb-box__header-edit">[ edit ]</span>
          </div>
          <div className="fb-box__body profile-pic-section">
            <div className="profile-pic-section__image-wrap">
              {profileImageUrl ? (
                <Image
                  src={profileImageUrl}
                  alt={model.name}
                  width={200}
                  height={250}
                  className="profile-pic-section__image"
                  priority
                />
              ) : (
                <div
                  className="profile-pic-section__image"
                  style={{ width: 200, height: 250, background: "#eee" }}
                />
              )}
            </div>
            <ul className="profile-pic-section__links">
              <li>
                <a href={`${baseUrl}/photos`}>View My Photos</a>
              </li>
              <li>
                <a href={`${baseUrl}/info`}>View My Info</a>
              </li>
              <li>
                <a href={`mailto:${model.contact}`}>Book Me</a>
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
              <span className="info-table__value">{model.name}</span>
            </div>
            <div className="info-table__row">
              <span className="info-table__label">Member Since:</span>
              <span className="info-table__value">{model.joined}</span>
            </div>

            <div
              className="info-table__section-title"
              style={{ marginTop: "10px" }}
            >
              Basic Info:
            </div>
            <div className="info-table__row">
              <span className="info-table__label">Agency:</span>
              <span className="info-table__value">{model.agency}</span>
            </div>
            <div className="info-table__row">
              <span className="info-table__label">Location:</span>
              <span className="info-table__value">{model.location}</span>
            </div>
            <div className="info-table__row">
              <span className="info-table__label">Height:</span>
              <span className="info-table__value">{model.stats?.height}</span>
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
                <a href={`mailto:${model.contact}`}>{model.contact}</a>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs + Wall */}
      <TabNav baseUrl={baseUrl} />
      <div className="fb-box">
        <div className="fb-box__header">
          The Wall
          <span className="fb-box__header-edit">{posts.length} posts</span>
        </div>
        <div className="fb-box__body">
          <div className="wall-intro">
            Displaying {posts.length} wall posts.
          </div>
          {posts.map((post, index) => (
            <WallPost
              key={post._id}
              photo={{
                id: post._id,
                src: post.image ? urlFor(post.image).width(1000).url() : null,
                caption: post.caption || "",
                postType: post.postType,
                date: post.timestamp
                  ? new Date(post.timestamp).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })
                  : "",
              }}
              model={{
                name: model.name,
                profilePhoto: profileAvatarUrl || "",
              }}
              onImageClick={() => setLightboxPhoto(lightboxPhotos[index])}
            />
          ))}
        </div>
      </div>

      {lightboxPhoto && (
        <Lightbox
          photos={lightboxPhotos}
          currentPhoto={lightboxPhoto}
          onClose={() => setLightboxPhoto(null)}
          onNavigate={setLightboxPhoto}
        />
      )}
    </>
  );
}
