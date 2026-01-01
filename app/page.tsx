import { Metadata } from 'next';
import { generateMetadata } from '@/lib/metadata';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/home/Hero';
import Metrics from '@/components/home/Metrics';
import ServicesPreview from '@/components/home/ServicesPreview';
import VideoSection from '@/components/home/VideoSection';
import CertificationsPreview from '@/components/home/CertificationsPreview';

export const metadata: Metadata = generateMetadata({
  title: 'Leanmover - Expert Industrie 4.0 & Transformation Digitale au Maroc',
  description: 'Accélérez votre transformation digitale industrielle avec Leanmover. Expert en automatisation, IoT industriel, logistique intelligente et solutions Industrie 4.0. +200 projets réalisés, 15 ans d\'expertise au service des entreprises marocaines.',
  keywords: [
    'expert industrie 4.0 Maroc',
    'transformation digitale industrielle',
    'automatisation Maroc',
    'logistique intelligente',
    'consulting industriel',
    'IoT industriel Maroc',
    'solutions manufacturières',
    'optimisation industrielle'
  ],
  path: '/'
});

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <Metrics />
      <ServicesPreview />
      <VideoSection />
      <CertificationsPreview />
      <Footer />
    </main>
  );
}
