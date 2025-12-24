import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/home/Hero';
import Metrics from '@/components/home/Metrics';
import ServicesPreview from '@/components/home/ServicesPreview';
import VideoSection from '@/components/home/VideoSection';
import CertificationsPreview from '@/components/home/CertificationsPreview';

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
