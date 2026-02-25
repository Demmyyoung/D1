import "./globals.css";
import Header from "@/components/Header";

export const metadata = {
  title: "The Archive — Talent Discovery",
  description:
    "A boutique modeling agency platform. Discover archived talent profiles.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header />

        {/* Main Layout — full width for gallery, archive pages have own sidebar */}
        <div className="fb-layout fb-layout--full">
          <main className="fb-content">{children}</main>
        </div>
      </body>
    </html>
  );
}
