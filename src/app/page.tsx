import HeroWidget from "@/components/content/hero/HeroWidget"
import HeroContent from "@/components/content/hero/HeroContent"
import Brands from "@/components/content/hero/Brands"
import TypeWriter from "@/components/content/shared/TypeWriter"
import PlayArrowIcon from "@mui/icons-material/PlayArrow"

export default function Home() {
  return (
    <>
      <HeroWidget
        preHeading={"Zero-config & no backend skills needed"}
        heading={
          <>
            Build fast, scale big <br />
            Dexie handles
            <TypeWriter
              colorClass=""
              strings={[
                "Sync",
                "Login",
                "Real-time",
                "Storage",
                "Offline Support",
                "Collaboration",
                "Everything",
              ]}
            />
          </>
        }
        text={
          "IndexedDB made simple. Add cloud sync for auth, storage, with real-time updates. One unified data layer across all platforms — no backend required. Truly offline-first."
        }
        background={"/assets/images/dexie-bg.jpg"}
        contentRight={<HeroContent />}
        contentRightWidthPercentage={45}
        contentBottom={
          <Brands
            sx={{
              padding: "0px !important",
            }}
          />
        }
        buttons={[
          {
            text: "Get Started",
            link: {
              url: "/get-started",
              querystring: "",
              title: "Get Started",
              target: "_self",
            },
            color: "primary",
            size: "large",
            variant: "contained",
          },
          {
            text: "How it works?",
            icon: <PlayArrowIcon />,
            link: {
              url: "/how-it-works",
              querystring: "",
              title: "How it works",
              target: "_self",
            },
            color: "primary",
            size: "large",
            variant: "text",
          },
        ]}
        settings={{
          height: "90vh",
          textColor: "#FFFFFF",
          overlayStrength: "80%",
          textWidth: "60%",
          containerWidth: "big",
        }}
      />
    </>
  )
}
