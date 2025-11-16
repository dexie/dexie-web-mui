"use client"

import React from "react"
import { Button } from "@mui/material"
import EditIcon from "@mui/icons-material/Edit"

interface EditOnGitHubButtonProps {
  slug: string
}

const EditOnGitHubButton: React.FC<EditOnGitHubButtonProps> = ({ slug }) => {
  // Convert slug to the correct path in the dexie-web repository
  const getGitHubEditUrl = (slug: string) => {
    return `https://github.com/dexie/dexie-web/edit/main/docs/${slug}.md`
  }

  return (
    <Button
      component="a"
      href={getGitHubEditUrl(slug)}
      target="_blank"
      rel="noopener noreferrer"
      variant="text"
      size="small"
      startIcon={<EditIcon sx={{ fontSize: "0.875rem" }} />}
      sx={{
        color: "text.secondary",
        fontSize: "0.75rem",
        textTransform: "none",
        fontWeight: 400,
        minWidth: "auto",
        px: 1.5,
        py: 0.5,
        borderRadius: 1,
        "&:hover": {
          color: "white",
          backgroundColor: "rgba(199, 125, 255, 0.15)",
          "& .MuiSvgIcon-root": {
            color: "white",
          },
        },
      }}
    >
      Edit on GitHub
    </Button>
  )
}

export default EditOnGitHubButton