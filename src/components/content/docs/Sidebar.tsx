"use client"

import React, { useEffect, useState } from "react"
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
import { useSearchParams } from "next/navigation"
import PersistentSearchLink from "./PersistentSearchLink"

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
}

const isNavItem = (item: NavItem | NavStructure): item is NavItem => {
  return "title" in item && "slug" in item
}

// Function to recursively filter navigation structure
const searchDocs = async (
  navigation: NavStructure,
  searchTerm: string
): Promise<NavStructure> => {
  if (searchTerm.trim() === "") {
    return navigation;
  }

  const foundSections = await offlineDB.findDocuments(searchTerm);
  return Object.fromEntries(foundSections.map(doc => [doc.title ?? doc.parentTitle ??  "Untitled", {
    title: doc.parentTitle ?? doc.title ?? "Untitled",
    slug: doc.url.replace(/^\/docs\//, ''),
  }]));
}

const Sidebar: React.FC<SidebarProps> = ({
  navigation,
  currentSlug,
  basePath = "/docs",
  onNavigate
}) => {
  const searchParams = useSearchParams();
  const [searchText, setSearchText] = useState(searchParams.get("search") || "");
  console.log("Initial search text from URL:", searchText);

  // Filtered navigation based on search text
  const searchResults = useLiveQuery(
    () => searchDocs(navigation, searchText),
    [searchText],
    {loading: {title: "Loading...", slug: ""}} // hack to show nothing while loading (below...)
  )
  const filteredNavigation = searchResults.loading?.slug === ""
    ? {}
    : searchResults;

  // Handle keyboard navigation in search field
  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      // Focus first navigable item in results
      const firstLink = document.querySelector('[data-search-result-link]') as HTMLElement
      if (firstLink) {
        firstLink.focus()
      }
    }
  }

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
          <PersistentSearchLink
            href={`${basePath}/${item.slug}`}
            search={searchText.trim()}
            onClick={onNavigate}
            data-search-result-link
            tabIndex={0}
            style={{
              fontWeight: 700,
              maxWidth: "100%",
              overflow: "hidden",
              whiteSpace: "nowrap",
              textDecoration: "none",
              color: isActive ? "#c77dff" : "inherit",
              display: "block",
              width: "100%",
              outline: "none",
            }}
            onFocus={(e) => {
              e.target.style.backgroundColor = "rgba(199, 125, 255, 0.2)"
              e.target.style.color = "#c77dff"
            }}
            onBlur={(e) => {
              e.target.style.backgroundColor = isActive ? "rgba(255,255,255,0.1)" : "transparent"
              e.target.style.color = isActive ? "#c77dff" : "inherit"
            }}
            onKeyDown={(e) => {
              if (e.key === 'ArrowDown') {
                e.preventDefault()
                const allLinks = Array.from(document.querySelectorAll('[data-search-result-link]'))
                const currentIndex = allLinks.indexOf(e.target as HTMLElement)
                const nextLink = allLinks[currentIndex + 1] as HTMLElement
                if (nextLink) {
                  nextLink.focus()
                }
              } else if (e.key === 'ArrowUp') {
                e.preventDefault()
                const allLinks = Array.from(document.querySelectorAll('[data-search-result-link]'))
                const currentIndex = allLinks.indexOf(e.target as HTMLElement)
                if (currentIndex === 0) {
                  // Go back to search input
                  const searchInput = document.querySelector('input[placeholder*="Search"]') as HTMLElement
                  if (searchInput) {
                    searchInput.focus()
                  }
                } else {
                  const prevLink = allLinks[currentIndex - 1] as HTMLElement
                  if (prevLink) {
                    prevLink.focus()
                  }
                }
              }
            }}
            title={item.title}
          >
            {item.title.length > 28
              ? `...${item.title.slice(-26)}`
              : item.title}
          </PersistentSearchLink>
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
    <Box sx={{ 
      width: "100%", 
      maxWidth: { xs: "100%", md: "300px" },
      height: "100%",
      display: "flex",
      flexDirection: "column"
    }}>
      {/* Fixed header section */}
      <Box sx={{ 
        flexShrink: 0,
        mb: 2,
        pb: 2,
        borderBottom: "1px solid rgba(255, 255, 255, 0.08)"
      }}>
        {setSearchText != null && <TextField
          size="small"
          placeholder="Search in documentation..."
          value={searchText}
          autoFocus={true}
          onChange={(e) => setSearchText(e.target.value)}
          onKeyDown={handleSearchKeyDown}
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
        />}
      </Box>
      
      {/* Scrollable navigation content */}
      <Box 
        sx={{ 
        flex: 1,
        overflowY: "auto",
        // Custom scrollbar styling
        "&::-webkit-scrollbar": {
          width: "6px",
        },
        "&::-webkit-scrollbar-track": {
          background: "transparent",
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          borderRadius: "3px",
          "&:hover": {
            backgroundColor: "rgba(255, 255, 255, 0.2)",
          },
        },
        scrollbarWidth: "thin",
        scrollbarColor: "rgba(255, 255, 255, 0.1) transparent",
      }}
      >
        <List role="listbox" aria-label="Search results">{Object.entries(filteredNavigation).map(([key, item]) =>
            renderNavItem(key, item)
          )}
        </List>
        {searchText.trim() && Object.keys(filteredNavigation).length === 0 && !('loading' in searchResults) && (
          <Box sx={{ textAlign: "center", mt: 3, color: "text.secondary" }}>
            <Typography variant="body2">
              No results found for &ldquo;{searchText}&rdquo;
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  )
}

export default Sidebar
