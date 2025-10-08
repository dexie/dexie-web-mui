"use client"

import React, { useState, useMemo } from "react"
import Link from "next/link"
import {
  Box,
  List,
  ListItem,
  Typography,
  TextField,
  InputAdornment,
  IconButton,
} from "@mui/material"
import SearchIcon from "@mui/icons-material/Search"
import ClearIcon from "@mui/icons-material/Clear"

interface NavItem {
  title: string
  slug: string
  layout?: string
}

interface NavStructure {
  [key: string]: NavItem | NavStructure
}

interface SidebarProps {
  navigation: NavStructure
  currentSlug?: string
  basePath?: string // Add basePath prop
}

const isNavItem = (item: NavItem | NavStructure): item is NavItem => {
  return "title" in item && "slug" in item
}

// Function to recursively filter navigation structure
const filterNavigation = (
  navStructure: NavStructure,
  searchTerm: string
): NavStructure => {
  const filtered: NavStructure = {}
  const lowerSearchTerm = searchTerm.toLowerCase()

  Object.entries(navStructure).forEach(([key, item]) => {
    if (isNavItem(item)) {
      // Check if the item title matches the search term
      if (item.title.toLowerCase().includes(lowerSearchTerm)) {
        filtered[key] = item
      }
    } else {
      // It's a NavStructure, recursively filter it
      const filteredSubItems = filterNavigation(item, searchTerm)
      // Include the folder if it has matching items or if the folder name matches
      if (
        Object.keys(filteredSubItems).length > 0 ||
        key.toLowerCase().includes(lowerSearchTerm)
      ) {
        filtered[key] =
          Object.keys(filteredSubItems).length > 0 ? filteredSubItems : item
      }
    }
  })

  return filtered
}

const Sidebar: React.FC<SidebarProps> = ({
  navigation,
  currentSlug,
  basePath = "/docs",
}) => {
  const [searchText, setSearchText] = useState("")

  // Filtered navigation based on search text
  const filteredNav = useMemo(() => {
    if (!searchText.trim()) {
      return navigation
    }
    return filterNavigation(navigation, searchText.trim())
  }, [navigation, searchText])

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
            href={`${basePath}/${item.slug}`}
            style={{
              fontWeight: 700,
              maxWidth: "250px",
              overflow: "hidden",
              whiteSpace: "nowrap",
              textDecoration: "none",
              color: isActive ? "#c77dff" : "inherit",
            }}
            title={item.title}
          >
            {item.title.length > 28
              ? `...${item.title.slice(-26)}`
              : item.title}
          </Link>
        </ListItem>
      )
    }

    // It's a NavStructure (folder)
    return (
      <Box key={key}>
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
      <Box mb={2}>
        <Typography variant="h5" mb={2}>
          Documentation
        </Typography>
        <TextField
          size="small"
          placeholder="Search in documentation..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon fontSize="small" />
              </InputAdornment>
            ),
            endAdornment: searchText && (
              <InputAdornment position="end">
                <IconButton
                  aria-label="clear search"
                  title="Clear search"
                  size="small"
                  onClick={() => setSearchText("")}
                  edge="end"
                  sx={{
                    color: "rgba(255, 255, 255, 0.6)",
                    "&:hover": {
                      color: "rgba(255, 255, 255, 0.9)",
                      backgroundColor: "rgba(255, 255, 255, 0.1)",
                    },
                    padding: "2px",
                    marginRight: "-2px",
                  }}
                >
                  <ClearIcon
                    fontSize="small"
                    sx={{
                      height: "16px",
                      width: "16px",
                    }}
                  />
                </IconButton>
              </InputAdornment>
            ),
          }}
          sx={{
            minWidth: "270px !important",

            "& .MuiOutlinedInput-root": {
              borderRadius: "8px",
              backgroundColor: "rgba(255, 255, 255, 0.05)",
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.08)",
              },
              "&.Mui-focused": {
                backgroundColor: "rgba(255, 255, 255, 0.1)",
              },
            },
          }}
        />
      </Box>
      <List>
        {Object.entries(filteredNav).map(([key, item]) =>
          renderNavItem(key, item)
        )}
      </List>
      {searchText.trim() && Object.keys(filteredNav).length === 0 && (
        <Box sx={{ textAlign: "center", mt: 3, color: "text.secondary" }}>
          <Typography variant="body2">
            No results found for &ldquo;{searchText}&rdquo;
          </Typography>
        </Box>
      )}
    </Box>
  )
}

export default Sidebar
