'use client';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Link from 'next/link';
import { getDashainOffer, OfferRibbon, OfferPriceStrip, DashainOfferSpotlight } from '@/components/Dashain';

interface ProductCardProps {
  name: string;
  tagline: string;
  category: string;
  desc: string;
  highlights: string[];
  logo: string;
  pending?: string;
  delay?: number;
}

const ProductCard = ({ name, tagline, category, desc, highlights, logo, pending, delay = 0 }: ProductCardProps) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const offer = getDashainOffer(name);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className="flex w-full sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1.25rem)]"
    >
      <Link
        href={offer ? `/products#${offer.id}` : '/products'}
        className="group relative flex w-full cursor-pointer flex-col overflow-hidden rounded-3xl border border-gray-200/80 bg-white text-left transition-all duration-300 hover:-translate-y-1.5 hover:border-[#9333EA]/30 hover:shadow-[0_20px_50px_rgba(147,51,234,0.12)]"
      >
        {/* Logo / Header Image */}
        <div className="relative h-62 w-full shrink-0 overflow-hidden bg-slate-950">
          <img
            src={logo}
            alt={`${name} Logo`}
            className="absolute inset-0 h-full w-full object-contain object-center p-1 transition-transform duration-500 group-hover:scale-105"
            onError={(e) => {
              (e.target as HTMLImageElement).onerror = null;
              (e.target as HTMLImageElement).style.opacity = '0.15';
            }}
          />

          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

          {/* Category badge */}
          <div className="absolute top-0.5 left-1.3 z-10">
            <span className="rounded-full border border-white/20 bg-black px-3 py-1 text-[10px] font-black uppercase tracking-widest text-white shadow-sm backdrop-blur-md">
              {category}
            </span>
          </div>

          {/* Coming Soon badge */}
          {pending && (
            <div className="absolute right-4 top-4 z-20">
              <span className="flex items-center gap-1.5 rounded-full border border-purple-400/30 bg-[#9333EA] px-3 py-1 text-[10px] font-black uppercase tracking-widest text-white shadow-lg shadow-[#9333EA]/40">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white" />
                {pending}
              </span>
            </div>
          )}

                    {/* Dashain offer ribbon */}
          {offer && (
            <div className="absolute right-3 top-10 z-20 sm:top-3">
              <OfferRibbon offer={offer} />
            </div>
          )}

          {/* Title & tagline */}
          <div className="absolute bottom-4 left-4 right-4 z-10">
            <h3 className="mb-1 text-xl font-black leading-tight text-white transition-colors group-hover:text-purple-200">{name}</h3>
            <p className="line-clamp-1 text-xs font-bold text-white/80">{tagline}</p>
          </div>
        </div>

        {/* Body */}
        <div className="flex flex-1 flex-col bg-white p-5 lg:p-6">
          <p className="mb-4 line-clamp-3 text-sm font-medium leading-relaxed text-gray-600">{desc}</p>

          
          {offer && <OfferPriceStrip offer={offer} />}

          <div className="mb-5 flex flex-wrap gap-1.5">
            {highlights.slice(0, 3).map((h) => (
              <span key={h} className="rounded-lg border border-[#9333EA]/10 bg-[#9333EA]/5 px-2.5 py-1 text-[10px] font-bold text-[#9333EA]">
                {h}
              </span>
            ))}
          </div>

          
        </div>
      </Link>
    </motion.div>
  );
};

const Products = () => {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: '-80px' });

  const products: Omit<ProductCardProps, 'delay'>[] = [
    {
      name: 'Atithi RMS',
      tagline: 'Restaurant Management, Simplified',
      category: 'Hospitality Software',
      desc: 'A complete restaurant management system built to handle orders, tables, kitchen workflow, and billing — all from one clean dashboard.',
      highlights: ['Order & KOT Management', 'Table Management', 'Menu Management'],
      logo: '/products/athiti.png',
    },
    {
      name: 'Artha POS',
      tagline: 'Point of Sale, Reimagined',
      category: 'Retail Software',
      desc: 'An offline-capable point-of-sale system for retail stores, grocery shops, supermarkets, and beverage outlets — built for fast billing, accurate inventory, and clear business visibility.',
      highlights: ['Offline Billing', 'Barcode Scanning', 'Inventory'],
      logo: '/products/artha pos.png',
    },
    {
      name: 'Cornor Tech AI',
      tagline: 'AI-based solutions & automation products and services.',
      category: 'Artificial Intelligence',
      desc: 'Cutting-edge AI-based solutions, intelligent automation products, and custom software services built to streamline workflows, enhance decision-making, and scale business operations.',
      highlights: ['AI Automation', 'Custom Solutions', 'Workflow Pipelines'],
      logo: '/products/conor ai.png',
    },
    {
      name: 'Cornor SMS',
      tagline: 'SMS platform for bulk messaging, OTP and API integrations.',
      category: 'Communication & Messaging',
      desc: 'A reliable, scalable SMS platform built for businesses — offering high-volume bulk promotions, secure transactional OTPs, and robust RESTful API integrations.',
      highlights: ['Bulk SMS', 'Transactional OTP', 'API Integration'],
      logo: '/products/cornor ss.png',
    },
    {
      name: 'Arogya CMS',
      tagline: 'Clinic Management System.',
      category: 'Healthcare',
      desc: 'An offline-capable clinic management system for medical practices, healthcare centers, and outpatient clinics — built for fast patient billing, accurate medical inventory, and clear practice visibility.',
      highlights: ['Offline Billing', 'Barcode Scanning', 'Medical Inventory'],
      logo: '/products/aarogya.png',
      pending: 'Coming Soon',
    },
  ];

  return (
    <section
      id="products"
      ref={sectionRef}
      className="relative overflow-hidden bg-[#faf8ff] py-24 font-sans lg:py-36"
    >
      {/* Dot grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{ backgroundImage: 'radial-gradient(circle, #c084fc 1px, transparent 1px)', backgroundSize: '32px 32px' }}
        aria-hidden="true"
      />

      {/* Ambient blobs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute -left-40 -top-40 h-150 w-150 rounded-full" style={{ background: 'radial-gradient(circle, rgba(168,85,247,0.10) 0%, transparent 70%)' }} />
        <div className="absolute -bottom-40 -right-20 h-125 w-125 rounded-full" style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 70%)' }} />
      </div>

      {/* Ghost text */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 1.4, delay: 0.15 }}
        className="pointer-events-none absolute left-1/2 top-6 -translate-x-1/2 select-none whitespace-nowrap text-[18vw] font-black uppercase leading-none tracking-tighter text-[#9333EA]/5 lg:top-10"
        aria-hidden="true"
      >
        Products
      </motion.p>

      <div className="container relative z-10 mx-auto px-4 lg:px-8">
        {/* Headline */}
        <div className="mb-14 text-center lg:mb-24 lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55 }}
            className="mb-5 flex items-center justify-center gap-3 lg:justify-start"
          >
            <div className="h-px w-8 rounded-full bg-[#9333EA]" />
            <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#9333EA]">Our Products</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 22 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.08 }}
            className="text-4xl font-black leading-[0.95] tracking-tight lg:text-6xl xl:text-7xl"
          >
            <span className="text-[#1e003a]">Digital</span>
            <br />
            <span className="bg-linear-to-r from-[#9333EA] via-[#6366f1] to-[#a855f7] bg-clip-text text-transparent">Solutions</span>
            <br />
            <span className="text-[#1e003a]/25">For the Future.</span>
          </motion.h2>
        </div>

        {/* Dashain festive offer */}
        <DashainOfferSpotlight className="mx-auto mb-14 max-w-7xl lg:mb-20" />

        {/* Cards (same layout as the products page) */}
        <div className="mx-auto flex max-w-7xl flex-wrap justify-center gap-6 lg:gap-7">
          {products.map((product, idx) => (
            <ProductCard key={product.name} {...product} delay={0.1 + idx * 0.1} />
          ))}
        </div>

        {/* View all */}
        <div className="mt-14 text-center">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 rounded-xl bg-linear-to-br from-[#6a5acd] to-[#9370db] px-7 py-3.5 text-sm font-black text-white shadow-lg shadow-[#9333EA]/30 transition-all hover:brightness-110"
          >
            View All Products
            <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Products;