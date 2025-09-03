import React from "react"
import { Box, Typography, Link, Paper, Alert } from "@mui/material"
import { styled } from "@mui/material/styles"
import CodeBlock from "../common/CodeBlock"

interface MarkdownContentProps {
  children: React.ReactNode
}

const StyledMarkdownContent = styled(Box)(({ theme }) => ({
  // Global markdown styles
  "& .markdown-content": {
    lineHeight: 1.7,
    color: theme.palette.text.primary,
  },
}))

const MarkdownContent: React.FC<MarkdownContentProps> = ({ children }) => {
  return (
    <StyledMarkdownContent>
      <div className="markdown-content">{children}</div>
    </StyledMarkdownContent>
  )
}

// Helper function to convert class to className and style strings to objects
const convertProps = (
  props: Record<string, unknown>,
  defaultSx?: Record<string, unknown>
) => {
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
          const [property, value] = rule.split(":").map((s: string) => s.trim())
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

  // Add default MUI sx prop if provided
  if (defaultSx) {
    convertedProps.sx = {
      ...defaultSx,
      ...(convertedProps.sx && typeof convertedProps.sx === "object"
        ? convertedProps.sx
        : {}),
    }
  }

  return convertedProps
}

// Helper function to convert class to className (legacy - keeping for compatibility)
const convertClassToClassName = (props: Record<string, unknown>) => {
  if ("class" in props) {
    const { class: classValue, ...rest } = props
    return { ...rest, className: classValue }
  }
  return props
}

// Anpassade komponenter för MDX-rendering med MUI
export const components = {
  h1: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => {
    const convertedProps = convertProps(props, {
      variant: "h2",
      component: "h1",
      gutterBottom: true,
      fontWeight: 600,
      mb: 4,
    })
    return <Typography {...convertedProps}>{children}</Typography>
  },
  h2: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => {
    const convertedProps = convertProps(props, {
      variant: "h3",
      component: "h2",
      gutterBottom: true,
      fontWeight: 600,
      mt: 4,
      mb: 3,
    })
    return <Typography {...convertedProps}>{children}</Typography>
  },
  h3: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => {
    const convertedProps = convertProps(props, {
      variant: "h4",
      component: "h3",
      gutterBottom: true,
      fontWeight: 600,
      mt: 3,
      mb: 2,
    })
    return <Typography {...convertedProps}>{children}</Typography>
  },
  h4: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => {
    const convertedProps = convertProps(props, {
      variant: "h5",
      component: "h4",
      gutterBottom: true,
      fontWeight: 600,
      mt: 3,
      mb: 2,
    })
    return <Typography {...convertedProps}>{children}</Typography>
  },
  h5: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => {
    const convertedProps = convertProps(props, {
      variant: "h6",
      component: "h5",
      gutterBottom: true,
      fontWeight: 600,
      mt: 2,
      mb: 1,
    })
    return <Typography {...convertedProps}>{children}</Typography>
  },
  h6: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => {
    const convertedProps = convertProps(props, {
      variant: "subtitle1",
      component: "h6",
      gutterBottom: true,
      fontWeight: 600,
      mt: 2,
      mb: 1,
    })
    return <Typography {...convertedProps}>{children}</Typography>
  },
  p: ({ children, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => {
    const convertedProps = convertProps(props, {
      variant: "body1",
      paragraph: true,
      lineHeight: 1.7,
      mb: 2,
    })
    return <Typography {...convertedProps}>{children}</Typography>
  },
  a: ({
    children,
    href,
    ...props
  }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
    const convertedProps = convertProps(props, {
      color: "primary",
      underline: "hover",
      fontWeight: 500,
    })
    return (
      <Link href={href} {...convertedProps}>
        {children}
      </Link>
    )
  },
  ul: ({ children, ...props }: React.HTMLAttributes<HTMLUListElement>) => {
    const convertedProps = convertProps(props, { mb: 3 })
    return (
      <Box component="ul" {...convertedProps}>
        {children}
      </Box>
    )
  },
  ol: ({ children, ...props }: React.HTMLAttributes<HTMLOListElement>) => {
    const convertedProps = convertProps(props, { mb: 3 })
    return (
      <Box component="ol" {...convertedProps}>
        {children}
      </Box>
    )
  },
  li: ({ children, ...props }: React.LiHTMLAttributes<HTMLLIElement>) => {
    const convertedProps = convertProps(props, { mb: 1 })
    return (
      <Box component="li" {...convertedProps}>
        {children}
      </Box>
    )
  },
  code: ({
    children,
    className,
    ...props
  }: React.HTMLAttributes<HTMLElement>) => {
    // Inline kod (inte kod block)
    if (!className) {
      return (
        <Box
          component="code"
          sx={{
            backgroundColor: "grey.100",
            color: "error.main",
            px: 1,
            py: 0.5,
            borderRadius: 1,
            fontSize: "0.875rem",
            fontFamily:
              'Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
          }}
          {...props}
        >
          {children}
        </Box>
      )
    }

    // Detta är ett kodblock från markdown (```språk)
    const match = /language-(\w+)/.exec(className || "")
    const language = match ? match[1] : "javascript"
    const codeString = String(children).replace(/\n$/, "")

    return (
      <CodeBlock
        language={language}
        code={codeString}
        showLineNumbers={true}
        className="mb-3"
      />
    )
  },
  pre: ({ children }: React.HTMLAttributes<HTMLPreElement>) => {
    // För kodblock, låt bara code-komponenten rendera utan pre-wrapper
    return <>{children}</>
  },
  blockquote: ({
    children,
    ...props
  }: React.HTMLAttributes<HTMLQuoteElement>) => {
    const convertedProps = convertClassToClassName(props)
    return (
      <Alert
        severity="info"
        sx={{
          my: 3,
          borderLeft: 4,
          borderColor: "primary.main",
          backgroundColor: "grey.50",
          "& .MuiAlert-message": {
            fontStyle: "italic",
          },
        }}
        {...convertedProps}
      >
        {children}
      </Alert>
    )
  },
  table: ({
    children,
    ...props
  }: React.TableHTMLAttributes<HTMLTableElement>) => {
    const convertedProps = convertClassToClassName(props)
    return (
      <Paper sx={{ mb: 3, overflow: "hidden" }}>
        <Box
          component="table"
          sx={{
            width: "100%",
            borderCollapse: "collapse",
            "& th, & td": {
              border: 1,
              borderColor: "divider",
              p: 1,
              textAlign: "left",
            },
            "& th": {
              backgroundColor: "grey.100",
              fontWeight: 600,
            },
          }}
          {...convertedProps}
        >
          {children}
        </Box>
      </Paper>
    )
  },
  thead: ({
    children,
    ...props
  }: React.HTMLAttributes<HTMLTableSectionElement>) => (
    <thead {...props}>{children}</thead>
  ),
  tbody: ({
    children,
    ...props
  }: React.HTMLAttributes<HTMLTableSectionElement>) => (
    <tbody {...props}>{children}</tbody>
  ),
  tr: ({ children, ...props }: React.HTMLAttributes<HTMLTableRowElement>) => {
    const convertedProps = convertClassToClassName(props)
    return <tr {...convertedProps}>{children}</tr>
  },
  th: ({
    children,
    ...props
  }: React.ThHTMLAttributes<HTMLTableCellElement>) => {
    const convertedProps = convertClassToClassName(props)
    return <th {...convertedProps}>{children}</th>
  },
  td: ({
    children,
    ...props
  }: React.TdHTMLAttributes<HTMLTableCellElement>) => {
    const convertedProps = convertClassToClassName(props)
    return <td {...convertedProps}>{children}</td>
  },
  img: ({ src, alt, ...props }: React.ImgHTMLAttributes<HTMLImageElement>) => (
    <Box
      component="img"
      src={src}
      alt={alt || ""}
      sx={{
        maxWidth: "100%",
        height: "auto",
        borderRadius: 1,
        mb: 3,
      }}
      {...props}
    />
  ),
  hr: (props: React.HTMLAttributes<HTMLHRElement>) => (
    <Box
      component="hr"
      sx={{
        border: "none",
        borderTop: 1,
        borderColor: "divider",
        my: 3,
      }}
      {...props}
    />
  ),
  // Generic div handler for any div elements with class attributes
  div: ({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
    const convertedProps = convertClassToClassName(props)
    return <div {...convertedProps}>{children}</div>
  },
  // Generic span handler
  span: ({ children, ...props }: React.HTMLAttributes<HTMLSpanElement>) => {
    const convertedProps = convertClassToClassName(props)
    return <span {...convertedProps}>{children}</span>
  },
}

export default MarkdownContent
