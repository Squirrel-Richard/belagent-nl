import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://belagent.nl"),
  title: {
    default: "BelAgent.nl — AI Telefoonagent voor NL MKB | Nooit meer een oproep missen",
    template: "%s | BelAgent.nl",
  },
  description:
    "BelAgent geeft jouw bedrijf een AI-telefoniste die 24/7 belt, beantwoordt, plant en doorstuurt — in perfect Nederlands. Geen technische kennis nodig. Klaar in 5 minuten.",
  keywords: [
    "AI telefoonagent",
    "AI bellen",
    "automatisch bellen",
    "AI receptionist",
    "virtuele telefoniste",
    "AI telefonist Nederland",
    "AI klantenservice",
    "automatische telefoondienst MKB",
    "AI voice agent",
    "slim bellen MKB",
    "geautomatiseerd bellen",
    "AI callcenter Nederland",
  ],
  authors: [{ name: "AIOW BV", url: "https://belagent.nl" }],
  creator: "AIOW BV",
  publisher: "AIOW BV",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "nl_NL",
    url: "https://belagent.nl",
    siteName: "BelAgent.nl",
    title: "BelAgent.nl — AI Telefoonagent voor NL MKB",
    description:
      "Jouw AI-telefoniste belt, beantwoordt en plant 24/7 in perfect Nederlands. Klaar in 5 minuten.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "BelAgent.nl — AI Telefoonagent voor NL MKB",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "BelAgent.nl — AI Telefoonagent voor NL MKB",
    description:
      "Nooit meer een oproep missen. Jouw AI-telefoniste werkt 24/7 in perfect Nederlands.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "https://belagent.nl",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
