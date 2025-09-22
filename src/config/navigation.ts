// Navigation menu configuration
export interface SubMenuItem {
  text?: string
  href?: string
  external?: boolean
  target?: string
  divider?: boolean
}

export interface MenuItem {
  id: number
  href: string
  text: string
  external: boolean
  children?: SubMenuItem[]
}

export const menuItems: MenuItem[] = [
  { id: 1, href: "/", text: "Home", external: false },
  {
    id: 2,
    href: "/product",
    text: "Product",
    external: false,
  },
  { id: 4, href: "/pricing", text: "Pricing", external: false },
  { id: 5, href: "/docs", text: "Docs", external: false },
  {
    id: 6,
    href: "/support",
    text: "Support",
    external: false,
    children: [
      {
        text: "Dexie Questions on StackOverflow",
        href: "http://stackoverflow.com/questions/tagged/dexie",
        external: true,
      },
      {
        text: "Q & A on Github",
        href: "https://github.com/dexie/Dexie.js/issues?q=label%3AQ%26A%20",
        external: true,
      },
      { divider: true },
      {
        text: "Ask Dexie question on Stackoverflow (best chance for a reply)",
        href: "http://stackoverflow.com/questions/ask?tags=dexie",
        external: true,
      },
      {
        text: "Ask Dexie Cloud question on GitHub",
        href: "https://github.com/dexie/Dexie.js/issues/new?labels=cloud,question",
        external: true,
      },
      {
        text: "File a GitHub issue on Dexie.js",
        href: "https://github.com/dexie/Dexie.js/issues/new",
        external: true,
      },
      { divider: true },
      {
        text: "Private support",
        href: "/contact#private-support-issues",
        external: false,
      },
      {
        text: "Report issue with Dexie Cloud service",
        href: "https://betteruptime.com/report/ArgfwoqUmwYQCdwYWHRUDkdc",
        external: true,
      },
      {
        text: "Dexie Cloud Status",
        href: "https://www.dexie-cloud-status.com",
        external: true,
        target: "dexie-cloud-status",
      },
      { divider: true },
      {
        text: "Contact",
        href: "/contact",
        external: false,
      },
    ],
  },
  { id: 7, href: "https://medium.com/dexie-js", text: "Blog", external: true },
]
