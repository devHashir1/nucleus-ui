import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { SiteHeader } from "@/components/site-header";

const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "nucleusUI — delightful components on top of shadcn/ui",
    template: "%s · nucleusUI",
  },
  description:
    "An open-source collection of polished, playful UI components built on top of shadcn/ui. Copy, paste, ship.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider>
          <SiteHeader />
          <main className="flex flex-1 flex-col">{children}</main>
          <footer className="border-t border-border/60 py-8">
            <div className="mx-auto max-w-6xl px-4 text-center text-sm text-muted-foreground sm:px-6">
              Built with shadcn/ui · nucleusUI is open source · MIT
            </div>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
