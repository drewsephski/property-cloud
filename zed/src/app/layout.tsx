import type { Metadata, Viewport } from "next"; // Import Viewport type
import { Lato, Roboto_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Toaster } from "@/components/ui/sonner";
import { FloatingDockDemo } from "@/components/floating-dock-demo";
import "./globals.css";

const lato = Lato({
  weight: ["400", "700", "900"],
  variable: "--font-lato",
  subsets: ["latin"],
  display: "swap",
});

const robotoMono = Roboto_Mono({
  weight: ["400", "500", "700"],
  variable: "--font-roboto-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "AIWriter - Next-Gen AI Writing Assistant",
  description:
    "AIWriter is a next-generation AI-powered writing assistant that helps you create better content faster.",
  keywords:
    "AI writer, content creation, writing assistant, AI-powered writing, blog content",
  // Removed viewport and themeColor from here
};

// Added new viewport export
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#121212" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${lato.variable} ${robotoMono.variable} antialiased font-sans text-base`}
        suppressHydrationWarning
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1 relative overflow-x-hidden">
              {children}
            </main>
            <Footer />
          </div>
          <Toaster />
          <FloatingDockDemo />
        </ThemeProvider>
      </body>
    </html>
  );
}
