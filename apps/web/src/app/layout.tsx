import { Recursive } from "next/font/google";
import { Providers } from "@/src/components/providers";

import type { Metadata, Viewport } from "next";

import "@notebook/ui/globals.css";
import { Toaster } from "@notebook/ui/components/sonner";

const recursive = Recursive({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Notebook - Open-Source App for Students",
  description:
    "An open-source app for students to create, organize, and publish notes.",
};

export const viewport: Viewport = {
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={recursive.className}>
        <Providers>{children}</Providers>
        <Toaster />
      </body>
    </html>
  );
}
