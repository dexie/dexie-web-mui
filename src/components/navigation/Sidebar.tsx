"use client"

import React, { useState } from "react"
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
  Collapse,
  IconButton,
  useMediaQuery,
  useTheme,
} from "@mui/material"
import {
  ExpandMore,
  ExpandLess,
  Menu as MenuIcon,
  Description as DocumentIcon,
} from "@mui/icons-material"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { DocCategory } from "../../utils/mdx"

interface SidebarProps {
  navigation: DocCategory[]
  basePath: string
}

interface CategoryItemProps {
  category: DocCategory
  basePath: string
  currentPath: string
  level?: number
}

const CategoryItem: React.FC<CategoryItemProps> = ({
  category,
  basePath,
  currentPath,
  level = 0,
}) => {
  const [expanded, setExpanded] = useState(true)

  const handleToggle = () => {
    setExpanded(!expanded)
  }

  return (
    <Box>
      {/* Category Header */}
      <ListItemButton
        onClick={handleToggle}
        sx={{
          pl: 2 + level * 2,
          borderRadius: 1,
          mb: 0.5,
        }}
      >
        <ListItemText
          primary={
            <Typography variant="subtitle2" fontWeight="bold" color="primary">
              {category.title}
            </Typography>
          }
        />
        {expanded ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>

      {/* Category Content */}
      <Collapse in={expanded}>
        <List disablePadding>
          {/* Pages */}
          {category.pages.map((page) => {
            const href = `${basePath}/${page.slug.join("/")}`
            const isActive = currentPath === href

            return (
              <ListItem key={page.slug.join("-")} disablePadding>
                <ListItemButton
                  component={Link}
                  href={href}
                  sx={{
                    pl: 3 + level * 2,
                    borderRadius: 1,
                    mb: 0.5,
                    backgroundColor: isActive
                      ? "action.selected"
                      : "transparent",
                    "&:hover": {
                      backgroundColor: "action.hover",
                    },
                  }}
                >
                  <DocumentIcon
                    sx={{ mr: 1, fontSize: 16, color: "text.secondary" }}
                  />
                  <ListItemText
                    primary={page.metadata.title}
                    primaryTypographyProps={{
                      variant: "body2",
                      fontWeight: isActive ? "bold" : "normal",
                    }}
                  />
                </ListItemButton>
              </ListItem>
            )
          })}

          {/* Subcategories */}
          {category.subcategories.map((subcategory) => (
            <CategoryItem
              key={subcategory.name}
              category={subcategory}
              basePath={basePath}
              currentPath={currentPath}
              level={level + 1}
            />
          ))}
        </List>
      </Collapse>
    </Box>
  )
}

export const Sidebar: React.FC<SidebarProps> = ({ navigation, basePath }) => {
  const [mobileOpen, setMobileOpen] = useState(false)
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("md"))
  const currentPath = usePathname()

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const drawerContent = (
    <Box sx={{ width: 280, p: 2 }}>
      <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
        Navigation
      </Typography>
      <List disablePadding>
        {navigation.map((category) => (
          <CategoryItem
            key={category.name}
            category={category}
            basePath={basePath}
            currentPath={currentPath}
          />
        ))}
      </List>
    </Box>
  )

  return (
    <>
      {isMobile && (
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ position: "fixed", top: 16, left: 16, zIndex: 1200 }}
        >
          <MenuIcon />
        </IconButton>
      )}

      <Drawer
        variant={isMobile ? "temporary" : "permanent"}
        open={isMobile ? mobileOpen : true}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          "& .MuiDrawer-paper": {
            width: 280,
            boxSizing: "border-box",
            position: isMobile ? "fixed" : "sticky",
            top: 0,
            height: "100vh",
            overflowY: "auto",
          },
        }}
      >
        {drawerContent}
      </Drawer>
    </>
  )
}
