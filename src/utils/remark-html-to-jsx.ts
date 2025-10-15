import { visit } from "unist-util-visit"
import type { Root, Element } from "hast"

// Remark plugin to convert HTML table elements to JSX so they can be overridden by MDX components
export default function remarkHtmlToJsx() {
  return (tree: Root) => {
    visit(tree, "element", (node: Element) => {
      // Convert HTML table elements to JSX equivalents
      if (node.tagName === "table") {
        ;(node as unknown as Record<string, string | undefined>).type =
          "mdxJsxFlowElement"
        ;(node as unknown as Record<string, string | undefined>).name = "table"
        ;(node as unknown as Record<string, string | undefined>).tagName =
          undefined
      } else if (["thead", "tbody", "tr", "th", "td"].includes(node.tagName)) {
        ;(node as unknown as Record<string, string | undefined>).type =
          "mdxJsxFlowElement"
        ;(node as unknown as Record<string, string | undefined>).name =
          node.tagName
        ;(node as unknown as Record<string, string | undefined>).tagName =
          undefined
      }
    })
  }
}
