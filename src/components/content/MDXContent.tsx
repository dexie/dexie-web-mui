"use client"

import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote"
import { components } from "./MarkdownContent"
import React from "react"

interface MDXContentProps {
  source: MDXRemoteSerializeResult
}

// Create a wrapper that handles class -> className and style string -> object conversion
const createElementWrapper = (Tag: string) => {
  const WrappedComponent = ({
    children,
    ...props
  }: React.HTMLAttributes<HTMLElement>) => {
    // Convert class to className and style string to object
    const convertedProps: Record<string, unknown> = { ...props }

    // Handle class -> className conversion
    if ("class" in convertedProps) {
      const classValue = convertedProps.class
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { class: _, ...rest } = convertedProps
      Object.assign(convertedProps, rest)
      if (classValue) {
        convertedProps.className = classValue
      }
    }

    // Handle style string -> object conversion
    if ("style" in convertedProps && typeof convertedProps.style === "string") {
      const styleString = convertedProps.style as string
      try {
        const styleObj: Record<string, string> = {}
        styleString
          .split(";")
          .filter((rule: string) => rule.trim())
          .forEach((rule: string) => {
            const [property, value] = rule
              .split(":")
              .map((s: string) => s.trim())
            if (property && value) {
              // Convert kebab-case to camelCase
              const camelProperty = property.replace(/-([a-z])/g, (g: string) =>
                g[1].toUpperCase()
              )
              styleObj[camelProperty] = value
            }
          })

        if (Object.keys(styleObj).length > 0) {
          convertedProps.style = styleObj
        } else {
          delete convertedProps.style
        }
      } catch (error) {
        console.warn(`Failed to parse style string: ${styleString}`, error)
        delete convertedProps.style
      }
    }

    return React.createElement(Tag, convertedProps, children)
  }

  WrappedComponent.displayName = `Wrapped${
    Tag.charAt(0).toUpperCase() + Tag.slice(1)
  }`
  return WrappedComponent
}

// Create components for common HTML elements that might have class attributes
// Exclude elements that are already handled in MarkdownContent.tsx
const htmlElementComponents = {
  // Text content (excluding p, a, ul, ol, li, code, pre, blockquote to avoid conflicts)
  div: createElementWrapper("div"),
  span: createElementWrapper("span"),

  // Structural elements
  section: createElementWrapper("section"),
  article: createElementWrapper("article"),
  header: createElementWrapper("header"),
  footer: createElementWrapper("footer"),
  nav: createElementWrapper("nav"),
  aside: createElementWrapper("aside"),
  main: createElementWrapper("main"),

  // Forms
  form: createElementWrapper("form"),
  input: createElementWrapper("input"),
  textarea: createElementWrapper("textarea"),
  button: createElementWrapper("button"),
  select: createElementWrapper("select"),
  option: createElementWrapper("option"),

  // Media (excluding img to avoid conflicts)
  figure: createElementWrapper("figure"),
  figcaption: createElementWrapper("figcaption"),
  audio: createElementWrapper("audio"),
  video: createElementWrapper("video"),

  // Text formatting elements (excluding code, pre)
  kbd: createElementWrapper("kbd"),
  samp: createElementWrapper("samp"),
  strong: createElementWrapper("strong"),
  em: createElementWrapper("em"),
  small: createElementWrapper("small"),
  mark: createElementWrapper("mark"),
  del: createElementWrapper("del"),
  ins: createElementWrapper("ins"),
  sub: createElementWrapper("sub"),
  sup: createElementWrapper("sup"),
  cite: createElementWrapper("cite"),
  abbr: createElementWrapper("abbr"),
  time: createElementWrapper("time"),
}

// Merge our custom components with HTML element handlers
// Custom components take precedence over generic wrappers
type ComponentType = React.ComponentType<React.HTMLAttributes<HTMLElement>>
const allComponents: Record<string, ComponentType> = {
  ...htmlElementComponents,
  ...components,
  // Force p elements to render as Typography to prevent nesting issues
  p: ({ children, ...props }: React.HTMLAttributes<HTMLElement>) => {
    // Convert class to className and style string to object
    const convertedProps: Record<string, unknown> = { ...props }

    // Handle class -> className conversion
    if ("class" in convertedProps) {
      const classValue = convertedProps.class
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { class: _, ...rest } = convertedProps
      Object.assign(convertedProps, rest)
      if (classValue) {
        convertedProps.className = classValue
      }
    }

    // Handle style string -> object conversion
    if ("style" in convertedProps && typeof convertedProps.style === "string") {
      const styleString = convertedProps.style as string
      try {
        const styleObj: Record<string, string> = {}
        styleString
          .split(";")
          .filter((rule: string) => rule.trim())
          .forEach((rule: string) => {
            const [property, value] = rule
              .split(":")
              .map((s: string) => s.trim())
            if (property && value) {
              // Convert kebab-case to camelCase
              const camelProperty = property.replace(/-([a-z])/g, (g: string) =>
                g[1].toUpperCase()
              )
              styleObj[camelProperty] = value
            }
          })

        if (Object.keys(styleObj).length > 0) {
          convertedProps.style = styleObj
        } else {
          delete convertedProps.style
        }
      } catch (error) {
        console.warn(`Failed to parse style string: ${styleString}`, error)
        delete convertedProps.style
      }
    }

    return React.createElement("div", convertedProps, children)
  },
  // Force li to use wrapper as fallback in case MarkdownContent doesn't catch it
  li: createElementWrapper("li"),
}

// Create a proxy that automatically creates wrappers for any missing HTML elements
const componentsProxy = new Proxy(allComponents, {
  get(
    target: Record<string, ComponentType>,
    prop: string | symbol
  ): ComponentType | undefined {
    if (typeof prop === "string" && target[prop]) {
      return target[prop]
    }

    // Skip creating wrappers for elements that should only use custom components
    const customOnlyElements = [
      "p",
      "a",
      "ul",
      "ol",
      "code",
      "pre",
      "blockquote",
      "table",
      "thead",
      "tbody",
      "tr",
      "th",
      "td",
      "img",
      "h1",
      "h2",
      "h3",
      "h4",
      "h5",
      "h6",
    ]
    if (typeof prop === "string" && customOnlyElements.includes(prop)) {
      return undefined // Let MDX use default HTML elements, which will be caught by custom components
    }

    // If the component doesn't exist and it looks like an HTML tag, create a wrapper
    if (typeof prop === "string" && /^[a-z][a-z0-9]*$/i.test(prop)) {
      const wrapper = createElementWrapper(prop)
      target[prop] = wrapper // Cache it for future use
      return wrapper
    }

    // Fallback: always return a wrapper for unknown elements
    if (typeof prop === "string") {
      const fallbackWrapper = createElementWrapper(prop)
      target[prop] = fallbackWrapper
      return fallbackWrapper
    }
    return undefined
  },
})

// Transform function to handle class -> className at the source level
const transformSource = (
  source: MDXRemoteSerializeResult
): MDXRemoteSerializeResult => {
  // If the compiled source contains class attributes, replace them with className
  if (source.compiledSource) {
    let transformedSource = source.compiledSource
      .replace(/\bclass=/g, "className=")
      .replace(/\bclass:/g, "className:")
      // Convert style string attributes to style objects at source level
      .replace(/style="([^"]*)"/g, (match, styleString) => {
        if (!styleString.trim()) return "style={{}}"
        try {
          const styleRules = styleString
            .split(";")
            .filter((rule: string) => rule.trim())
            .map((rule: string) => {
              const [property, value] = rule
                .split(":")
                .map((s: string) => s.trim())
              if (property && value) {
                // Convert kebab-case to camelCase
                const camelProperty = property.replace(
                  /-([a-z])/g,
                  (g: string) => g[1].toUpperCase()
                )
                return `${camelProperty}: "${value}"`
              }
              return ""
            })
            .filter(Boolean)
            .join(", ")

          return styleRules ? `style={{${styleRules}}}` : "style={{}}"
        } catch (error) {
          console.warn(
            `Failed to transform style at source level: ${styleString}`,
            error
          )
          return "style={{}}"
        }
      })
      // Also handle JSX function calls with style strings
      .replace(/style:\s*"([^"]*)"/g, (match, styleString) => {
        if (!styleString.trim()) return "style: {}"
        try {
          const styleRules = styleString
            .split(";")
            .filter((rule: string) => rule.trim())
            .map((rule: string) => {
              const [property, value] = rule
                .split(":")
                .map((s: string) => s.trim())
              if (property && value) {
                // Convert kebab-case to camelCase
                const camelProperty = property.replace(
                  /-([a-z])/g,
                  (g: string) => g[1].toUpperCase()
                )
                return `${camelProperty}: "${value}"`
              }
              return ""
            })
            .filter(Boolean)
            .join(", ")

          return styleRules ? `style: {${styleRules}}` : "style: {}"
        } catch (error) {
          console.warn(
            `Failed to transform JSX style at source level: ${styleString}`,
            error
          )
          return "style: {}"
        }
      })
      // Handle style in single quotes
      .replace(/style='([^']*)'/g, (match, styleString) => {
        if (!styleString.trim()) return "style={{}}"
        try {
          const styleRules = styleString
            .split(";")
            .filter((rule: string) => rule.trim())
            .map((rule: string) => {
              const [property, value] = rule
                .split(":")
                .map((s: string) => s.trim())
              if (property && value) {
                const camelProperty = property.replace(
                  /-([a-z])/g,
                  (g: string) => g[1].toUpperCase()
                )
                return `${camelProperty}: "${value}"`
              }
              return ""
            })
            .filter(Boolean)
            .join(", ")

          return styleRules ? `style={{${styleRules}}}` : "style={{}}"
        } catch (error) {
          console.warn(
            `Failed to transform single quote style: ${styleString}`,
            error
          )
          return "style={{}}"
        }
      })

    // Aggressive fix for nested p elements - replace all p with div temporarily
    transformedSource = transformedSource
      // Handle JSX function calls
      .replace(/\b_jsx\("p",/g, '_jsx("div",')
      .replace(/\b_jsxs\("p",/g, '_jsxs("div",')
      .replace(/\bjsx\("p",/g, 'jsx("div",')
      .replace(/\bjsxs\("p",/g, 'jsxs("div",')
      // Handle React.createElement calls
      .replace(/\bReact\.createElement\("p",/g, 'React.createElement("div",')
      .replace(/\bcreateElement\("p",/g, 'createElement("div",')
      // Handle string literals and templates
      .replace(/["'`]p["'`]/g, '"div"')
      // Handle HTML in template literals
      .replace(/<p(\s|>|\/)/g, "<div$1")
      .replace(/<\/p>/g, "</div>")
      // Handle function parameter patterns
      .replace(/\("p"\)/g, '("div")')
      .replace(/\['p'\]/g, '["div"]')
      // Handle object property access
      .replace(/\.p\b/g, ".div")
      // More comprehensive JSX patterns
      .replace(/jsx\s*\(\s*["']p["']/g, 'jsx("div"')
      .replace(/_jsx\s*\(\s*["']p["']/g, '_jsx("div"')

    // Debug logging to see what we're working with
    if (process.env.NODE_ENV === "development") {
      console.log(
        "🔍 Original compiled source snippet:",
        source.compiledSource.substring(0, 1000) + "..."
      )
      console.log(
        "🔄 Transformed source snippet:",
        transformedSource.substring(0, 1000) + "..."
      )

      if (
        transformedSource.includes('"p"') ||
        transformedSource.includes("'p'")
      ) {
        console.log(
          "⚠️ Still found p elements in transformed source:",
          transformedSource.substring(0, 500) + "..."
        )
      }
      // Also log if we find style strings in any elements
      if (
        transformedSource.includes('style="') ||
        transformedSource.includes("style:'")
      ) {
        console.log(
          "⚠️ Found style strings in transformed source:",
          transformedSource.match(/style="[^"]*"|style:'[^']*'/g)?.slice(0, 5)
        )
      }
      if (
        transformedSource.includes("li") &&
        (transformedSource.includes("style=") ||
          transformedSource.includes("style:"))
      ) {
        console.log(
          "⚠️ Found li elements with style in source:",
          transformedSource.substring(0, 1500) + "..."
        )
      }
    }

    return {
      ...source,
      compiledSource: transformedSource,
    }
  }
  return source
}

export default function MDXContent({ source }: MDXContentProps) {
  const transformedSource = transformSource(source)
  // Re-enable proxy now that we've cleaned up component conflicts
  return <MDXRemote {...transformedSource} components={componentsProxy} />
}
