import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { generateMetadata as genMetadata } from "@/lib/metadata";
import { generateOrganizationSchema } from "@/lib/structuredData";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

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
    <html lang="fr" className="scroll-smooth">
      <body className={`${inter.className} antialiased`}>
        {children}
        
        {/* Global JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </body>
    </html>
  );
}
