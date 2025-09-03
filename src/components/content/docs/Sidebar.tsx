import React from "react"
import Link from "next/link"
import { generateNavigation } from "@/utils/mdx"
import { Box, List, ListItem, Typography } from "@mui/material"

interface NavItem {
  title: string
  slug: string
  layout?: string
}

interface NavStructure {
  [key: string]: NavItem | NavStructure
}

interface SidebarProps {
  navigation?: NavStructure
  currentSlug?: string
}

const isNavItem = (item: NavItem | NavStructure): item is NavItem => {
  return "title" in item && "slug" in item
}

const Sidebar: React.FC<SidebarProps> = ({ navigation, currentSlug }) => {
  const nav = navigation || generateNavigation()

  const renderNavItem = (
    key: string,
    item: NavItem | NavStructure,
    level = 0
  ): React.ReactElement => {
    // Check if it's a NavItem
    if (isNavItem(item)) {
      const isActive = currentSlug === item.slug
      return (
        <ListItem
          key={key}
          sx={{
            backgroundColor: isActive ? "rgba(255,255,255,0.1)" : "transparent",
            borderRadius: "6px",
          }}
        >
          <Link
            href={`/docs/${item.slug}`}
            style={{
              fontWeight: 700,
              maxWidth: "250px",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              direction: "rtl",
              textAlign: "left",
              textDecoration: "none",
            }}
            title={item.title}
          >
            {item.title}
          </Link>
        </ListItem>
      )
    }

    // It's a NavStructure (folder)
    return (
      <Box>
        <Typography variant="overline">
          {key.charAt(0).toUpperCase() + key.slice(1)}
        </Typography>
        <List>
          {Object.entries(item).map(([subKey, subItem]) =>
            renderNavItem(subKey, subItem, level + 1)
          )}
        </List>
      </Box>
    )
  }

  return (
    <Box>
      <Box>
        <Box>
          <Typography variant="h5">Documentation</Typography>
        </Box>
        <List>
          {Object.entries(nav).map(([key, item]) => renderNavItem(key, item))}
        </List>
      </Box>
    </Box>
  )
}

export default Sidebar
