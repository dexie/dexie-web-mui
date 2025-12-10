import { getDocumentBySlug } from "@/utils/mdx"
import { PlainMdPage } from "../PlainMdPage"
import { notFound } from "next/navigation"


export default async function CloudSubPage({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params
  const slugString = slug.join("/")

  // URL-decode the slug to handle encoded brackets like %5B and %5D
  const decodedSlugString = decodeURIComponent(slugString)

  const doc = getDocumentBySlug(slugString, "cloud")
  if (!doc) {
    notFound()
  }
  return await PlainMdPage(doc, decodedSlugString)
}