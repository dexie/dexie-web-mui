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
import ChatIcon from "@mui/icons-material/Chat"
import ContactForm from "@/components/content/ContactForm"
import CallToActionWidget from "@/components/content/CallToActionWidget"
import FAQWidget from "@/components/content/FAQWidget"
import ManageSearchIcon from "@mui/icons-material/ManageSearch"
interface ContactAction {
  text: string
  href: string
  external?: boolean
  variant?: "contained" | "text" | "outlined"
  icon?: React.ReactElement
  color?: string
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
    icon: (
      <BusinessIcon sx={{ fontSize: 40, color: "rgba(255, 255, 255, 0.3)" }} />
    ),
    actions: [
      {
        text: "Email Sales",
        href: "mailto:sales@awarica.com",
        variant: "text",
      },
      {
        text: "Schedule Meeting",
        href: "https://calendly.com/david-fahlander-awarica/30min",
        external: true,
        variant: "contained",
      },
    ],
  },

  {
    title: "Google your problem first",
    description:
      "Before you file an issue, please Google your problem first - chances are you find hints or answers in an existing stackoverflow-, GitHub, docs page or some blog. ",
    icon: (
      <ManageSearchIcon
        sx={{ fontSize: 40, color: "rgba(255, 255, 255, 0.3)" }}
      />
    ),
    actions: [
      {
        text: "Existing Issues",
        href: "https://github.com/dexie/Dexie.js/issues?q=is%3Aissue",
        external: true,
        variant: "text",
      },
    ],
  },
  {
    title: "Community & Questions",
    description:
      "Join our community where you can ask questions, help others, and hang with like-minded individuals or discuss on GitHub Discussions",
    icon: (
      <QuestionAnswerIcon
        sx={{ fontSize: 40, color: "rgba(255, 255, 255, 0.3)" }}
      />
    ),
    actions: [
      {
        text: "Discord Chat",
        href: "https://discord.com/channels/1328303736363421747/1339957860657926204",
        external: true,
        variant: "contained",
        icon: (
          <svg
            width="26 px"
            height="26px"
            viewBox="0 0 24 24"
            fill="#ffffff"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M18.8943 4.34399C17.5183 3.71467 16.057 3.256 14.5317 3C14.3396 3.33067 14.1263 3.77866 13.977 4.13067C12.3546 3.89599 10.7439 3.89599 9.14391 4.13067C8.99457 3.77866 8.77056 3.33067 8.58922 3C7.05325 3.256 5.59191 3.71467 4.22552 4.34399C1.46286 8.41865 0.716188 12.3973 1.08952 16.3226C2.92418 17.6559 4.69486 18.4666 6.4346 19C6.86126 18.424 7.24527 17.8053 7.57594 17.1546C6.9466 16.92 6.34927 16.632 5.77327 16.2906C5.9226 16.184 6.07194 16.0667 6.21061 15.9493C9.68793 17.5387 13.4543 17.5387 16.889 15.9493C17.0383 16.0667 17.177 16.184 17.3263 16.2906C16.7503 16.632 16.153 16.92 15.5236 17.1546C15.8543 17.8053 16.2383 18.424 16.665 19C18.4036 18.4666 20.185 17.6559 22.01 16.3226C22.4687 11.7787 21.2836 7.83202 18.8943 4.34399ZM8.05593 13.9013C7.01058 13.9013 6.15725 12.952 6.15725 11.7893C6.15725 10.6267 6.98925 9.67731 8.05593 9.67731C9.11191 9.67731 9.97588 10.6267 9.95454 11.7893C9.95454 12.952 9.11191 13.9013 8.05593 13.9013ZM15.065 13.9013C14.0196 13.9013 13.1652 12.952 13.1652 11.7893C13.1652 10.6267 13.9983 9.67731 15.065 9.67731C16.121 9.67731 16.985 10.6267 16.9636 11.7893C16.9636 12.952 16.1317 13.9013 15.065 13.9013Z"
              stroke="none"
              strokeLinejoin="round"
            />
          </svg>
        ),
        color: "discord",
      },
      {
        text: "GitHub Discussions",
        href: "https://github.com/dexie/Dexie.js/discussions",
        external: true,
        variant: "text",
      },
    ],
  },
  {
    title: "Technical Support",
    description:
      "Get help with technical issues, implementation questions, or request private support",
    icon: (
      <SupportIcon sx={{ fontSize: 40, color: "rgba(255, 255, 255, 0.3)" }} />
    ),
    actions: [
      {
        text: "Ask on StackOverflow",
        href: "http://stackoverflow.com/questions/ask?tags=dexie",
        external: true,
        variant: "text",
      },
      {
        text: "Private Support (€150/h)",
        href: "mailto:privsupport@dexie.org",
        variant: "text",
      },
    ],
  },

  {
    title: "Bug Reports & Issues",
    description:
      "Found a bug or have a feature request? File an issue on GitHub",
    icon: (
      <BugReportIcon sx={{ fontSize: 40, color: "rgba(255, 255, 255, 0.3)" }} />
    ),
    actions: [
      {
        text: "File Dexie Issue",
        href: "https://github.com/dexie/Dexie.js/issues/new",
        external: true,
        variant: "text",
      },
      {
        text: "File Cloud Issue",
        href: "https://github.com/dexie/Dexie.js/issues/new?labels=cloud",
        external: true,
        variant: "text",
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
            <Button
              variant="contained"
              size="large"
              href="https://discord.com/channels/1328303736363421747/1339957860657926204"
              target="_blank"
              rel="noopener noreferrer"
              startIcon={
                <svg
                  width="26 px"
                  height="26px"
                  viewBox="0 0 24 24"
                  fill="#ffffff"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M18.8943 4.34399C17.5183 3.71467 16.057 3.256 14.5317 3C14.3396 3.33067 14.1263 3.77866 13.977 4.13067C12.3546 3.89599 10.7439 3.89599 9.14391 4.13067C8.99457 3.77866 8.77056 3.33067 8.58922 3C7.05325 3.256 5.59191 3.71467 4.22552 4.34399C1.46286 8.41865 0.716188 12.3973 1.08952 16.3226C2.92418 17.6559 4.69486 18.4666 6.4346 19C6.86126 18.424 7.24527 17.8053 7.57594 17.1546C6.9466 16.92 6.34927 16.632 5.77327 16.2906C5.9226 16.184 6.07194 16.0667 6.21061 15.9493C9.68793 17.5387 13.4543 17.5387 16.889 15.9493C17.0383 16.0667 17.177 16.184 17.3263 16.2906C16.7503 16.632 16.153 16.92 15.5236 17.1546C15.8543 17.8053 16.2383 18.424 16.665 19C18.4036 18.4666 20.185 17.6559 22.01 16.3226C22.4687 11.7787 21.2836 7.83202 18.8943 4.34399ZM8.05593 13.9013C7.01058 13.9013 6.15725 12.952 6.15725 11.7893C6.15725 10.6267 6.98925 9.67731 8.05593 9.67731C9.11191 9.67731 9.97588 10.6267 9.95454 11.7893C9.95454 12.952 9.11191 13.9013 8.05593 13.9013ZM15.065 13.9013C14.0196 13.9013 13.1652 12.952 13.1652 11.7893C13.1652 10.6267 13.9983 9.67731 15.065 9.67731C16.121 9.67731 16.985 10.6267 16.9636 11.7893C16.9636 12.952 16.1317 13.9013 15.065 13.9013Z"
                    stroke="none"
                    strokeLinejoin="round"
                  />
                </svg>
              }
              sx={{
                backgroundColor: "discord.main",
                color: "white",
                "&:hover": {
                  backgroundColor: "discord.dark",
                },
              }}
            >
              Join our Discord community
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
                    textAlign="left"
                    sx={{ mb: 2 }}
                  >
                    {method.title}
                  </Typography>
                  <Typography
                    variant="body1"
                    color="text.secondary"
                    textAlign="left"
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
                        variant={action.variant || "outlined"}
                        href={action.href}
                        color={
                          (action.color as
                            | "primary"
                            | "secondary"
                            | "success"
                            | "error"
                            | "info"
                            | "warning"
                            | "discord") || "secondary"
                        }
                        target={action.external ? "_blank" : undefined}
                        rel={
                          action.external ? "noopener noreferrer" : undefined
                        }
                        startIcon={action.icon}
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
                backgroundColor: "rgba(255,255,255,0.01)",
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
                <LocationOnIcon
                  sx={{ mr: 1, color: "text.secondary", fontSize: 20 }}
                />
                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{ mb: 0 }}
                >
                  {companyInfo.location}
                </Typography>
              </Box>
              <Typography variant="body1" sx={{ mb: 3 }}>
                {companyInfo.description}
              </Typography>
              <Button
                variant="contained"
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
                backgroundColor: "rgba(255,255,255,0.01)",
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
                    variant="contained"
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
    </Box>
  )
}
