import type { Metadata, Viewport } from "next";
import "./globals.css";
import { MotionProvider } from "@/components/motion/motion-provider";

export const metadata: Metadata = {
  title: {
    default: "Devasiri Charitable Trust",
    template: "%s | Devasiri"
  },
  description:
    "Devasiri supports verified students through education assistance, hostel support, sponsorships, volunteering, and transparent donation impact.",
  openGraph: {
    title: "Devasiri Charitable Trust",
    description:
      "Support verified education assistance, student sponsorships, hostel programs, and transparent charitable impact.",
    type: "website",
    siteName: "Devasiri"
  }
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ffffff"
};

interface RootLayoutProps {
  readonly children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body><MotionProvider>{children}</MotionProvider></body>
    </html>
  );
}