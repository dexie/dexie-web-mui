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
