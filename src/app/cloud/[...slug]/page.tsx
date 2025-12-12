import { getDocumentBySlug } from "@/utils/mdx"
import { PlainMdPage } from "../PlainMdPage"
import { notFound } from "next/navigation"


export default async function CloudSubPage({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params
  const slugString = slug.join("/")

  const doc = getDocumentBySlug(slugString, "cloud")
  if (!doc) {
    notFound()
  }
  return await PlainMdPage(doc)
}