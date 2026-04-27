'use client';

import Header from '@/components/Header';
import TopBanner from '@/components/TopBanner'
import Hero from '@/components/Hero';
import Testimonials from '@/components/Testimonials';
import Footer from '@/components/Footer';
import Services from '@/components/Services'
import OurWorks from '@/components/OurWorks'
import ScrollToTopButton from '@/components/ui/ScrollToTopButton'
import CTA from '@/components/ui/CTA'
import TechStack from '@/components/TechStack'
import ContactUs from '@/components/ContactUs'
import AboutUs from '@/components/AboutUs'
import Products from '@/components/Products'
import { useScrollAnimation, useSmoothScroll, useParallax } from '@/hooks/useAnimations';
import { useState } from 'react';

export default function Home() {
  useScrollAnimation();
  useSmoothScroll();
  useParallax();

  const [bannerVisible, setBannerVisible] = useState<boolean>(true);

  return (
    <div className="min-h-screen bg-white">
      <TopBanner visible={bannerVisible} setVisible={setBannerVisible}/>
      <Header bannerVisible={bannerVisible} />
      <main>
        <Hero bannerVisible={bannerVisible}/>
        <Services/>
        <Products/>
        {/* <ScrollToTopButton/> */}
        <CTA/>
        <TechStack/>
        <OurWorks/>
        <Testimonials />
        <AboutUs/>
        <ContactUs/>
        <script type="module" src="https://widget.yeticodecrew.com/index.js?clientId=demo-client-abc-123&theme=light" async></script>
      </main>
      <Footer />
    </div>
  );
}