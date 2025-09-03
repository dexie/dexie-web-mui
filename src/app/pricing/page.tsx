import CallToActionWidget from "@/components/content/CallToActionWidget"
import FAQWidget from "@/components/content/FAQWidget"
import PricingWidget, {
  type PricingPlan,
} from "@/components/content/PricingWidget"
import TypeWriter from "@/components/content/shared/TypeWriter"
import { Container, Box, Typography, Divider } from "@mui/material"

// FAQ data
const faqData = [
  {
    id: 1,
    question: "What is Dexie Cloud?",
    answer:
      "Dexie Cloud is a cloud service that adds real-time synchronization, authentication, and collaboration features to your Dexie.js applications. It enables offline-first applications with seamless sync when online.",
  },
  {
    id: 2,
    question: "Can I upgrade or downgrade my plan?",
    answer:
      "Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately, and billing adjustments are prorated.",
  },
  {
    id: 3,
    question: "What happens to my data if I cancel?",
    answer:
      "Your data remains accessible for 30 days after cancellation. You can export your data or reactivate your account during this period. After 30 days, data is permanently deleted.",
  },
  {
    id: 4,
    question: "Is there a free trial for paid plans?",
    answer:
      "Yes, both Pro and Enterprise plans come with a 14-day free trial. No credit card required to start your trial.",
  },
]

// Cloud pricing plans data
const cloudPlans = [
  {
    id: "free",
    title: "Free",
    subtitle: "Perfect for passion projects & simple websites.",
    price: "$0",
    priceNote: "per month",
    buttonText: "Start for Free",
    buttonLink: {
      url: "https://dexie.org/cloud/docs/getting-started",
      querystring: "",
      title: "Start for Free",
      target: "_blank",
    },
    sectionTitle: "Get started with:",
    features: [
      { text: "3 production users" },
      {
        text: "50,000 evaluation users",
        subtext: "With user management and authentication.",
      },
      { text: "Online authentication" },
      { text: "10 databases" },
      { text: "10 connections" },
      { text: "Community support" },
      { text: "100 MB storage" },
      {
        text: "Rate limits",
        subtext: "20 requests per second.",
      },
    ],
  },
  {
    id: "pro",
    title: "Pro",
    subtitle: "For scalable production applications.",
    price: "$0.12",
    priceNote: "per user / month",
    buttonText: "Start for Free",
    buttonLink: {
      url: "#contact",
      querystring: "",
      title: "Start for Free",
      target: "_self",
    },
    isPopular: true,
    sectionTitle: "Everything in the Free Plan, plus:",
    features: [
      { text: "Unlimited production users" },
      { text: "Unlimited evaluation users" },
      { text: "Unlimited databases" },
      { text: "50+ connections" },
      { text: "Email support" },
      {
        text: "Increased rate limits",
        subtext: "1000 requests per second.",
      },
      { text: "20+ GB storage" },
    ],
  },
  {
    id: "business",
    title: "Business",
    subtitle: "When you need control over your data.",
    price: "$3,495",
    priceNote: "forever",
    buttonText: "Buy now",
    buttonLink: {
      url: "#contact",
      querystring: "",
      title: "Buy now",
      target: "_self",
    },
    sectionTitle: "Host everything yourself:",
    features: [
      {
        text: "Install on your own server",
        subtext: "Delivered as a Docker image.",
      },
      { text: "No limits or recurring costs" },
      { text: "5 years of updates" },
      { text: "1 year of limited support" },
      { text: "Dedicated account manager" },
    ],
  },
  {
    id: "enterprise",
    title: "Enterprise",
    subtitle: "When you need full control, source code and freedom.",
    price: "$7,995",
    priceNote: "forever",
    buttonText: "Buy now",
    buttonLink: {
      url: "#contact",
      querystring: "",
      title: "Buy now",
      target: "_self",
    },
    sectionTitle: "Everything in Business, plus:",
    features: [
      {
        text: "Full source code",
        subtext: "Ten years of problem-solving—delivered to you on day one.",
      },
      {
        text: "Customize",
        subtext:
          "Customize the platform to your need and integrate with any system.",
      },
      { text: "1 year of full support" },
      { text: "Priority support" },
    ],
  },
]

// On-premises plans (for future use)
const onPremisesPlans: PricingPlan[] = []

export default function PricingPage() {
  return (
    <>
      {/* Pricing Widget */}
      <PricingWidget
        cloudPlans={cloudPlans}
        onPremisesPlans={onPremisesPlans}
        settings={{
          textColor: "#dee2e6",
          backgroundColor: "#000000",
          containerWidth: "big",
          sectionTitle: "Cloud and on-premises with",
          sectionSubtitle:
            "Fully managed cloud solution for seamless scaling and automatic hosting, or host everything yourself for full control over your backend and infrastructure.",
          typewriterStrings: ["full backend control"],
        }}
        sx={{ paddingTop: "200px !important" }}
      />
      <Divider />
      {/* FAQ Section */}
      <FAQWidget
        items={faqData}
        settings={{
          textColor: "#dee2e6",
          backgroundColor: "#000000",
          containerWidth: "big",
          sectionTitle: "Frequently Asked Questions",
          sectionSubtitle: "",
        }}
      />
      <Divider />

      {/* Call to Action Section */}
      <CallToActionWidget
        text="Join thousands of developers building amazing offline-first applications with Dexie Cloud."
        title="Ready to Get Started?"
        buttonText="Start Free"
        buttonLink={{
          url: "https://dexie.org/cloud/docs/getting-started",
          querystring: "",
          title: "Start Free",
          target: "_blank",
        }}
        secondaryButtonText="Contact Sales"
        secondaryButtonLink={{
          url: "#contact",
          querystring: "",
          title: "Contact Sales",
          target: "_self",
        }}
        textColor="#dee2e6"
        backgroundColor="#000000"
        containerWidth="big"
      />
    </>
  )
}
