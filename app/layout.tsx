import type { Metadata } from "next";
import { generateMetadata as genMetadata } from "@/lib/metadata";
import { generateOrganizationSchema } from "@/lib/structuredData";
import HtmlRoot from "@/components/layout/HtmlRoot";
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
    </HtmlRoot>
  );
}
