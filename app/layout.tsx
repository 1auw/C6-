import type { Metadata, Viewport } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: {
    default: "Central 6RP - Serveur FiveM RolePlay Français",
    template: "%s | Central 6RP",
  },
  description: "Rejoignez Central 6RP, le serveur FiveM RolePlay français avec une communauté active, des événements réguliers et une expérience de jeu immersive.",
  keywords: ["FiveM", "GTA RP", "RolePlay", "Serveur français", "Central 6RP", "GTA V"],
  authors: [{ name: "Central 6RP Team" }],
  creator: "Central 6RP",
  publisher: "Central 6RP",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: "Central 6RP",
    title: "Central 6RP - Serveur FiveM RolePlay Français",
    description: "Rejoignez Central 6RP, le serveur FiveM RolePlay français avec une communauté active.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Central 6RP - Serveur FiveM RolePlay Français",
    description: "Rejoignez Central 6RP, le serveur FiveM RolePlay français.",
  },
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#1a5cff",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="scroll-smooth">
      <body className="min-h-screen bg-dark-bg antialiased">
        <Navbar />
        {children}
      </body>
    </html>
  );
}

