"use client";

import { useState, useEffect } from "react";
import { use } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import { sanityClient } from "@/sanity/client";
import { urlFor } from "@/sanity/image";
import { getModelBySlug as getModelBySlugQuery } from "@/sanity/queries";

export default function LoginGate({ params }) {
  const { slug } = use(params);
  const router = useRouter();
  const [model, setModel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [inviteCode, setInviteCode] = useState("");

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
        <div className="fb-box__header">Loading...</div>
        <div className="fb-box__body">
          <p style={{ padding: "20px", textAlign: "center" }}>
            Loading archive...
          </p>
        </div>
      </div>
    );
  }

  if (!model) {
    return (
      <div className="fb-box">
        <div className="fb-box__header">Error</div>
        <div className="fb-box__body">Archive not found.</div>
      </div>
    );
  }

  const handleLogin = (e) => {
    e.preventDefault();
    router.push(`/archive/${slug}`);
  };

  const profileImageUrl = model.profileImage
    ? urlFor(model.profileImage).width(160).height(160).url()
    : null;

  return (
    <motion.div
      className="login-gate"
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="login-gate__card">
        <div className="fb-box">
          <div className="fb-box__header">
            Log In to {model.name}&apos;s Archive
          </div>
          <div className="fb-box__body">
            <div className="login-gate__profile">
              <div className="login-gate__avatar-wrap">
                {profileImageUrl ? (
                  <Image
                    src={profileImageUrl}
                    alt={model.name}
                    width={80}
                    height={80}
                    className="login-gate__avatar"
                  />
                ) : (
                  <div
                    className="login-gate__avatar"
                    style={{ width: 80, height: 80, background: "#eee" }}
                  />
                )}
              </div>
              <div className="login-gate__profile-name">{model.name}</div>
              <div className="login-gate__profile-tagline">
                {model.tagline}
              </div>
            </div>

            <form onSubmit={handleLogin} className="login-gate__form">
              <div className="login-gate__field">
                <label className="login-gate__label">Username:</label>
                <input
                  type="text"
                  className="login-gate__input"
                  value="Guest_Client"
                  readOnly
                />
              </div>
              <div className="login-gate__field">
                <label className="login-gate__label">Invite Code:</label>
                <input
                  type="text"
                  className="login-gate__input"
                  value={inviteCode}
                  onChange={(e) => setInviteCode(e.target.value)}
                  placeholder="leave blank for guest access"
                />
              </div>
              <button type="submit" className="login-gate__btn">
                Login
              </button>
              <div className="login-gate__hint">
                Click Login to access this archived profile.
              </div>
            </form>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
