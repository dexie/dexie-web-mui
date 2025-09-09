import CallToActionWidget from "@/components/content/CallToActionWidget"
import FAQWidget from "@/components/content/FAQWidget"
import PricingWidget, {
  type PricingPlan,
} from "@/components/content/PricingWidget"
import SupportPlansWidget, {
  type SupportPlan,
} from "@/components/content/SupportPlansWidget"
import PricingTableWidget, {
  type TableColumn,
  type TableRow,
} from "@/components/content/PricingTableWidget"
import StorageLimitsWidget, {
  type StorageLimit,
  type AdditionalStorage,
} from "@/components/content/StorageLimitsWidget"
import { Divider } from "@mui/material"

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

// Support plans data
const supportPlans: SupportPlan[] = [
  {
    title: "Prod Support",
    price: "Included",
    description:
      "This support option is included when subscribing to Dexie Cloud Production (SaaS) and includes email and chat support.",
    features: ["Email support", "Chat support"],
  },
  {
    title: "Business Support",
    price: "$695 / year",
    description:
      "This support option is available for the On-Prem Business Edition. One year of Business Support is included when purchasing Dexie Cloud On-Prem Business.",
    features: [
      "Chat support",
      "Email support",
      "Prioritized tickets",
      "Software updates",
      "Github issues",
    ],
  },
  {
    title: "Enterprise Support",
    price: "$3,495 / year",
    description:
      "Every customer is different and require different levels of support. With the Gold Support package, we can dedicate our support to your team, tailor SLAs and be available at the levels of customer's requirements.",
    features: [
      "SLA 16 business hours",
      "Access to private GIT repo of Dexie Cloud Server for source code updates",
      "Prioritized tickets",
      "Private Github issues",
      "Software updates",
      "Chat support",
      "Email support",
      "Video meetings",
      "Dedication",
    ],
  },
]

// Detailed comparison table data
const comparisonColumns: TableColumn[] = [
  { key: "feature", label: "Feature" },
  { key: "free", label: "Free (SaaS)", align: "center" },
  { key: "production", label: "Production (SaaS)", align: "center" },
  { key: "onPrem", label: "On-prem Business / Enterprise", align: "center" },
]

const comparisonRows: TableRow[] = [
  {
    feature: "Easy setup: npx dexie-cloud create",
    free: true,
    production: true,
    onPrem: "See docs",
  },
  {
    feature: "All main features included",
    free: true,
    production: true,
    onPrem: true,
  },
  {
    feature: "Customizable authentication",
    free: true,
    production: true,
    onPrem: true,
  },
  {
    feature: "Replaceable authentication",
    free: true,
    production: true,
    onPrem: true,
  },
  {
    feature: "Custom email templates",
    free: false,
    production: true,
    onPrem: true,
  },
  {
    feature: "Vertically scalable",
    free: false,
    production: true,
    onPrem: true,
  },
  {
    feature: "Horizontally scalable",
    free: false,
    production: true,
    onPrem: true,
  },
  {
    feature: "Max Number of databases",
    free: "Unlimited, free",
    production: "Unlimited, free",
    onPrem: "Unlimited",
  },
  {
    feature: "Evaluation users (your end users)",
    free: "Unlimited, free",
    production: "Unlimited, free",
    onPrem: "Unlimited",
  },
  {
    feature: "Demo accounts (for showcasing app)",
    free: "Unlimited, free",
    production: "Unlimited, free",
    onPrem: "Unlimited",
  },
  {
    feature: "Production users (your end users)",
    free: "3 seats, free",
    production: "USD $3/mo per 25 seats",
    onPrem: "Unlimited",
  },
  {
    feature: "Storage",
    free: "100 MB",
    production: "See storage limits",
    onPrem: "Unlimited",
  },
  {
    feature: "Simultaneous Client Connections",
    free: "10",
    production: "200 per 100 users",
    onPrem: "Unlimited",
  },
  {
    feature: "Sync rate-limits",
    free: "50 per 5 mins per user",
    production: "200 per 5 minutes per user",
    onPrem: "Configurable",
  },
  {
    feature: "Software updates (client)",
    free: "✔ (via npm)",
    production: "✔ (via npm)",
    onPrem: "✔ (via npm)",
  },
  {
    feature: "Software updates (server)",
    free: "N/A",
    production: "N/A",
    onPrem: "✔ (via git, npm or download)",
  },
  {
    feature: "Full source code",
    free: false,
    production: false,
    onPrem: "On-Prem Gold",
  },
  {
    feature: "Access to private Git repo",
    free: false,
    production: false,
    onPrem: "On-Prem Gold",
  },
  {
    feature: "Support options",
    free: "Github or Stackoverflow",
    production: "Email / chat",
    onPrem: "Silver- or Gold Support",
  },
]

// Storage limits data
const storageLimits: StorageLimit[] = [
  {
    seats: "Free edition",
    objectStorage: "25 MB",
    blobStorage: "75 MB",
    blobWrites: "1,000 / mo",
  },
  {
    seats: "25",
    objectStorage: "1 GB",
    blobStorage: "20 GB",
    blobWrites: "50,000 / mo",
  },
  {
    seats: "50",
    objectStorage: "2 GB",
    blobStorage: "40 GB",
    blobWrites: "100,000 / mo",
  },
  {
    seats: "75",
    objectStorage: "3 GB",
    blobStorage: "60 GB",
    blobWrites: "150,000 / mo",
  },
  {
    seats: "100",
    objectStorage: "4 GB",
    blobStorage: "80 GB",
    blobWrites: "200,000 / mo",
  },
  { seats: "...", objectStorage: "...", blobStorage: "...", blobWrites: "..." },
  {
    seats: "1,000",
    objectStorage: "20 GB",
    blobStorage: "800 GB",
    blobWrites: "2,000,000 / mo",
  },
  {
    seats: "10,000",
    objectStorage: "200 GB",
    blobStorage: "8 TB",
    blobWrites: "20,000,000 / mo",
  },
  {
    seats: "100,000",
    objectStorage: "2 TB",
    blobStorage: "80 TB",
    blobWrites: "200,000,000 / mo",
  },
]

// Additional storage pricing
const additionalStorageData: AdditionalStorage[] = [
  {
    storageType: "Blob Storage",
    storageCost: "USD $0.05 / extra GB / mo",
    syncCosts: "USD $0.5 per 10,000 additional write operations",
  },
  {
    storageType: "Object Storage",
    storageCost: "USD $2 / extra GB / mo",
    syncCosts: "-",
  },
]

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

      {/* Support Plans Section */}
      <SupportPlansWidget
        plans={supportPlans}
        settings={{
          textColor: "#dee2e6",
          backgroundColor: "#000000",
          containerWidth: "big",
          sectionTitle: "Support Options",
          sectionSubtitle:
            "Choose the right level of support for your team and requirements",
        }}
      />
      <Divider />

      {/* Detailed Pricing Table Section */}
      <PricingTableWidget
        title="Detailed Pricing Table"
        subtitle="For more details, check out this blog post."
        columns={comparisonColumns}
        rows={comparisonRows}
        settings={{
          textColor: "#dee2e6",
          backgroundColor: "#000000",
          containerWidth: "big",
        }}
      />
      <Divider />

      {/* Storage Limits Section */}
      <StorageLimitsWidget
        storageLimits={storageLimits}
        additionalStorage={additionalStorageData}
        settings={{
          textColor: "#dee2e6",
          backgroundColor: "#000000",
          containerWidth: "big",
        }}
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
