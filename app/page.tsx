import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import ProductsShowcase from '@/components/ProductsShowcase';
import ServicesSection from '@/components/ServicesSection';
import WhyChooseUs from '@/components/WhyChooseUs';
import Testimonials from '@/components/Testimonials';
import Footer from '@/components/Footer';
import SmoothScroll from '@/components/SmoothScroll';
import AnimatedCursor from '@/components/AnimatedCursor';
import ParticleSystem from '@/components/ParticleSystem';

export default function Home() {
  return (
    <>
      <SmoothScroll />
      <AnimatedCursor />
      <ParticleSystem particleCount={60} />
      <main className="relative">
        <Navbar />
        <Hero />
        <ProductsShowcase />
        <ServicesSection />
        <WhyChooseUs />
        <Testimonials />
        <Footer />
      </main>
    </>
  );
}
