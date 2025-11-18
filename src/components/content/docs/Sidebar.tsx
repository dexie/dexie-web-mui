"use client"

import React, { useState } from "react"
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
import { offlineDB } from "@/db/offlineDB"
import { useLiveQuery } from "dexie-react-hooks"

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
  onNavigate?: () => void // Add optional onNavigate prop for mobile
  searchText?: string // Add external search text
  setSearchText?: (text: string) => void // Add external search text setter
}

const isNavItem = (item: NavItem | NavStructure): item is NavItem => {
  return "title" in item && "slug" in item
}

// Function to recursively filter navigation structure
const filterNavigation = async (
  navStructure: NavStructure,
  searchTerm: string
): Promise<NavStructure> => {
  if (searchTerm.trim() === "") {
    return navStructure
  }

  const foundSections = await offlineDB.findDocuments(searchTerm);
  return Object.fromEntries(foundSections.map(doc => [doc.title ?? doc.parentTitle ??  "Untitled", {
    title: doc.title ?? doc.parentTitle ??  "Untitled",
    slug: doc.url.replace(/^\/docs\//, ''),
  }]));
}

const Sidebar: React.FC<SidebarProps> = ({
  navigation,
  currentSlug,
  basePath = "/docs",
  onNavigate,
  searchText: externalSearchText,
  setSearchText: externalSetSearchText,
}) => {
  const [internalSearchText, setInternalSearchText] = useState("")
  
  // Use external search text if provided, otherwise use internal
  const searchText = externalSearchText ?? internalSearchText
  const setSearchText = externalSetSearchText ?? setInternalSearchText

  // Filtered navigation based on search text

  const filteredNav = useLiveQuery(
    () => filterNavigation(navigation, searchText),
    [searchText],
    navigation
  );

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
            p: { xs: 1, md: 2 },
          }}
        >
          <Link
            href={`${basePath}/${item.slug}`}
            onClick={onNavigate}
            style={{
              fontWeight: 700,
              maxWidth: "100%",
              overflow: "hidden",
              whiteSpace: "nowrap",
              textDecoration: "none",
              color: isActive ? "#c77dff" : "inherit",
              display: "block",
              width: "100%",
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
      <Box key={key} sx={{ mb: { xs: 1, md: 2 } }}>
        <Typography
          variant="overline"
          sx={{
            fontSize: { xs: "0.75rem", md: "0.875rem" },
            fontWeight: 600,
            letterSpacing: "0.5px",
          }}
        >
          {key.charAt(0).toUpperCase() + key.slice(1)}
        </Typography>
        <List sx={{ py: { xs: 0.5, md: 1 } }}>
          {Object.entries(item).map(([subKey, subItem]) =>
            renderNavItem(subKey, subItem, level + 1)
          )}
        </List>
      </Box>
    )
  }

  return (
    <Box sx={{ width: "100%", maxWidth: { xs: "100%", md: "300px" } }}>
      <Box mb={2}>
        <Typography
          variant="h5"
          mb={2}
          sx={{ fontSize: { xs: "1.25rem", md: "1.5rem" } }}
        >
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
            width: "100%",
            minWidth: { xs: "250px", md: "270px" },
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
