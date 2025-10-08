import * as Prism from "prismjs"
import "prismjs/components/prism-javascript"
import "prismjs/components/prism-typescript"
import "prismjs/components/prism-jsx"
import "prismjs/components/prism-tsx"
import "prismjs/components/prism-bash"
import "prismjs/plugins/command-line/prism-command-line"
import CopyButton from "./CopyButton"
interface CodeBlockProps {
  code: string
  language?: string
  className?: string
  showLineNumbers?: boolean
  highlightLines?: number[]
  strikethroughLines?: number[]
  commandLine?: boolean
  commandUser?: string
  commandHost?: string
  commandPrompt?: string
  commandOutput?: string | number[]
}

function formatCodeWithLineNumbers(
  code: string,
  showLineNumbers: boolean,
  highlightLines: number[],
  strikethroughLines: number[]
): string {
  // Highlighta koden först med Prism
  const highlighted = Prism.highlight(
    code,
    Prism.languages.javascript,
    "javascript"
  )

  const lines = highlighted.split("\n")
  // Ta bort sista tomma raden om den finns
  if (lines[lines.length - 1] === "") {
    lines.pop()
  }

  return lines
    .map((line, index) => {
      const lineNumber = index + 1
      const isHighlighted = highlightLines.includes(lineNumber)
      const isStrikethrough = strikethroughLines.includes(lineNumber)

      let processedLine = line

      // Om det är en strikethrough-linje, wrap bara texten (inte mellanslag) i ett span
      if (isStrikethrough) {
        const leadingWhitespace = line.match(/^\s*/)?.[0] || ""
        const trailingWhitespace = line.match(/\s*$/)?.[0] || ""
        const textContent = line.slice(
          leadingWhitespace.length,
          line.length - trailingWhitespace.length
        )

        if (textContent.length > 0) {
          processedLine =
            leadingWhitespace +
            `<span class="strikethrough-content">${textContent}</span>` +
            trailingWhitespace
        }
      }

      const lineClasses = [
        "code-line",
        showLineNumbers ? "line-number" : "",
        isHighlighted ? "highlight-line" : "",
        isStrikethrough ? "strikethrough-line" : "",
      ]
        .filter(Boolean)
        .join(" ")

      return `<span class="${lineClasses}" line="${lineNumber}">${processedLine}\n</span>`
    })
    .join("")
}

export default function CodeBlock({
  code,
  language = "javascript",
  className = "",
  showLineNumbers = false,
  highlightLines = [],
  strikethroughLines = [],
  commandLine = false,
  commandUser = "",
  commandHost = "",
  commandPrompt = "$",
  commandOutput = "",
}: CodeBlockProps) {
  // Build command line data attributes
  const commandLineProps: Record<string, string> = {}

  if (commandLine) {
    if (commandUser) commandLineProps["data-user"] = commandUser
    if (commandHost) commandLineProps["data-host"] = commandHost
    if (commandPrompt) commandLineProps["data-prompt"] = commandPrompt
    if (commandOutput) {
      if (typeof commandOutput === "string") {
        commandLineProps["data-output"] = commandOutput
      } else if (Array.isArray(commandOutput)) {
        commandLineProps["data-output"] = commandOutput.join(",")
      }
    }
  }

  const preClasses = [
    `language-${language}`,
    className,
    commandLine ? "command-line" : "",
  ]
    .filter(Boolean)
    .join(" ")

  // Få rätt språk för Prism
  const prismLanguage = Prism.languages[language] || Prism.languages.javascript

  let formattedContent: string
  if (
    showLineNumbers ||
    highlightLines.length > 0 ||
    strikethroughLines.length > 0
  ) {
    formattedContent = formatCodeWithLineNumbers(
      code,
      showLineNumbers,
      highlightLines,
      strikethroughLines
    )
  } else {
    formattedContent = Prism.highlight(code, prismLanguage, language)
  }

  const codeClasses = [`language-${language}`, "code-highlight"].join(" ")

  return (
    <div className="codeblock-container" style={{ position: "relative" }}>
      <CopyButton code={code} />
      <pre className={preClasses} {...commandLineProps}>
        <code
          className={codeClasses}
          dangerouslySetInnerHTML={{ __html: formattedContent }}
        />
      </pre>
    </div>
  )
}
