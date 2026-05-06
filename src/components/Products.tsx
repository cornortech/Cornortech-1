'use client';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

interface ProductCardProps {
  title: string;
  description: string;
  image: string;
  link: string;
  variant: 'left' | 'right';
  delay?: number;
}

const ProductCard = ({ title, description, image, link, variant, delay = 0 }: ProductCardProps) => {
  const isLeft = variant === 'left';

  // Design tokens based on variant
  const theme = isLeft ? {
    gradient: 'bg-linear-to-br from-[#00ffd6] to-[#08e260]',
    glassBg: 'bg-linear-to-b from-white/80 to-white/30',
    titleColor: 'text-[#00894d]',
    textColor: 'text-[#00894d]/80',
    circleBg: 'bg-[#00f9cb]/20',
    perspective: '[perspective:1000px]',
    rotateHover: 'group-hover:[transform:rotate3d(1,1,0,30deg)]',
    logoSide: 'right-0',
    glassRounded: 'rounded-tr-[100%]',
    glassBorder: 'border-l border-b',
    shadowHover: 'group-hover:shadow-[rgba(5,71,17,0.3)_30px_50px_25px_-40px,rgba(5,71,17,0.1)_0px_25px_30px_0px]',
  } : {
    gradient: 'bg-linear-to-br from-[#6a5acd] to-[#9370db]',
    glassBg: 'bg-linear-to-b from-white/70 to-white/20',
    titleColor: 'text-[#3c2f80]',
    textColor: 'text-[#3c2f80]/80',
    circleBg: 'bg-[#9370db]/30',
    perspective: '[perspective:1200px]',
    rotateHover: 'group-hover:[transform:rotate3d(1,-1,0,25deg)]',
    logoSide: 'left-0',
    glassRounded: 'rounded-tl-[100%]',
    glassBorder: 'border-r border-b',
    shadowHover: 'group-hover:shadow-[rgba(30,30,60,0.3)_30px_50px_25px_-40px,rgba(30,30,60,0.15)_0px_25px_30px_0px]',
  };

  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={`relative w-full max-w-85 h-100 mx-auto ${theme.perspective} group`}
    >
      <div className={`relative h-full w-full rounded-[50px] ${theme.gradient} transition-all duration-500 transform-3d shadow-none ${theme.rotateHover} ${theme.shadowHover}`}>

        {/* Glass Layer */}
        <div className={`absolute inset-2 ${theme.glassBg} ${theme.glassRounded} rounded-[55px] ${theme.glassBorder} border-white/50 transform-[translate3d(0,0,25px)] transition-all duration-500 transform-3d`} />

        {/* Logo Circles with Demo Link */}
        <div className={`absolute ${theme.logoSide} top-0 transform-3d`}>
          {[170, 140, 110, 80, 50].map((size, i) => (
            <div
              key={i}
              className={`absolute aspect-square rounded-full ${theme.circleBg} shadow-[rgba(100,100,111,0.2)_${isLeft ? '-10px' : '10px'}_10px_20px_0px] transition-all duration-500`}
              style={{
                width: `${size}px`,
                top: `${[8, 10, 17, 23, 30][i]}px`,
                [isLeft ? 'right' : 'left']: `${[8, 10, 17, 23, 30][i]}px`,
                transform: `translate3d(0, 0, ${[20, 40, 60, 80, 100][i]}px)`,
                transitionDelay: `${i * 0.1}s`,
                zIndex: i + 1
              }}
            >
              {i === 4 && (
                <Link 
                  href={link} 
                  target={link.startsWith('http') ? "_blank" : undefined}
                  onClick={(e) => {
                    if (link === '#chat') {
                      e.preventDefault();
                      window.dispatchEvent(new CustomEvent('openChatWidget'));
                    }
                  }}
                  className="flex flex-col items-center justify-center h-full w-full group/demo"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 fill-white transition-transform group-hover/demo:scale-125">
                    <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" />
                  </svg>
                  <span className="text-[8px] font-black text-white uppercase tracking-tighter opacity-0 group-hover/demo:opacity-100 transition-opacity">Demo</span>
                </Link>
              )}
            </div>
          ))}
        </div>

        {/* Image Container (Floating) */}
        <div
          className={`absolute inset-x-8 top-10 h-40 rounded-3xl overflow-hidden shadow-2xl transition-all duration-500 transform-[translate3d(0,0,35px)] ${isLeft ? 'group-hover:transform-[translate3d(-15px,-5px,70px)]' : 'group-hover:transform-[translate3d(15px,-5px,70px)]'}`}
        >
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent" />
        </div>

        {/* Content */}
        <div className={`absolute inset-0 p-8 pt-55 ${isLeft ? 'pr-12' : 'pl-12'} transform-[translate3d(0,0,26px)] transition-all duration-500`}>
          <h3 className={`text-2xl font-black ${theme.titleColor} mb-2 leading-tight`}>{title}</h3>
          <p className={`text-sm ${theme.textColor} leading-relaxed font-bold`}>{description}</p>
        </div>
      </div>
    </motion.div>
  );
};

const Products = () => {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: '-80px' });

  const products = [
    {
      title: "POS System",
      description: "Smart inventory management, farmer-to-customer supply chain, and offline-friendly ordering for rural markets.",
      image: "/projects/pos.jpg",
      link: "https://www.gaukotarkari.com",
      variant: 'left' as const
    },
    {
      title: "Cornortech AI",
      description: "Advanced AI-driven analytics, predictive modeling, and intelligent automation tailored for your needs.",
      image: "/products/cornortechAI.png",
      link: "#chat",
      variant: 'right' as const
    }
  ];

  return (
    <section
      id="products"
      ref={sectionRef}
      className="relative py-24 lg:py-36 bg-[#faf8ff] overflow-hidden font-sans"
    >
      {/* ── Subtle dot grid background ── */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          backgroundImage: 'radial-gradient(circle, #c084fc 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
        aria-hidden="true"
      />

      {/* ── Ambient blobs ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div
          className="absolute -top-40 -left-40 w-150 h-150 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(168,85,247,0.10) 0%, transparent 70%)' }}
        />
        <div
          className="absolute -bottom-40 -right-20 w-125 h-125 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 70%)' }}
        />
      </div>

      {/* ── Giant ghost text ── */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 1.4, delay: 0.15 }}
        className="absolute top-6 lg:top-10 left-1/2 -translate-x-1/2 whitespace-nowrap text-[18vw] font-black uppercase tracking-tighter text-[#9333EA]/5 select-none pointer-events-none leading-none"
        aria-hidden="true"
      >
        Products
      </motion.p>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* ── Section headline ── */}
        <div className="mb-14 lg:mb-24 text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55 }}
            className="flex items-center gap-3 mb-5 justify-center lg:justify-start"
          >
            <div className="h-px w-8 bg-[#9333EA] rounded-full" />
            <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#9333EA]">
              Our Products
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 22 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.08 }}
            className="text-4xl lg:text-6xl xl:text-7xl font-black leading-[0.95] tracking-tight"
          >
            <span className="text-[#1e003a]">Digital</span>
            <br />
            <span
              className="text-transparent bg-clip-text bg-linear-to-r from-[#9333EA] via-[#6366f1] to-[#a855f7]"
            >
              Solutions
            </span>
            <br />
            <span className="text-[#1e003a]/25">For the Future.</span>
          </motion.h2>
        </div>

        {/* ── Products Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 lg:gap-32 max-w-6xl mx-auto items-center justify-items-center">
          {products.map((product, idx) => (
            <ProductCard
              key={product.title}
              {...product}
              delay={0.15 + (idx * 0.15)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Products;
