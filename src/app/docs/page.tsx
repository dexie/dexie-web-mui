import { getAllDocs } from "@/utils/mdx"
import Link from "next/link"

export default function DocsHomePage() {
  const docs = getAllDocs()

  // Group documents by category/folder
  const docsByCategory = docs.reduce((acc, doc) => {
    const category = doc.metadata.slug.split("/")[0] || "General"
    if (!acc[category]) {
      acc[category] = []
    }
    acc[category].push(doc)
    return acc
  }, {} as Record<string, typeof docs>)

  return (
    <>
      <div className="theme-modern">
        <div className="dark-mode">
          <div className="page bg-dark-1" id="top">
            <main id="main">
              {/* Docs Home Section */}
              <section className="page-section bg-dark-1 light-content pt-0">
                <div className="container position-relative">
                  <div className="pt-100 pt-xs-60">
                    <div className="docs-home">
                      <div className="text-center mb-80 mb-xs-60">
                        <h1 className="section-title mb-40 mb-xs-30">
                          Documentation
                        </h1>
                        <p className="section-descr mb-0 opacity-085">
                          Welcome to the Dexie.js documentation. Here you will
                          find guides, API references, and examples.
                        </p>
                      </div>

                      <div className="row">
                        {Object.entries(docsByCategory).map(
                          ([category, categoryDocs]) => (
                            <div
                              key={category}
                              className="col-md-6 col-lg-4 mb-40"
                            >
                              <div className="card h-100 bg-dark-2 border-light-1">
                                <div className="card-body">
                                  <h5 className="card-title text-white mb-30">
                                    {category.charAt(0).toUpperCase() +
                                      category.slice(1)}
                                  </h5>
                                  <ul className="list-unstyled">
                                    {categoryDocs.slice(0, 5).map((doc) => (
                                      <li
                                        key={doc.metadata.slug}
                                        className="mb-10"
                                      >
                                        <Link
                                          href={`/docs/${doc.metadata.slug}`}
                                          className="text-primary text-decoration-none"
                                        >
                                          {doc.metadata.title}
                                        </Link>
                                      </li>
                                    ))}
                                    {categoryDocs.length > 5 && (
                                      <li className="text-muted opacity-065">
                                        ... and {categoryDocs.length - 5} more
                                      </li>
                                    )}
                                  </ul>
                                </div>
                              </div>
                            </div>
                          )
                        )}
                      </div>

                      <hr className="my-80 my-xs-60 opacity-1" />

                      <div className="row">
                        <div className="col-md-8">
                          <h2 className="section-title-medium mb-30">
                            Get Started Quickly
                          </h2>
                          <p className="text-white opacity-085 mb-40">
                            Start by reading our tutorial to get started with
                            Dexie.js.
                          </p>
                          <Link
                            href="/docs/Tutorial"
                            className="btn btn-mod btn-color btn-large btn-round"
                          >
                            Read Tutorial
                          </Link>
                        </div>
                        <div className="col-md-4">
                          <h3 className="section-title-small mb-20">
                            API Reference
                          </h3>
                          <p className="text-white opacity-085 mb-30">
                            Explore the complete API documentation.
                          </p>
                          <Link
                            href="/docs/API-Reference"
                            className="btn btn-mod btn-border-w btn-large btn-round"
                          >
                            View API
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
              {/* End Docs Home Section */}
            </main>
          </div>
        </div>
      </div>
    </>
  )
}
