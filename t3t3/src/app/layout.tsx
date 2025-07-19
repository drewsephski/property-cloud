import "@/styles/globals.css";

import { type Metadata } from "next";
import { Geist } from "next/font/google";

import { TRPCReactProvider } from "@/trpc/react";

export const metadata: Metadata = {
  // Global metadata for the SaaS application
  title: {
    default: "SaaSApp – Accelerate your workflow",
    template: "%s | SaaSApp",
  },
  description:
    "SaaSApp is the all-in-one platform to streamline your operations, boost productivity and scale your business.",
  // Mobile-friendly viewport
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={geist.variable}>
      {/* 
        The body is styled to support both light & dark themes. 
        Tailwind CSS variables (set in globals.css) will automatically switch
        colours when the `dark` class is present on <html>.
      */}
      <body className="min-h-screen bg-background text-foreground antialiased">
        <TRPCReactProvider>{children}</TRPCReactProvider>
      </body>
    </html>
  );
}
