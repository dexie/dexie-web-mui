import Image from "next/image"
import { Button, Typography, Container, Box } from "@mui/material"
import styles from "./page.module.css"

export default function Home() {
  return (
    <>
      <div className={styles.page}>
        <main className={styles.main}>
          <Image
            className={styles.logo}
            src="/next.svg"
            alt="Next.js logo"
            width={180}
            height={38}
            priority
          />
          <ol>
            <li>
              Get started by editing <code>src/app/page.tsx</code>.
            </li>
            <li>Save and see your changes instantly.</li>
          </ol>

          {/* MUI Test Components */}
          <Container sx={{ my: 4, textAlign: "center" }}>
            <Typography variant="h4" component="h2" gutterBottom>
              MUI is working! 🎉
            </Typography>
            <Button variant="contained" color="primary" size="large">
              Material-UI Button
            </Button>
          </Container>

          <div className={styles.ctas}>
            <a
              className={styles.primary}
              href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                className={styles.logo}
                src="/vercel.svg"
                alt="Vercel logomark"
                width={20}
                height={20}
              />
              Deploy now
            </a>
            <a
              href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.secondary}
            >
              Read our docs
            </a>
          </div>
        </main>
        <footer className={styles.footer}>
          <a
            href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              aria-hidden
              src="/file.svg"
              alt="File icon"
              width={16}
              height={16}
            />
            Learn
          </a>
          <a
            href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              aria-hidden
              src="/window.svg"
              alt="Window icon"
              width={16}
              height={16}
            />
            Examples
          </a>
          <a
            href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              aria-hidden
              src="/globe.svg"
              alt="Globe icon"
              width={16}
              height={16}
            />
            Go to nextjs.org →
          </a>
        </footer>
      </div>

      {/* Add more content to test scrolling */}
      <Box
        sx={{
          minHeight: "200vh",
          background: "linear-gradient(45deg, #f3f4f6 0%, #e5e7eb 100%)",
          p: 4,
        }}
      >
        <Container>
          <Typography variant="h3" gutterBottom align="center" sx={{ pt: 8 }}>
            Scroll to see navbar effect
          </Typography>
          <Typography variant="body1" align="center" sx={{ mb: 4 }}>
            The navbar will get a background when you scroll down
          </Typography>

          {/* Add some demo content sections */}
          {[1, 2, 3, 4, 5].map((section) => (
            <Box
              key={section}
              sx={{
                bgcolor: "white",
                p: 4,
                mb: 4,
                borderRadius: 2,
                boxShadow: 1,
              }}
            >
              <Typography variant="h4" gutterBottom>
                Section {section}
              </Typography>
              <Typography variant="body1" paragraph>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </Typography>
              <Typography variant="body1">
                Duis aute irure dolor in reprehenderit in voluptate velit esse
                cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                cupidatat non proident, sunt in culpa qui officia deserunt
                mollit anim id est laborum.
              </Typography>
            </Box>
          ))}
        </Container>
      </Box>
    </>
  )
}
