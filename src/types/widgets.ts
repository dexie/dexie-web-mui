export interface WidgetSettings {
  textColor?: string
  containerWidth?: "small" | "default" | "big"
  backgroundColor?: string
  height?: string
  overlayStrength?: string
  textAlignment?:
    | "left"
    | "center"
    | "right"
    | "space-around"
    | "space-between"
    | "space-evenly"
  verticalTextAlignment?: "top" | "center" | "bottom"
  textWidth?: string
}

export interface HeroWidgetSettings extends WidgetSettings {
  // Hero-specific settings can be added here
}

export interface BenefitsSettings extends WidgetSettings {
  sectionTitle?: string
  sectionSubtitle?: string
}

export interface TestimonialsSettings extends WidgetSettings {
  sectionTitle?: string
  sectionSubtitle?: string
}

export interface FeaturePoint {
  id: number
  number: string
  title: string
  description: string
  position: {
    x: number // Procent från vänster
    y: number // Procent från toppen
  }
}

export interface ScreenshotSlide {
  id: number
  title: string
  description?: string
  imageUrl: string
  imageAlt: string
  features: FeaturePoint[]
}

export interface FeatureScreenshotSettings extends WidgetSettings {
  sectionCaption?: string
  sectionTitle?: string
  description?: string
  slides: ScreenshotSlide[]
}
