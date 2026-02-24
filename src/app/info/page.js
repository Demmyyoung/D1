import TabNav from "@/components/TabNav";
import profile from "@/data/profile.json";

export const metadata = {
  title: `${profile.name} — Info`,
};

export default function InfoPage() {
  return (
    <>
      <TabNav />
      <div className="fb-box">
        <div className="fb-box__header">
          Basic Information
          <span className="fb-box__header-edit">[ edit ]</span>
        </div>
        <div className="fb-box__body">
          <div className="info-table__row">
            <span className="info-table__label">Name:</span>
            <span className="info-table__value">{profile.name}</span>
          </div>
          <div className="info-table__row">
            <span className="info-table__label">Tagline:</span>
            <span className="info-table__value">{profile.tagline}</span>
          </div>
          <div className="info-table__row">
            <span className="info-table__label">Location:</span>
            <span className="info-table__value">{profile.location}</span>
          </div>
          <div className="info-table__row">
            <span className="info-table__label">Agency:</span>
            <span className="info-table__value">{profile.agency}</span>
          </div>
          <div className="info-table__row">
            <span className="info-table__label">Member Since:</span>
            <span className="info-table__value">{profile.joined}</span>
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
            {profile.bio}
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
            <span className="info-table__value">{profile.stats.height}</span>
          </div>
          <div className="info-table__row">
            <span className="info-table__label">Bust:</span>
            <span className="info-table__value">{profile.stats.bust}</span>
          </div>
          <div className="info-table__row">
            <span className="info-table__label">Waist:</span>
            <span className="info-table__value">{profile.stats.waist}</span>
          </div>
          <div className="info-table__row">
            <span className="info-table__label">Hips:</span>
            <span className="info-table__value">{profile.stats.hips}</span>
          </div>
          <div className="info-table__row">
            <span className="info-table__label">Shoe Size:</span>
            <span className="info-table__value">{profile.stats.shoe}</span>
          </div>
          <div className="info-table__row">
            <span className="info-table__label">Eye Color:</span>
            <span className="info-table__value">{profile.stats.eyes}</span>
          </div>
          <div className="info-table__row">
            <span className="info-table__label">Hair Color:</span>
            <span className="info-table__value">{profile.stats.hair}</span>
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
              <a href={`mailto:${profile.contact}`}>{profile.contact}</a>
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
