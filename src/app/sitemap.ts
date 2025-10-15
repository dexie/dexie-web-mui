import { MetadataRoute } from "next"
import { getAllDocs, getAllCloudDocs } from "@/utils/mdx"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://dexie.org"

  // Statiska sidor
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/product`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/pricing`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/docs`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/cloud/docs`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ]

  // Hämta alla docs
  try {
    const docs = getAllDocs()
    const docRoutes: MetadataRoute.Sitemap = docs.map((doc) => ({
      url: `${baseUrl}/docs/${doc.metadata.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    }))

    // Hämta alla cloud docs
    const cloudDocs = getAllCloudDocs()
    const cloudDocRoutes: MetadataRoute.Sitemap = cloudDocs
      .filter((doc) => doc.metadata.slug.startsWith("docs/"))
      .map((doc) => ({
        url: `${baseUrl}/cloud/docs/${doc.metadata.slug.replace("docs/", "")}`,
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.8,
      }))

    return [...staticRoutes, ...docRoutes, ...cloudDocRoutes]
  } catch (error) {
    console.error("Error generating sitemap:", error)
    return staticRoutes
  }
}
