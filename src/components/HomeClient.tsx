'use client';

import Header from '@/components/Header';
import TopBanner from '@/components/TopBanner'
import Hero from '@/components/Hero';
import Testimonials from '@/components/Testimonials';
import Footer from '@/components/Footer';
import Services from '@/components/Services'
import SmsVendor from '@/components/SmsVendor'
import OurWorks from '@/components/OurWorks'
// import ScrollToTopButton from '@/components/ui/ScrollToTopButton'
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
        <SmsVendor/>
        <Products/>
        {/* <ScrollToTopButton/> */}
        <CTA/>
        <TechStack/>
        <OurWorks/>
        <Testimonials />
        <AboutUs/>
        <ContactUs/>
      </main>
      <Footer />
    </div>
  );
}