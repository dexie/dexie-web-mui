import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  Paper,
  Divider,
} from "@mui/material"
import EmailIcon from "@mui/icons-material/Email"
import SupportIcon from "@mui/icons-material/Support"
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer"
import BugReportIcon from "@mui/icons-material/BugReport"
import BusinessIcon from "@mui/icons-material/Business"
import GitHubIcon from "@mui/icons-material/GitHub"
import LaunchIcon from "@mui/icons-material/Launch"
import PersonIcon from "@mui/icons-material/Person"
import LocationOnIcon from "@mui/icons-material/LocationOn"
import ContactForm from "@/components/content/ContactForm"
import CallToActionWidget from "@/components/content/CallToActionWidget"
import FAQWidget from "@/components/content/FAQWidget"

interface ContactAction {
  text: string
  href: string
  primary?: boolean
  external?: boolean
}

interface ContactMethod {
  title: string
  description: string
  icon: React.ReactElement
  actions: ContactAction[]
}

const contactMethods: ContactMethod[] = [
  {
    title: "Sales & Partnerships",
    description:
      "Contact our sales team or schedule a meeting to discuss business opportunities",
    icon: <BusinessIcon sx={{ fontSize: 40, color: "#c77dff" }} />,
    actions: [
      {
        text: "Email Sales",
        href: "mailto:sales@awarica.com",
        primary: true,
      },
      {
        text: "Schedule Meeting",
        href: "https://calendly.com/david-fahlander-awarica/30min",
        external: true,
      },
    ],
  },
  {
    title: "Technical Support",
    description:
      "Get help with technical issues, implementation questions, or request private support",
    icon: <SupportIcon sx={{ fontSize: 40, color: "#c77dff" }} />,
    actions: [
      {
        text: "Ask on StackOverflow",
        href: "http://stackoverflow.com/questions/ask?tags=dexie",
        external: true,
      },
      {
        text: "Private Support (€150/h)",
        href: "mailto:privsupport@dexie.org",
      },
    ],
  },
  {
    title: "Community & Questions",
    description:
      "Join our community or ask questions about Dexie.js and Dexie Cloud",
    icon: <QuestionAnswerIcon sx={{ fontSize: 40, color: "#c77dff" }} />,
    actions: [
      {
        text: "Discord Chat",
        href: "https://discord.com/channels/1328303736363421747/1339957860657926204",
        external: true,
      },
      {
        text: "GitHub Discussions",
        href: "https://github.com/dexie/Dexie.js/discussions",
        external: true,
      },
    ],
  },
  {
    title: "Bug Reports & Issues",
    description:
      "Found a bug or have a feature request? File an issue on GitHub",
    icon: <BugReportIcon sx={{ fontSize: 40, color: "#c77dff" }} />,
    actions: [
      {
        text: "File Dexie Issue",
        href: "https://github.com/dexie/Dexie.js/issues/new",
        external: true,
        primary: true,
      },
      {
        text: "File Cloud Issue",
        href: "https://github.com/dexie/Dexie.js/issues/new?labels=cloud",
        external: true,
      },
    ],
  },
  {
    title: "Business Inquiries",
    description: "Non-technical business questions and partnerships",
    icon: <EmailIcon sx={{ fontSize: 40, color: "#c77dff" }} />,
    actions: [
      {
        text: "Contact Business Team",
        href: "mailto:business@dexie.org",
        primary: true,
      },
    ],
  },
]

// FAQ data for contact page
const contactFaqData = [
  {
    id: 1,
    question: "What's the fastest way to get help with a technical issue?",
    answer:
      'For technical questions, we recommend posting on StackOverflow with the "dexie" tag. Our team actively monitors these questions and the community often provides quick answers.',
  },
  {
    id: 2,
    question: "How much does private support cost?",
    answer:
      "Private support is available at €150/hour with a minimum order of 10 hours. This includes dedicated email support and consultation for your specific project needs.",
  },
  {
    id: 3,
    question: "Can I schedule a call to discuss my project?",
    answer:
      "Yes! For sales and business inquiries, you can contact our sales team to schedule a meeting. This is perfect for discussing Dexie Cloud implementations or enterprise needs.",
  },
  {
    id: 4,
    question: "What types of support do you offer?",
    answer:
      "We offer multiple support channels: free community support via StackOverflow and Discord, GitHub Issues for bug reports, and paid private support for dedicated consultation and implementation help.",
  },
]

const companyInfo = {
  name: "Awarica AB",
  location: "Stockholm, Sweden",
  description:
    "Swedish company managing business around Dexie.js and Dexie Cloud",
}

const author = {
  name: "David Fahlander",
  role: "Creator of Dexie.js",
  links: [
    {
      text: "GitHub",
      href: "https://github.com/dfahlander",
      icon: <GitHubIcon />,
    },
    {
      text: "Medium",
      href: "https://medium.com/@dfahlander",
      icon: <PersonIcon />,
    },
    {
      text: "Twitter",
      href: "https://twitter.com/dfahlander",
      icon: <PersonIcon />,
    },
  ],
}

export default function ContactPage() {
  return (
    <Box>
      <Box
        sx={{
          flex: 1,
          display: "flex",
          minWidth: "100%",
          flexDirection: "column",
          padding: 40,
          paddingTop: "200px !important",
          paddingBottom: "100px !important",
          background:
            "linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url('/assets/images/dexie-bg.jpg')",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: "center",
            gap: 4,
          }}
        >
          <Box sx={{ flex: 1 }}>
            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: "2.5rem", md: "3.5rem" },
                fontWeight: 700,
                mb: 2,
                lineHeight: 1.2,
              }}
            >
              Get in Touch
            </Typography>
            <Typography
              variant="h5"
              sx={{
                mb: 3,
                opacity: 0.9,
                fontWeight: 300,
                fontSize: { xs: "1.1rem", md: "1.3rem" },
              }}
            >
              We love to answer questions about Dexie.js and help you build
              amazing applications. Choose the best way to reach us based on
              your needs.
            </Typography>
            <Button variant="contained" size="large" href="#contact-form">
              Send us a Message
            </Button>
          </Box>
          <Box sx={{ flex: 1, textAlign: "center" }}>
            <img
              src="/assets/images/support.png"
              alt="Support"
              style={{ maxWidth: "250px", height: "auto", opacity: 0.8 }}
            />
          </Box>
        </Box>
      </Box>
      <Divider />
      {/* Contact Methods Grid */}
      <Box sx={{ py: 8 }}>
        <Container maxWidth="lg">
          <Typography
            variant="h2"
            textAlign="center"
            sx={{ mb: 6, fontSize: { xs: "2rem", md: "2.5rem" } }}
          >
            How Can We Help?
          </Typography>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                md: "repeat(2, 1fr)",
                lg: "repeat(3, 1fr)",
              },
              gap: 4,
            }}
          >
            {contactMethods.map((method, index) => (
              <Box
                key={index}
                sx={{
                  height: "100%",
                  transition:
                    "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: 4,
                  },
                }}
              >
                <CardContent
                  sx={{
                    p: 3,
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Box sx={{ textAlign: "center", mb: 2 }}>{method.icon}</Box>
                  <Typography
                    variant="h5"
                    gutterBottom
                    textAlign="center"
                    sx={{ mb: 2 }}
                  >
                    {method.title}
                  </Typography>
                  <Typography
                    variant="body1"
                    color="text.secondary"
                    textAlign="center"
                    sx={{ mb: 3, flexGrow: 1 }}
                  >
                    {method.description}
                  </Typography>
                  <Box
                    sx={{ display: "flex", flexDirection: "column", gap: 1 }}
                  >
                    {method.actions.map((action, actionIndex) => (
                      <Button
                        key={actionIndex}
                        variant={action.primary ? "contained" : "outlined"}
                        href={action.href}
                        target={action.external ? "_blank" : undefined}
                        rel={
                          action.external ? "noopener noreferrer" : undefined
                        }
                        endIcon={action.external ? <LaunchIcon /> : undefined}
                        fullWidth
                      >
                        {action.text}
                      </Button>
                    ))}
                  </Box>
                </CardContent>
              </Box>
            ))}
          </Box>
        </Container>
      </Box>

      {/* Contact Form Section */}
      <Box id="contact-form" sx={{ py: 8 }}>
        <Container maxWidth="md">
          <Typography
            variant="h2"
            textAlign="center"
            sx={{ mb: 2, fontSize: { xs: "2rem", md: "2.5rem" } }}
          >
            Send us a Message
          </Typography>
          <Typography
            variant="body1"
            textAlign="center"
            color="text.secondary"
            sx={{ mb: 6 }}
          >
            Have a general question or want to discuss your project? Fill out
            the form below and we&apos;ll get back to you.
          </Typography>
          <ContactForm />
        </Container>
      </Box>

      {/* Company & Author Info */}
      <Box sx={{ py: 8 }}>
        <Container maxWidth="lg">
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "repeat(2, 1fr)" },
              gap: 6,
            }}
          >
            {/* Company Info */}
            <Paper
              sx={{
                p: 4,
                height: "100%",
                backgroundColor: "rgba(255,255,255,0.05)",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                <BusinessIcon sx={{ fontSize: 32, mr: 2 }} />
                <Typography variant="h4">Company Information</Typography>
              </Box>
              <Typography variant="h5" gutterBottom>
                {companyInfo.name}
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <LocationOnIcon sx={{ mr: 1, color: "text.secondary" }} />
                <Typography variant="body1" color="text.secondary">
                  {companyInfo.location}
                </Typography>
              </Box>
              <Typography variant="body1" sx={{ mb: 3 }}>
                {companyInfo.description}
              </Typography>
              <Button
                variant="outlined"
                href="mailto:business@dexie.org"
                startIcon={<EmailIcon />}
              >
                Contact Business Team
              </Button>
            </Paper>

            {/* Author Info */}
            <Paper
              sx={{
                p: 4,
                height: "100%",
                backgroundColor: "rgba(255,255,255,0.05)",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                <PersonIcon sx={{ fontSize: 32, mr: 2 }} />
                <Typography variant="h4">Meet the Creator</Typography>
              </Box>
              <Typography variant="h5" gutterBottom>
                {author.name}
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                {author.role}
              </Typography>
              <Typography variant="body1" sx={{ mb: 3 }}>
                The creator and maintainer of Dexie.js, passionate about making
                IndexedDB accessible to developers worldwide.
              </Typography>
              <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                {author.links.map((link, index) => (
                  <Button
                    key={index}
                    variant="outlined"
                    size="small"
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    startIcon={link.icon}
                    endIcon={<LaunchIcon />}
                  >
                    {link.text}
                  </Button>
                ))}
              </Box>
            </Paper>
          </Box>
        </Container>
      </Box>

      {/* FAQ Section */}
      <FAQWidget
        items={contactFaqData}
        settings={{
          sectionTitle: "Frequently Asked Questions",
          sectionSubtitle:
            "Common questions about contacting our team and getting support",
          containerWidth: "medium",
          backgroundColor: "rgba(255,255,255,0.05)",
        }}
      />

      {/* Call to Action */}
      <CallToActionWidget
        text="Ready to get started with Dexie.js? Join thousands of developers building amazing offline-first applications."
        buttonText="Get Started"
        buttonLink={{
          url: "/docs",
          querystring: "",
          title: "Get Started with Dexie.js",
          target: "_self",
        }}
      />
    </Box>
  )
}
