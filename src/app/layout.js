import "./globals.css";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import profile from "@/data/profile.json";

export const metadata = {
  title: "Damilare — Portfolio",
  description:
    "Professional model portfolio — editorial, campaigns & runway bookings.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header />

        {/* Profile Bar — like "Profile (This is you) — Texas A&M" */}
        <div className="profile-bar">
          <div className="profile-bar__inner">
            <span>Profile · {profile.name}</span>
            <span className="profile-bar__right">{profile.location}</span>
          </div>
        </div>

        {/* Main Layout */}
        <div className="fb-layout">
          <Sidebar />
          <main className="fb-content">{children}</main>
        </div>
      </body>
    </html>
  );
}
