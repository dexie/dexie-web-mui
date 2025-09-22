"use client"
import { useState } from "react"
import { Box, TextField, Button, Paper, Alert, MenuItem } from "@mui/material"
import SendIcon from "@mui/icons-material/Send"

interface ContactFormData {
  name: string
  email: string
  company: string
  subject: string
  message: string
}

const subjects = [
  "General Inquiry",
  "Technical Support",
  "Sales & Partnerships",
  "Dexie Cloud Questions",
  "Bug Report",
  "Feature Request",
  "Other",
]

export default function ContactForm() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    company: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(
    null
  )

  const handleChange =
    (field: keyof ContactFormData) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({
        ...prev,
        [field]: event.target.value,
      }))
    }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      // Here you would normally send the form data to your backend
      // For now, we'll simulate a successful submission
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Reset form on success
      setFormData({
        name: "",
        email: "",
        company: "",
        subject: "",
        message: "",
      })
      setSubmitStatus("success")
    } catch {
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  const isFormValid =
    formData.name && formData.email && formData.subject && formData.message

  return (
    <Paper
      sx={{ p: 4, maxWidth: 600, mx: "auto", backgroundColor: "transparent" }}
    >
      <form onSubmit={handleSubmit}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          <Box
            sx={{
              display: "flex",
              gap: 2,
              flexDirection: { xs: "column", sm: "row" },
            }}
          >
            <TextField
              fullWidth
              label="Full Name"
              required
              value={formData.name}
              onChange={handleChange("name")}
              variant="outlined"
            />
            <TextField
              fullWidth
              label="Email Address"
              type="email"
              required
              value={formData.email}
              onChange={handleChange("email")}
              variant="outlined"
            />
          </Box>
          <TextField
            fullWidth
            label="Company (Optional)"
            value={formData.company}
            onChange={handleChange("company")}
            variant="outlined"
          />
          <TextField
            fullWidth
            select
            label="Subject"
            required
            value={formData.subject}
            onChange={handleChange("subject")}
            variant="outlined"
          >
            {subjects.map((subject) => (
              <MenuItem key={subject} value={subject}>
                {subject}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            fullWidth
            label="Message"
            multiline
            rows={6}
            required
            value={formData.message}
            onChange={handleChange("message")}
            variant="outlined"
            placeholder="Please describe your question or inquiry in detail..."
          />
          <Box sx={{ textAlign: "center" }}>
            <Button
              type="submit"
              variant="contained"
              size="large"
              disabled={!isFormValid || isSubmitting}
              endIcon={<SendIcon />}
              sx={{ minWidth: 150 }}
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </Button>
          </Box>
        </Box>
      </form>

      {submitStatus === "success" && (
        <Alert severity="success" sx={{ mt: 3 }}>
          Thank you for your message! We&apos;ll get back to you as soon as
          possible.
        </Alert>
      )}

      {submitStatus === "error" && (
        <Alert severity="error" sx={{ mt: 3 }}>
          There was an error sending your message. Please try again or contact
          us directly at business@dexie.org.
        </Alert>
      )}
    </Paper>
  )
}
