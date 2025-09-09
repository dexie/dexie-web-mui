// Navigation menu configuration
export const menuItems = [
  { id: 1, href: "/", text: "Home" },
  { id: 2, href: "/product", text: "Product" },
  { id: 3, href: "/developers", text: "Developers" },
  { id: 4, href: "/pricing", text: "Pricing" },
  { id: 5, href: "/docs", text: "Docs" },
  { id: 6, href: "/support", text: "Support" },
  { id: 7, href: "https://medium.com/dexie-js", text: "Blog" },
]

export type MenuItem = (typeof menuItems)[0]
