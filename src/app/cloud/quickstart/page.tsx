import { redirect } from "next/navigation"

export default function QuickstartRedirect() {
  // Permanent redirect (308) to the new location
  redirect("/cloud/docs/quickstart")
}