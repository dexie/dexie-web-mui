import { visit } from "unist-util-visit"
import type { Root, Element } from "hast"

// Remark plugin to convert HTML table elements to JSX so they can be overridden by MDX components
export default function remarkHtmlToJsx() {
  return (tree: Root) => {
    visit(tree, "element", (node: Element) => {
      // Convert HTML table elements to JSX equivalents
      if (node.tagName === "table") {
        node.type = "mdxJsxFlowElement" as any
        node.name = "table"
        delete node.tagName
      } else if (["thead", "tbody", "tr", "th", "td"].includes(node.tagName)) {
        node.type = "mdxJsxFlowElement" as any
        node.name = node.tagName
        delete node.tagName
      }
    })
  }
}
