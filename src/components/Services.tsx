'use client';
import { useState, useRef, useEffect, useLayoutEffect, useCallback } from 'react';
import Image from 'next/image';

interface Service {
  id: string;
  title: string;
  description: string;
  features: string[];
  icon: string;
  badge: string;
  popular?: boolean;
  gradient: string;
  image?: string;
}

const services: Service[] = [
  {
    id: '1',
    title: 'Web Development',
    description: 'Build modern, responsive, and scalable web applications using cutting-edge technologies and best practices.',
    features: ['Custom Website Development', 'Progressive Web Apps (PWA)', 'API Integration & Development'],
    image: '/services/web_dev.jpeg',
    icon: '💻',
    badge: 'Development',
    gradient: 'bg-linear-to-br from-[#9333EA]/20 to-[#7c3aed]/20',
    popular: true,
  },
  {
    id: '2',
    title: 'Digital Marketing',
    description: 'Grow your business with data-driven digital marketing strategies that deliver measurable results.',
    features: ['Search Engine Optimization (SEO)', 'Social Media Marketing', 'Analytics & Reporting'],
    image: '/services/digital.png',
    icon: '📱',
    badge: 'Marketing',
    gradient: 'bg-linear-to-br from-[#a855f7]/20 to-[#9333EA]/20',
    popular: true,
  },
  {
    id: '3',
    title: 'Graphic Design',
    description: 'Create stunning visual designs that communicate your brand message and captivate your audience.',
    features: ['Brand Identity Design', 'Logo & Visual Assets', 'Social Media Graphics'],
    image: '/services/graphic.png',
    icon: '🎨',
    badge: 'Design',
    gradient: 'bg-linear-to-br from-[#9333EA]/15 to-[#a855f7]/25',
  },
  {
    id: '4',
    title: 'Mobile App Development',
    description: 'Develop powerful mobile applications for iOS and Android that engage users and drive growth.',
    features: ['Native iOS & Android Apps', 'Cross-Platform Development', 'App Store Optimization'],
    image: '/services/mobile_dev.png',
    icon: '📲',
    badge: 'Mobile',
    gradient: 'bg-linear-to-br from-[#7c3aed]/20 to-[#9333EA]/20',
  },
  {
    id: '5',
    title: 'UI/UX Design',
    description: 'Design intuitive and beautiful user experiences that keep your customers engaged and satisfied.',
    features: ['User Research & Testing', 'Wireframing & Prototyping', 'Design System Creation'],
    image: '/services/ui.png',
    icon: '✨',
    badge: 'Design',
    gradient: 'bg-linear-to-br from-[#9333EA]/25 to-[#7e22ce]/15',
  },
  {
    id: '6',
    title: 'Cloud Solutions',
    description: 'Leverage cloud technology to scale your infrastructure and optimize your business operations.',
    features: ['AWS / Azure / GCP Setup', 'DevOps & CI/CD', 'Cost Optimization'],
    image: '/services/cloud.png',
    icon: '☁️',
    badge: 'Cloud',
    gradient: 'bg-linear-to-br from-[#7e22ce]/20 to-[#9333EA]/20',
  },
  {
    id: '7',
    title: 'E-commerce Solutions',
    description: 'Build powerful online stores that convert visitors into customers and drive revenue growth.',
    features: ['Custom E-commerce Platforms', 'Payment Gateway Integration', 'Order Management Systems'],
    image: '/services/e_com.png',
    icon: '🛒',
    badge: 'E-commerce',
    gradient: 'bg-linear-to-br from-[#9333EA]/20 to-[#a855f7]/20',
  },
  {
    id: '9',
    title: 'Content Creation',
    description: 'Engage your audience with high-quality content that tells your story and builds trust.',
    features: ['Blog Writing & Articles', 'Video Production', 'Content Strategy Planning'],
    image: '/services/content.png',
    icon: '✍️',
    badge: 'Content',
    gradient: 'bg-linear-to-br from-[#9333EA]/20 to-[#7c3aed]/20',
  },
];

const ServiceCard = ({ service }: { service: Service }) => (
  <div className="group relative w-full h-120
                  rounded-2xl overflow-hidden cursor-pointer
                  shadow-lg hover:shadow-[0_16px_48px_rgba(147,51,234,.22)]
                  border border-transparent hover:border-[#9333EA]/20
                  transition-all duration-300 hover:-translate-y-1">

    {service.image ? (
      <>
        <Image
          src={service.image}
          alt={service.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
        <div className="absolute inset-0 bg-linear-to-t from-[#0f001e]/80 via-[#0f001e]/20 to-transparent transition-all duration-500" />
      </>
    ) : (
      <div className={`absolute inset-0 ${service.gradient} flex items-center justify-center`}>
        <div className="w-[calc(100%-24px)] h-[calc(100%-24px)] rounded-2xl bg-white/95
                        flex items-center justify-center text-[80px]
                        transition-transform duration-300
                        group-hover:scale-105 group-hover:rotate-2">
          {service.icon}
        </div>
        <div className="absolute inset-0 bg-linear-to-t from-[#0f001e]/85 via-[#0f001e]/30 to-transparent" />
      </div>
    )}

    <span className="absolute top-3 left-3 z-10
                     px-2.5 py-1 text-[10px] font-black uppercase tracking-widest
                     text-[#7c3aed] bg-white/95 backdrop-blur-sm rounded-full">
      {service.badge}
    </span>
    {service.popular && (
      <span className="absolute top-3 right-3 z-10
                       px-2.5 py-1 text-[10px] font-black uppercase tracking-wide
                       text-white bg-[#9333EA] rounded-full">
        Popular
      </span>
    )}

    <div className="absolute bottom-0 inset-x-0 z-5 px-4 pb-4 pt-10
                    transition-opacity duration-300 group-hover:opacity-0 pointer-events-none">
      <h3 className="text-[16px] font-bold text-white leading-snug">{service.title}</h3>
      <span className="text-[10px] text-white/50 font-medium">Hover to explore</span>
    </div>

    <div className="absolute inset-x-0 bottom-0 z-8
                    bg-[rgba(15,0,35,0.85)] backdrop-blur-xl
                    border-t border-[#a855f7]/20
                    px-4 pt-4 pb-4
                    translate-y-full group-hover:translate-y-0
                    transition-transform duration-300 ease-in-out">

      <h3 className="text-[15px] font-bold text-white mb-1.5">{service.title}</h3>
      <p className="text-[11px] text-white/60 leading-[1.55] mb-3">{service.description}</p>

      <ul className="flex flex-col gap-1.5 mb-3">
        {service.features.map((f) => (
          <li key={f} className="flex items-center gap-2 text-[10.5px] text-purple-200/85 font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-[#a855f7] shrink-0" />
            {f}
          </li>
        ))}
      </ul>

      <div className="flex items-center justify-between pt-2.5 border-t border-[#a855f7]/15">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1 text-[9px] font-semibold uppercase tracking-wide text-purple-300/60">
            <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            Fast
          </span>
          <span className="flex items-center gap-1 text-[9px] font-semibold uppercase tracking-wide text-purple-300/60">
            <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Quality
          </span>
        </div>
        <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-full
                           bg-[#9333ea]/80 border border-[#a855f7]/40
                           text-white text-[10px] font-semibold
                           hover:bg-[#9333ea] transition-colors duration-200 group/btn">
          Get Started
          <svg className="w-2.5 h-2.5 transition-transform duration-200 group-hover/btn:translate-x-0.5"
            viewBox="0 0 16 16" fill="none" stroke="currentColor"
            strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 8h10M9 4l4 4-4 4" />
          </svg>
        </button>
      </div>
    </div>
  </div>
);

const Services = () => {
  const [current, setCurrent] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const [slideWidth, setSlideWidth] = useState(0);
  const touchStartX = useRef(0);
  const total = services.length;

  const computeLayout = useCallback(() => {
    if (!trackRef.current) return;
    const w = trackRef.current.parentElement?.offsetWidth ?? 0;
    setSlideWidth(w);
  }, []);

  useEffect(() => {
    computeLayout();
  }, [computeLayout]);

  useEffect(() => {
    window.addEventListener('resize', computeLayout);
    return () => window.removeEventListener('resize', computeLayout);
  }, [computeLayout]);

  const goTo = useCallback((idx: number) => {
    setCurrent(Math.max(0, Math.min(idx, total - 1)));
  }, [total]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % total);
    }, 10000);
    return () => clearInterval(timer);
  }, [total]);

  const offset = current * slideWidth;

  return (
    <section
      id="services"
      className="relative py-20 lg:py-32 bg-[#faf8ff] overflow-hidden font-sans"
    >

      {/* ── Dot grid — matches Contact exactly ── */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          backgroundImage: 'radial-gradient(circle, #c084fc 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
        aria-hidden="true"
      />

      {/* ── Ambient blobs — matches Contact style ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div
          className="absolute -top-40 -left-40 w-150 h-150 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(168,85,247,0.10) 0%, transparent 70%)' }}
        />
        <div
          className="absolute -bottom-40 -right-20 w-125 h-125 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 70%)' }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-100 h-100 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(147,51,234,0.06) 0%, transparent 70%)' }}
        />
      </div>

      {/* ── Ghost text — matches Contact "Contact" watermark ── */}
      <p
        className="absolute top-6 lg:top-10 left-1/2 -translate-x-1/2 whitespace-nowrap text-[18vw] font-black uppercase tracking-tighter text-[#9333EA]/5 select-none pointer-events-none leading-none"
        aria-hidden="true"
      >
        Services
      </p>

      <div className="container-custom relative z-10 space-y-16">

        {/* ── Layout: content left, carousel right ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">

          {/* ── Left: content block ── */}
          <div className="space-y-7 animate-fade-in">

            <div className="flex items-center gap-2">
              <div className="w-7 h-0.5 bg-[#9333EA] rounded-full" />
              <span className="text-[13px] font-bold uppercase tracking-[0.2em] text-[#9333EA]">
                What we do
              </span>
            </div>

            <h2 className="text-3xl lg:text-4xl xl:text-[2.6rem] font-black text-[#1e003a] leading-[1.1] tracking-tight">
              We Build<br />
              <span
                className="text-transparent bg-clip-text"
                style={{
                  backgroundImage: 'linear-gradient(135deg, #9333EA 0%, #6366f1 60%, #a855f7 100%)',
                }}
              >
                Digital Products
              </span><br />
              <span className="text-[#1e003a]/25">That Scale</span>
            </h2>

            <p className="text-[14.5px] text-foreground-secondary leading-[1.72]">
              Every service is crafted with precision, speed, and your growth in mind — trusted by startups and enterprises alike.
            </p>

          </div>

          {/* === Right: carousel + dots === */}
          <div className="lg:col-span-2 flex flex-col gap-5">

            <div
              className="overflow-hidden"
              onTouchStart={(e) => { touchStartX.current = e.touches[0].clientX; }}
              onTouchEnd={(e) => {
                const dx = e.changedTouches[0].clientX - touchStartX.current;
                if (Math.abs(dx) > 40) goTo(dx < 0 ? current + 1 : current - 1);
              }}
            >
              <div
                ref={trackRef}
                className="flex transition-transform duration-500"
                style={{ transform: `translateX(-${offset}px)`, willChange: 'transform' }}
              >
                {services.map((s) => (
                  <div
                    key={s.id}
                    style={{ width: slideWidth > 0 ? slideWidth : undefined, flexShrink: 0 }}
                  >
                    <ServiceCard service={s} />
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-center gap-2">
              {services.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  className={`h-2 rounded-full transition-all duration-300 ${i === current
                    ? 'w-6 bg-[#9333EA]'
                    : 'w-2 bg-[#9333EA]/20 hover:bg-[#9333EA]/40'
                    }`}
                  aria-label={`Go to service ${i + 1}`}
                />
              ))}
            </div>

          </div>

        </div>

      </div>

    </section>
  );
};

export default Services;