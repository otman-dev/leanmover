import type { Metadata } from "next";
import { generateMetadata as genMetadata } from "@/lib/metadata";
import { generateOrganizationSchema } from "@/lib/structuredData";
import HtmlRoot from "@/components/layout/HtmlRoot";
import ChatWidget from "@/components/chat/ChatWidget";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

export const metadata: Metadata = {
  ...genMetadata({}),
  icons: {
    icon: '/images/leanmover-logoX.png',
    shortcut: '/images/leanmover-logoX.png',
    apple: '/images/leanmover-logoX.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationSchema = generateOrganizationSchema();

  return (
    <HtmlRoot organizationSchema={organizationSchema}>
      {children}
      <ChatWidget />
      <Analytics />
      <SpeedInsights />
    </HtmlRoot>
  );
}
