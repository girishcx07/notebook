import { Providers } from "@/src/components/providers";
import { Recursive } from "next/font/google";

import type { Metadata, Viewport } from "next";

import SessionProvider from "@/src/components/session-provider";
import { auth } from "@/src/lib/auth";
import { seo } from "@/src/lib/seo";
import { Toaster } from "@notebook/ui/components/sonner";

import "@notebook/ui/globals.css";
import { headers } from "next/headers";

const recursive = Recursive({ subsets: ["latin"] });

export const metadata: Metadata = {
  ...seo({
    title: "Notebook - Open-Source App for Students",
    description:
      "An open-source app for students to create, organize, and publish notes.",
  }),
};

export const viewport: Viewport = {
  maximumScale: 1,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={recursive.className}>
        <SessionProvider initialSession={session}>
          <Providers>{children}</Providers>
          <Toaster />
        </SessionProvider>
      </body>
    </html>
  );
}
