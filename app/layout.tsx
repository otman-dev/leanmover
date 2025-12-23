import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Leanmover - Solutions Industrielles 4.0 | Transformation Digitale",
  description: "Leanmover vous accompagne dans la transformation digitale de vos sites industriels en intégrant les dernières technologies de l'Industrie 4.0. Solutions sur-mesure pour l'intralogistique et l'optimisation industrielle au Maroc.",
  keywords: ["Industrie 4.0", "Transformation digitale", "Intralogistique", "Solutions industrielles", "Maroc", "Leanmover"],
  openGraph: {
    title: "Leanmover - Solutions Industrielles 4.0",
    description: "Votre partenaire vers l'Industrie 4.0 au Maroc",
    url: "https://leanmover.ma",
    siteName: "Leanmover",
    locale: "fr_FR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="scroll-smooth">
      <body className={`${inter.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}
