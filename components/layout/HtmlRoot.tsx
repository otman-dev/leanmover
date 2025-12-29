'use client';

import { Inter } from "next/font/google";
import { useEffect, useState } from "react";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

interface HtmlRootProps {
  children: React.ReactNode;
  organizationSchema: any;
}

export default function HtmlRoot({ children, organizationSchema }: HtmlRootProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <html
      lang="fr"
      className="scroll-smooth"
      suppressHydrationWarning
    >
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