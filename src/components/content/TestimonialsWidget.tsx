"use client"

import React from "react"
import { Box, Container, Typography, Avatar, IconButton } from "@mui/material"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import ArrowForwardIcon from "@mui/icons-material/ArrowForward"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, EffectFade } from "swiper/modules"
import type { Swiper as SwiperClass } from "swiper"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/effect-fade"
import FormatQuoteIcon from "@mui/icons-material/FormatQuote"
export interface TestimonialItem {
  quote: string
  author: string
  role: string
  image: string
}

export interface TestimonialsSettings {
  textColor?: string
  backgroundColor?: string
  containerWidth?: "small" | "default" | "big"
  sectionTitle?: string
  sectionSubtitle?: string
}

interface TestimonialsProps {
  items: TestimonialItem[]
  settings?: TestimonialsSettings
}

export default function TestimonialsWidget({
  items,
  settings: {
    textColor = "#dee2e6",
    backgroundColor = "#212529",
    containerWidth = "default",
    sectionTitle = "Dexie is trusted by",
    sectionSubtitle = "1,000,000+ developers.",
  } = {},
}: TestimonialsProps) {
  const [swiper, setSwiper] = React.useState<SwiperClass | null>(null)

  // Container width mapping
  const getContainerMaxWidth = () => {
    switch (containerWidth) {
      case "small":
        return "600px"
      case "big":
        return "1400px"
      case "default":
      default:
        return "1200px"
    }
  }

  const handlePrevSlide = () => {
    if (swiper) {
      swiper.slidePrev()
    }
  }

  const handleNextSlide = () => {
    if (swiper) {
      swiper.slideNext()
    }
  }

  return (
    <Box
      component="section"
      sx={{
        backgroundColor,
        color: textColor,
        py: 10,
        position: "relative",
      }}
    >
      <Container
        maxWidth={false}
        sx={{
          maxWidth: getContainerMaxWidth(),
          position: "relative",
        }}
      >
        <Box
          sx={{
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            py: { xs: 8, sm: 10 },
            px: { xs: 3, sm: 4 },
            borderRadius: 4,
          }}
        >
          <Box
            sx={{
              maxWidth: "800px",
              mx: "auto",
              textAlign: "center",
            }}
          >
            {/* Section Title */}
            <Box sx={{ mb: { xs: 6, sm: 8 } }}>
              <Typography
                variant="h2"
                component="h2"
                sx={{
                  color: textColor,
                  fontSize: {
                    xs: "2rem",
                    md: "2.5rem",
                    lg: "calc(4.179rem) !important",
                  },
                  lineHeight: 1.2,
                  mb: 2,
                }}
              >
                {sectionTitle}
                <br />
                <Box
                  component="span"
                  sx={{
                    position: "relative",
                    display: "inline-block",
                    "&::after": {
                      content: '""',
                      pointerEvents: "none",
                      backgroundImage:
                        "url(/assets/images/mark-decoration-1.svg)",
                      backgroundPosition: "0 0",
                      backgroundRepeat: "no-repeat",
                      backgroundSize: "auto 0.55357em",
                      width: "50%",
                      height: "0.5357em",
                      position: "absolute",
                      bottom: "-0.4em",
                      left: 0,
                    },
                  }}
                >
                  {sectionSubtitle}
                </Box>
              </Typography>
            </Box>

            {/* Testimonials Slider */}
            <Box sx={{ position: "relative", overflow: "hidden" }}>
              <Swiper
                modules={[Navigation, EffectFade]}
                spaceBetween={0}
                slidesPerView={1}
                loop={true}
                onSwiper={setSwiper}
                speed={800}
                effect="fade"
                fadeEffect={{
                  crossFade: true,
                }}
                style={{
                  overflow: "hidden",
                  width: "100%",
                }}
              >
                {items.map((testimonial, index) => (
                  <SwiperSlide key={index}>
                    <Box sx={{ px: { xs: 2, sm: 4 } }}>
                      {/* Quote */}
                      <Box sx={{ mb: 6, textAlign: "left" }}>
                        <Typography
                          variant="h4"
                          component="blockquote"
                          sx={{
                            color: textColor,
                            fontSize: { xs: "1.5rem", md: "2rem" },
                            fontWeight: 300,
                            fontStyle: "italic",
                            lineHeight: 1.4,
                            position: "relative",
                            paddingLeft: "4rem",
                          }}
                        >
                          <FormatQuoteIcon
                            sx={{
                              fontSize: "2rem",
                              padding: "1rem",
                              position: "absolute",
                              top: "0rem",
                              left: "-2rem",
                              color: "#000000",
                              //   opacity: 0.3,
                              backgroundColor: "white",
                              borderRadius: "50%",
                              width: "1em",
                              height: "1em",
                              textAlign: "left",
                              verticalAlign: "middle",
                            }}
                          />
                          {testimonial.quote}
                        </Typography>
                      </Box>

                      {/* Divider Line */}
                      <Box
                        sx={{
                          width: "60px",
                          height: "1px",
                          backgroundColor: textColor,
                          opacity: 0.3,
                          mb: 3,
                          ml: 8,
                        }}
                      />

                      {/* Author Info */}
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "flex-start",
                          gap: 2,
                          ml: 8,
                        }}
                      >
                        <Avatar
                          src={testimonial.image}
                          alt={testimonial.author}
                          sx={{
                            width: 44,
                            height: 44,
                          }}
                        />
                        <Box sx={{ textAlign: "left" }}>
                          <Typography
                            variant="body1"
                            sx={{
                              color: textColor,
                              fontWeight: 500,
                              mb: 0,
                            }}
                          >
                            {testimonial.author}
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{
                              color: textColor,
                              opacity: 0.7,
                              fontSize: "0.875rem",
                            }}
                          >
                            {testimonial.role}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  </SwiperSlide>
                ))}
              </Swiper>

              {/* Navigation Buttons */}
              <Box
                sx={{
                  position: "absolute",
                  display: "flex",
                  justifyContent: "center",
                  gap: 2,
                  bottom: -6, // Ge mer utrymme nedåt
                  right: 6,
                  zIndex: 10,
                  py: 1, // Lägg till padding för att ge utrymme för scaling
                }}
              >
                <IconButton
                  onClick={handlePrevSlide}
                  sx={{
                    backgroundColor: "#ffffff",
                    color: "#000000",
                    borderRadius: "50%",
                    width: 48,
                    height: 48,
                    "&:hover": {
                      backgroundColor: "#ffffff",
                      color: "#000000",
                      transform: "scale(1.1)",
                    },
                    transition: "all 0.3s ease",
                  }}
                  aria-label="Previous testimonial"
                >
                  <ArrowBackIcon />
                </IconButton>
                <IconButton
                  onClick={handleNextSlide}
                  sx={{
                    backgroundColor: "#ffffff",
                    color: "#000000",
                    borderRadius: "50%",
                    width: 48,
                    height: 48,
                    "&:hover": {
                      backgroundColor: "#ffffff",
                      color: "#000000",
                      transform: "scale(1.1)",
                    },
                    transition: "all 0.3s ease",
                  }}
                  aria-label="Next testimonial"
                >
                  <ArrowForwardIcon />
                </IconButton>
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  )
}
