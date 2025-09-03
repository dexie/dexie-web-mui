"use client"

import React, { useState } from "react"
import {
  Container,
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"

export interface FAQItem {
  id: number
  question: string
  answer: string
}

export interface FAQSettings {
  textColor?: string
  backgroundColor?: string
  containerWidth?: "small" | "medium" | "big"
  sectionTitle?: string
  sectionSubtitle?: string
}

export interface FAQWidgetProps {
  items: FAQItem[]
  settings: FAQSettings
}

const FAQWidget: React.FC<FAQWidgetProps> = ({ items, settings }) => {
  const [expanded, setExpanded] = useState<string | false>(false)

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false)
    }

  const getMaxWidth = () => {
    switch (settings.containerWidth) {
      case "small":
        return "sm"
      case "medium":
        return "md"
      case "big":
      default:
        return "lg"
    }
  }

  return (
    <Box
      sx={{
        backgroundColor: settings.backgroundColor || "#ffffff",
        color: settings.textColor || "#000000",
        py: { xs: 6, md: 10 },
      }}
    >
      <Container maxWidth={getMaxWidth()}>
        {(settings.sectionTitle || settings.sectionSubtitle) && (
          <Box
            sx={{
              textAlign: "center",
              mb: { xs: 4, md: 6 },
              maxWidth: "800px",
              mx: "auto",
            }}
          >
            {settings.sectionTitle && (
              <Typography
                variant="h2"
                component="h2"
                sx={{
                  fontSize: { xs: "2rem", md: "2.5rem" },
                  fontWeight: 700,
                  mb: settings.sectionSubtitle ? 2 : 0,
                }}
              >
                {settings.sectionTitle}
              </Typography>
            )}
            {settings.sectionSubtitle && (
              <Typography
                variant="body1"
                sx={{
                  fontSize: { xs: "1rem", md: "1.125rem" },
                  opacity: 0.85,
                }}
              >
                {settings.sectionSubtitle}
              </Typography>
            )}
          </Box>
        )}

        <Box
          sx={{
            maxWidth: "800px",
            mx: "auto",
          }}
        >
          {items.map((item) => (
            <Accordion
              key={item.id}
              expanded={expanded === `panel${item.id}`}
              onChange={handleChange(`panel${item.id}`)}
              sx={{
                backgroundColor: "transparent",
                color: settings.textColor || "#000000",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                borderRadius: "8px !important",
                mb: 2,
                "&:before": {
                  display: "none",
                },
                "&.Mui-expanded": {
                  margin: "0 0 16px 0",
                },
              }}
            >
              <AccordionSummary
                expandIcon={
                  <ExpandMoreIcon
                    sx={{ color: settings.textColor || "#000000" }}
                  />
                }
                sx={{
                  minHeight: "64px",
                  "&.Mui-expanded": {
                    minHeight: "64px",
                  },
                  "& .MuiAccordionSummary-content": {
                    margin: "16px 0",
                    "&.Mui-expanded": {
                      margin: "16px 0",
                    },
                  },
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 600,
                    fontSize: { xs: "1rem", md: "1.125rem" },
                    mb: "0px !important",
                  }}
                >
                  {item.question}
                </Typography>
              </AccordionSummary>
              <AccordionDetails
                sx={{
                  pt: 0,
                  pb: 3,
                }}
              >
                <Typography
                  variant="body1"
                  sx={{
                    opacity: 0.85,
                    lineHeight: 1.6,
                    fontSize: { xs: "0.9rem", md: "1rem" },
                  }}
                >
                  {item.answer}
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      </Container>
    </Box>
  )
}

export default FAQWidget
