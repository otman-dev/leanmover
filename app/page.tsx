import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Metrics from '@/components/Metrics';
import Services from '@/components/Services';
import VideoSection from '@/components/VideoSection';
import Certifications from '@/components/Certifications';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <Metrics />
      <Services />
      <VideoSection />
      <Certifications />
      <Footer />
    </main>
  );
}
