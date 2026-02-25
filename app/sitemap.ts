import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://belagent.nl";
  const now = new Date().toISOString();

  return [
    { url: base, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${base}/prijzen`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/login`, lastModified: now, changeFrequency: "yearly", priority: 0.7 },
    { url: `${base}/dashboard`, lastModified: now, changeFrequency: "always", priority: 0.5 },
  ];
}
