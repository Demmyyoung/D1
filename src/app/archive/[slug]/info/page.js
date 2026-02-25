"use client";

import { useState, useEffect } from "react";
import { use } from "react";
import TabNav from "@/components/TabNav";
import { sanityClient } from "@/sanity/client";
import { getModelBySlug as getModelBySlugQuery } from "@/sanity/queries";

export default function ArchiveInfo({ params }) {
  const { slug } = use(params);
  const [model, setModel] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    sanityClient
      .fetch(getModelBySlugQuery, { slug })
      .then((data) => {
        setModel(data);
        setLoading(false);
      });
  }, [slug]);

  if (loading) {
    return (
      <div className="fb-box">
        <div className="fb-box__body" style={{ padding: "20px", textAlign: "center" }}>
          Loading info...
        </div>
      </div>
    );
  }

  if (!model) return null;

  const baseUrl = `/archive/${slug}`;

  return (
    <>
      <TabNav baseUrl={baseUrl} />

      <div className="fb-box">
        <div className="fb-box__header">
          Basic Information
          <span className="fb-box__header-edit">[ edit ]</span>
        </div>
        <div className="fb-box__body">
          <div className="info-table__row">
            <span className="info-table__label">Name:</span>
            <span className="info-table__value">{model.name}</span>
          </div>
          <div className="info-table__row">
            <span className="info-table__label">Tagline:</span>
            <span className="info-table__value">{model.tagline}</span>
          </div>
          <div className="info-table__row">
            <span className="info-table__label">Location:</span>
            <span className="info-table__value">{model.location}</span>
          </div>
          <div className="info-table__row">
            <span className="info-table__label">Agency:</span>
            <span className="info-table__value">{model.agency}</span>
          </div>
          <div className="info-table__row">
            <span className="info-table__label">Member Since:</span>
            <span className="info-table__value">{model.joined}</span>
          </div>
        </div>
      </div>

      <div className="fb-box">
        <div className="fb-box__header">
          About
          <span className="fb-box__header-edit">[ edit ]</span>
        </div>
        <div className="fb-box__body">
          <p
            style={{
              fontSize: "12px",
              lineHeight: "1.6",
              color: "var(--fb-text)",
            }}
          >
            {model.bio}
          </p>
        </div>
      </div>

      <div className="fb-box">
        <div className="fb-box__header">
          Measurements
          <span className="fb-box__header-edit">[ edit ]</span>
        </div>
        <div className="fb-box__body">
          <div className="info-table__row">
            <span className="info-table__label">Height:</span>
            <span className="info-table__value">{model.stats?.height}</span>
          </div>
          <div className="info-table__row">
            <span className="info-table__label">Bust:</span>
            <span className="info-table__value">{model.stats?.bust}</span>
          </div>
          <div className="info-table__row">
            <span className="info-table__label">Waist:</span>
            <span className="info-table__value">{model.stats?.waist}</span>
          </div>
          <div className="info-table__row">
            <span className="info-table__label">Hips:</span>
            <span className="info-table__value">{model.stats?.hips}</span>
          </div>
          <div className="info-table__row">
            <span className="info-table__label">Shoe Size:</span>
            <span className="info-table__value">{model.stats?.shoe}</span>
          </div>
          <div className="info-table__row">
            <span className="info-table__label">Eye Color:</span>
            <span className="info-table__value">{model.stats?.eyes}</span>
          </div>
          <div className="info-table__row">
            <span className="info-table__label">Hair Color:</span>
            <span className="info-table__value">{model.stats?.hair}</span>
          </div>
        </div>
      </div>

      <div className="fb-box">
        <div className="fb-box__header">
          Contact Information
          <span className="fb-box__header-edit">[ edit ]</span>
        </div>
        <div className="fb-box__body">
          <div className="info-table__row">
            <span className="info-table__label">Email:</span>
            <span className="info-table__value">
              <a href={`mailto:${model.contact}`}>{model.contact}</a>
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
