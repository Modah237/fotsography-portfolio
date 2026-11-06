import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Cormorant_Garamond } from "next/font/google";
import "./globals.css";

const sans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const editorial = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-editorial",
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Adriel Tchamaha Fotso | Fotsography Studio — Direction Photographique & Cinéma",
  description:
    "Portfolio officiel d'Adriel Tchamaha Fotso (@adrielfotsography), fondateur de Fotsography Studio. Photographe & réalisateur de clips musicaux au Cameroun (Yaoundé & Douala). Mariages d'exception, sessions acoustiques, mode africaine & campagnes de marque.",
  keywords: [
    "Adriel Fotso",
    "Adriel Tchamaha Fotso",
    "The Fotsographer",
    "Fotsography Studio",
    "Photographe Yaoundé",
    "Photographe Douala",
    "Photographe Cameroun",
    "Réalisateur clip Cameroun",
    "Photographe Mariage Cameroun",
    "Cysoul Albertine",
    "Djec Fashionn Bandja",
  ],
  openGraph: {
    title: "Adriel Tchamaha Fotso | Fotsography Studio — Photographie & Réalisation",
    description: "Photographie cinématographique & réalisation de clips musicaux au Cameroun.",
    url: "https://adrielfotsography.com",
    siteName: "Adriel Fotsography",
    locale: "fr_FR",
    type: "website",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://adrielfotsography.com/#person",
      name: "Adriel Tchamaha Fotso",
      alternateName: ["The Fotsographer", "Adriel Fotso"],
      jobTitle: "Photographe & Réalisateur Cinématographique",
      worksFor: {
        "@id": "https://adrielfotsography.com/#business",
      },
      image: "https://adrielfotsography.com/instagram-library/Dbd_7VztXQx_main.jpg",
      sameAs: [
        "https://www.instagram.com/adrielfotsography/",
        "https://www.youtube.com/@adrielfotsography",
      ],
      address: {
        "@type": "PostalAddress",
        addressLocality: "Yaoundé / Douala",
        addressCountry: "CM",
      },
    },
    {
      "@type": "PhotographyBusiness",
      "@id": "https://adrielfotsography.com/#business",
      name: "Fotsography Studio",
      url: "https://adrielfotsography.com",
      logo: "https://adrielfotsography.com/cysoul_albertine_thumbnail.webp",
      founder: {
        "@id": "https://adrielfotsography.com/#person",
      },
      areaServed: [
        {
          "@type": "City",
          name: "Yaoundé",
        },
        {
          "@type": "City",
          name: "Douala",
        },
        {
          "@type": "Country",
          name: "Cameroun",
        },
      ],
      sameAs: [
        "https://www.instagram.com/adrielfotsography/",
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={`${sans.variable} ${editorial.variable} dark scroll-smooth`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-[#070709] text-[#F7F5F0] font-sans antialiased selection:bg-[#C5A059]/30 selection:text-white">
        {children}
      </body>
    </html>
  );
}
