"use client";

import Link from "next/link";
import { ComponentProps } from "react";

interface PersistentSearchLinkProps extends Omit<ComponentProps<typeof Link>, 'href'> {
  href: string | { pathname: string; [key: string]: unknown };
  search: string | null;
}

export default function PersistentSearchLink({ href, search, ...props }: PersistentSearchLinkProps) {

  // Build a new URL that preserves the existing search param
  let targetHref = href;
  if (search) {
    const url = new URL(
      typeof href === "string" ? href : href.pathname,
      "https://dummy"
    );
    url.searchParams.set("search", search);
    targetHref = url.pathname + "?" + url.searchParams.toString() + url.hash;
  }

  return <Link href={targetHref} {...props} />;
}
